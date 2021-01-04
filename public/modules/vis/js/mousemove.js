/** Track mouse movement and write to database */

$(document).ready(function() {

    var mousemoveData = [];

    var start = new Date().getTime();

    document.addEventListener("mousemove", trackMouseMove);

    function trackMouseMove(e) {
        // store x, y and time
        var move = {};
        move.x = e.pageX;
        move.y = e.pageY;
        move.time = new Date().getTime() - start;
        mousemoveData.push(move);
    }

    // record for 5 seconds
    setTimeout(stopTrack, 5000);

    function stopTrack() {
        document.removeEventListener("mousemove", trackMouseMove);
        experimentr.addData({mousemoveData: mousemoveData});
        document.getElementById("next-button").disabled = false;
    }
})