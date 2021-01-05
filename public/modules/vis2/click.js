/** Track click events and write to database */

$(document).ready(function() {

    var clickData = [];

    var start = new Date().getTime();

    document.addEventListener("click", trackClick);

    function trackClick(e) {
        // store x, y and time
        var click = {};
        click.x = e.pageX;
        click.y = e.pageY;
        click.time = new Date().getTime() - start;
        click.target = e.target;
        console.log(e.target);
        clickData.push(click);
    }

    // record for 5 seconds
    setTimeout(stopTrack, 5000);

    function stopTrack() {
        document.removeEventListener("click", trackClick);
        experimentr.addData({clickData: clickData});
        document.getElementById("next-button").disabled = false;
    }
})