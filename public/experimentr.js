/** Supervise the progress of the experiment, control modules and send requests to backend */

var experimentr = (function() {
        /** Prepare Key Variables */
        var experimentr = {type: "test"},
            sequence,
            current,
            data = {};

        // get start time
        var startTime = new Date();
        data.starttime = startTime;

        // generate unique id
        data.participantId = startTime.getTime() + Math.random().toString(36).slice(-6);

        // access for participantId
        experimentr.participantId = function () {
            return data.participantId;
        }

        // access for data
        experimentr.data = function () {
            return data;
        }

        // access for the index of current module
        experimentr.current = function() {
            return current;
        }

        // define the sequence of the modules
        experimentr.sequence = function(s) {
            sequence = s;
            return experimentr;
        }

        /** Life cycle of the experiment */
        // Start the experiment
        experimentr.start = function () {
            experimentr.init();
            current = 0;
            experimentr.activate(current);
        }

        // Initiate the module control
        experimentr.init = function () {
            d3.select("#control").append('button')
                .attr('type', 'button')
                .attr('class', 'btn btn-light')
                .attr('id', 'next-button')
                .attr('disabled', true)
                .text('Next')
                .on('click', experimentr.next);
        }

        // remove old module and load new module
        experimentr.activate = function (i) {
            d3.select('#module').html("");
            d3.select('#next-button').attr('disabled', true);
            if (i === sequence.length - 1) {
                d3.select('#next-button').remove();
            }

            $("#module").load(sequence[i]);
        }

        // go to the next module
        experimentr.next = function() {
            //console.log(data.participantId)
            current = current + 1;
            experimentr.activate(current);
        }

        // save the end time
        experimentr.end = function() {
            data.endtime = new Date();
            experimentr.save();
        }

        /** Send requests to the back-end */
        // add a module data into the participant's document
        experimentr.addData = function(d) {
            for(var attr in d) {
                data[attr] = d[attr];
            }
            experimentr.save();
        };

        // insert a document
        experimentr.insert = function () {
            fetch("/", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log("inserted.")
                })
        };

        // update a document
        experimentr.save = function() {
            fetch("/", {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            }).then(res => {
                console.log("saved.")
                //if (res.ok) return res.json()
            })
        }



        return experimentr;

    }
)();
