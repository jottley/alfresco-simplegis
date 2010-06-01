// functions

function get(location) {
	uri = "http://maps.google.com/maps/geo?q="+encodeURI(location)+"&sensor=false&output=json"
	
	var connector = remote.connect("http");
	var result = connector.call(uri);

	return eval("("+result+")");
}

function getLatLong(json){
	var latlong = new Array();
	
	latlong["latitude"] = json.Placemark[0].Point.coordinates[1];
	latlong["longitude"] = json.Placemark[0].Point.coordinates[0];
	
	return latlong;
}

function buildLocation(node){
	var location = "";

	if (node.properties["gis:address"] != null) {
		location = node.properties["gis:address"]
	}
	
	if (node.properties["gis:city"] != null) {
		if (location.length > 0) {
			location = location+", "+node.properties["gis:city"];
		}else{
			location = node.properties["gis:city"];
		}
	}

	if (node.properties["gis:state"] != null) {
		if (location.length > 0) {
			location = location+", "+node.properties["gis:state"];
		} else {
			location = node.properties["gis:state"];
		}
	}

	if (node.properties["gis:postalCode"] != null) {
		if (location.length > 0) {
			location = location+", "+node.properties["gis:postalCode"];
		} else {
			location = node.properties["gis:postalCode"];
		}	
	}
	return location;
}

// Main
var nodeRef = new Array();
nodeRef[0] = url.templateArgs.store_type;
nodeRef[1] = url.templateArgs.store_id;
nodeRef[2] = url.templateArgs.id;

var error = false;

// Check the URI parameters that were supposed to be passed
if (nodeRef[0] == undefined || nodeRef[0].length == 0) {
	error = true;
	status.code = 400;
	status.message = "Store type is missing from URI.";
	status.redirect = true;
}

if (nodeRef[1] == undefined || nodeRef[1].length == 0) {
	error = true;
	status.code = 400;
	status.message = "Store id is missing from URI.";
	status.redirect = true;
}

if (nodeRef[2] == undefined || nodeRef[2].length == 0) {
	error = true;
	status.code = 400;
	status.message = "ID is missing from URI.";
	status.redirect = true;
}

if (!error) {
	// Get the node to work on
	var node = search.findNode("node", nodeRef);

	// If the node doesn't exist we need to report and exit
	if (node == undefined) {
		status.code = 404;
		status.message = "Node not found: " + nodeRef[0] + "://" + nodeRef[1]
				+ "/" + nodeRef[2];
		status.redirect = true;
	} else {
		if (node.hasAspect("gis:mappable") || node.hasAspect("gis:mappableSpace")) {
			var location = buildLocation(node)
			
			if (location.length > 0) {
				var json = get(location);				
				var latlong = getLatLong(json);
				
				model.nodeID = node.id;
				model.location = location;
				model.latitude = latlong["latitude"];
				model.longitude = latlong["longitude"];
				model.zoom = node.properties["gis:zoom"];
				
				var children = new Array();
		
				if (node.isContainer){
					for each (child in node.children){
						
						var _child = new Array();
						
						if (child.hasAspect("gis:mappable") || child.hasAspect("gis:mappableSpace")) {
							var _location = buildLocation(child);							
							var _json = get(_location);
							var _latlong = getLatLong(_json);
							
							_child["nodeID"] = child.id;
							_child["location"] = _location;
							_child["latitude"] = _latlong["latitude"];
							_child["longitude"] = _latlong["longitude"];
							
							children.push(_child);
						} else {
							logger.log("Child does not have have mappable/mappableSpace aspect");
						}							
					}
				}
				
				model.children = children;
			} else {
				status.code = 400;
				status.message = "Location is not defined."
				status.redirect = true;
			}
		} else {
			status.code = 400;
			status.message = (node.isContainer) ? "mappableSpace aspect is missing." : "mappableSpace aspect is missing.";
			status.redirect = true;
		}
	}	
}