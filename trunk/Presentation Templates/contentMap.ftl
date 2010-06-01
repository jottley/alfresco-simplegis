<script type="text/javascript" src="/alfresco/yui/yahoo.js"></script>
<script type="text/javascript" src="/alfresco/yui/event.js"></script>
<script type="text/javascript" src="/alfresco/yui/connection.js"></script>

<div id="mapping"></div>
<script type="text/javascript">//<![CDATA[

var handleSuccess = function(o){

var div = document.getElementById('mapping');

div.innerHTML = o.responseText;

}

var handleFailure = function(o){

var div = document.getElementById('mapping');

div.innerHTML = "Map not available";

}

var callback =
{
	  success: handleSuccess,
	  failure: handleFailure,
	  argument: {}
}

var request = YAHOO.util.Connect.asyncRequest('GET', '/alfresco/service/map/workspace/SpacesStore/${document.id}', callback); 

//]]></script>
