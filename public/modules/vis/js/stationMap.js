
/** Visualization objects, using Leaflet library*/

/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data, _mapPosition) {

	this.parentElement = _parentElement;
	this.data = _data;
	this.mapPosition = _mapPosition;

	this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
	var vis = this;

	vis.map = L.map(vis.parentElement).setView(vis.mapPosition, 13);
	L.Icon.Default.imagePath = '/modules/vis/img/';
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(vis.map);

	$.getJSON("/modules/vis/data/mbta-lines.json", function(data) {
		L.geoJSON(data, {
			style: vis.styleLine
		}).addTo(vis.map);
	});

	vis.wrangleData();


}


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
	var vis = this;

	// Update the visualization
	vis.updateVis();

}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
	var vis = this;

	// Add empty layer groups for the markers / map objects
	vis.bostonLayerGroup = L.layerGroup().addTo(vis.map);

	vis.data.forEach(function(d) {
		var popupContent = "<strong>"+d.name+"</strong><br/>";
		popupContent += "<p>Capacity: "+d.capacity+"</p>";


		// Create a marker and bind a popup with a particular HTML content
		var marker = L.marker([d.lat, d.lon])
			.bindPopup(popupContent)
			// .on("click", function(e))
			.addTo(vis.map);

		vis.bostonLayerGroup.addLayer(marker)
	})
}

StationMap.prototype.styleLine = function(feature) {
	var vis = this;
	return {color: feature.properties.LINE}
}