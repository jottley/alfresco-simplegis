<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

<div id="map_canvas" style="width: 750px;height: 250px"></div>

<script type="text/javascript">

var latlng = new google.maps.LatLng(${latitude}, ${longitude});
var myOptions = {
	zoom: ${zoom},
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true,
	scrollwheel: false	
};
    
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

<#list children as child>
<#assign ref = child["nodeID"]>
<#list companyhome.childrenByLuceneSearch["ID:workspace\\:\\/\\/SpacesStore\\/${ref}"] as _child>

var _latlng${child_index} = new google.maps.LatLng(${child["latitude"]},${child["longitude"]});
  		
var childInfo${child_index} = "<div>"+
	"<img src=\"${url.context}${_child.icon32}\" width=\"32\" height=\"32\" align=\"texttop\" />&nbsp;<a href=\"${url.context}/n/showDocDetails/workspace/SpacesStore/${_child.id}\">${_child.name}</a><br />"+
	"${_child.properties.title}<br />"+
	"${_child.properties.description}<br />"+
	"Creation Date: ${_child.properties.created?datetime}<br />"+
	"Modification Date: ${_child.properties.modified?datetime}<br />"+
	"${_child.properties["gis:address"]}<br />"+
	"${_child.properties["gis:city"]}, ${_child.properties["gis:state"]} ${_child.properties["gis:postalCode"]}<br />"+
	"<a href=\"${url.context}${_child.downloadUrl}\">Download</a><br />"+
	"</div>";

var infowindow${child_index} = new google.maps.InfoWindow({
	content: childInfo${child_index}
});

var marker${child_index} = new google.maps.Marker({
	position: _latlng${child_index},
	title: '${_child.name}'
});

marker${child_index}.setMap(map);

google.maps.event.addListener(marker${child_index}, 'click', function() {
	infowindow${child_index}.open(map,marker${child_index});
});
</#list>
</#list>    			
</script>    			