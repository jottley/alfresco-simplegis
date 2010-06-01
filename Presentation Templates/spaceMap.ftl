<script type="text/javascript" src="/alfresco/yui/yahoo.js"></script>
<script type="text/javascript" src="/alfresco/yui/event.js"></script>
<script type="text/javascript" src="/alfresco/yui/connection.js"></script>

<div id="map" style="width: 750px;height: 250px"></div>

<script type="text/javascript">//<![CDATA[

var handleSuccess = function(o){

var div = document.getElementById('map');

alert(o.responseText);

div.innerHTML = o.responseText;
div.innerHTML = "this is a test";

}

var handleFailure = function(o){

var div = document.getElementById('map');

div.innerHTML = "Map not available";

}

var callback =
{
	  success: handleSuccess,
	  failure: handleFailure,
	  argument: {}
}

alert("${space.id}");

var request = YAHOO.util.Connect.asyncRequest('GET', '/alfresco/wcservice/map/coordinates/workspace/SpacesStore/${space.id}', callback); 
//]]></script>