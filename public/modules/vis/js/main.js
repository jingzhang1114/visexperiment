
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {
  // Hubway XML station feed
  //var url = 'https://member.bluebikes.com/data/stations/stations.json';

  var url = "https://gbfs.bluebikes.com/gbfs/en/station_information.json";
  //var url2 = "https://gbfs.bluebikes.com/gbfs/en/station_status.json";

  // TO-DO: LOAD DATA
  $.getJSON( url, (data) => {
    //use data

    allData = data.data.stations
    //console.log(allData)
    $("#station-count").text(allData.length)
    createVis()
  })
}


function createVis() {

  // TO-DO: INSTANTIATE VISUALIZATION
  stationMap = new StationMap("station-map", allData, [42.3601, -71.0589])
  //stationMap = new StationMap("station-map", allData, [41.8781, -87.6298])
}