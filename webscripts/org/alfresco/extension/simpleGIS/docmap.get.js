node = "";

var nodeRef = new Array();
nodeRef[0] = url.templateArgs.store_type;
nodeRef[1] = url.templateArgs.store_id;
nodeRef[2] = url.templateArgs.id;

var error = false;

//functions

//Main
// Check the URI parameters that were supposed to be passed
if (nodeRef[0] == undefined || nodeRef[0].length == 0) {
	status.code = 400;
	status.message = "Store type is missing from URI.";
	status.redirect = true;
	error = true;
}

if (nodeRef[1] == undefined || nodeRef[1].length == 0) {
	status.code = 400;
	status.message = "Store id is missing from URI.";
	status.redirect = true;
	error = true;
}

if (nodeRef[2] == undefined || nodeRef[2].length == 0) {
	status.code = 400;
	status.message = "ID is missing from URI.";
	status.redirect = true;
	error = true;
}


if (!error) {
	// Get the node to work on
	node = search.findNode("node", nodeRef);

	// If the node doesn't exist we need to report and exit
	if (node == undefined) {
		status.code = 404;
		status.message = "Node not found: " + nodeRef[0] + "://" + nodeRef[1]
				+ "/" + nodeRef[2];
		status.redirect = true;
	} 	
	
}

if (node.hasAspect("gis:mappable"))
{
	key = node.properties["gis:key"];
	address = node.properties["gis:address"];
	city = node.properties["gis:city"];
	state = node.properties["gis:state"];
	postalCode = node.properties["gis:postalCode"];
	zoom = node.properties["gis:zoom"];
}
else
{
	status.code = 400;
	status.message = "Document is missing Mappable aspect.";
	status.redirect = true;
}

var center = city+", "+state+", "+postalCode;
var fullAddress = address+", "+center;

uri = "http://maps.google.com/maps/geo?q="+encodeURI(fullAddress)+"&key="+key+"&sensor=false&output=json"

var connector = remote.connect("http");
var result = connector.call(uri);

var obj = eval("("+result+")");

coordinates = obj.Placemark[0].Point.coordinates[1]+","+obj.Placemark[0].Point.coordinates[0];

model.center = encodeURI(center);
model.key = key;
model.coordinates = coordinates; 
model.zoom = zoom;