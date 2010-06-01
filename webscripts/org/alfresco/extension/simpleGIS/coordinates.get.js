var location = url.templateArgs.location;

//Main
if (location == undefined || location.length == 0) {
	status.code = 400;
	status.message = "No location provided";
	status.redirect = true;
} else {
	uri = "http://maps.google.com/maps/geo?q="+encodeURI(location)+"&sensor=false&output=json"
	
	var connector = remote.connect("http");
	var result = connector.call(uri);
	
	var obj = eval("("+result+")");
	
	latitude = obj.Placemark[0].Point.coordinates[1];
	longitude = obj.Placemark[0].Point.coordinates[0];
	
	model.latitude = latitude;
	model.longitude = longitude; 
}