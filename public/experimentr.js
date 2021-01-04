//var d3 = require("d3");

var experimentr = (function() {
        var experimentr = {type: "test"},
            sequence,
            current,
            mainDiv,
            data = {};

        var startTime = new Date();
        data.starttime = startTime;
        data.participantId = startTime.getTime() + Math.random().toString(36).slice(-6);

        // access for participantId
        experimentr.participantId = function () {
            return data.participantId;
        }

        // access for data
        experimentr.data = function () {
            return data;
        }

        experimentr.current = function() {
            return current;
        }

        // define the sequence of the experiment
        experimentr.sequence = function(s) {
            sequence = s;
            return experimentr;
        }

        experimentr.addData = function(d) {
            for(var attr in d) {
                data[attr] = d[attr];
            }
            experimentr.save();
        };

        experimentr.insert = function () {
            fetch("/", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    //if (res.ok) return res.json()
                })
        };

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

        experimentr.record = function() {

        }

        // Starts the experiment
        experimentr.start = function () {
            experimentr.init();
            current = 0;
            //experimentr.insert();
            experimentr.activate(current);
            //experimentr.startTimer();
        }

        experimentr.init = function () {
            // mainDiv = d3.select('body').append('div')
            //   .attr('id', 'experimentr');
            // mainDiv.append('div')
            //   .attr('id', 'module');
            // mainDiv.append('div')
            //   .attr('id', 'control')
            d3.select("#control").append('button')
                .attr('type', 'button')
                .attr('class', 'btn btn-light')
                .attr('id', 'next-button')
                .attr('disabled', true)
                .text('Next')
                .on('click', experimentr.next);
        }

        experimentr.activate = function (i) {
            d3.select('#module').html("");
            d3.select('#next-button').attr('disabled', true);
            if (i === sequence.length - 1) {
                d3.select('#next-button').remove();
                //experimentr.end();
            }

            // d3.html(sequence[i], function(err, d) {
            //     if(err) console.log(err);
            //     d3.select('#module').node().appendChild(d);
            // });
            $("#module").load(sequence[i]);
        }

        experimentr.next = function() {
            //d3.select('#next-button').on('click', experimentr.next);

            //d3.select('#next-button').style('display', 'inline');
            //d3.select('#next-button').attr('disabled', false);
            //d3.select('#next-button').on('click', experimentr.next);
            console.log(data.participantId)
            current = current + 1;
            experimentr.activate(current);
            //console.log("next")
        }

        experimentr.end = function() {
            data.endtime = new Date();
            experimentr.save();
        }

        return experimentr;

    }
)();