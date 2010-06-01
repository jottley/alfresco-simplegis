{
    "node": {
    	"nodeID": "${nodeID}",
        "location": "${location}",
        "latitude": ${latitude},
        "longitude": ${longitude},
        "zoom": ${zoom} 
    },
    "children": [
    <#list children as child>
        {
            "nodeID": "${child["nodeID"]}",
            "location": "${child["location"]}",
            "latitude": ${child["latitude"]},
            "longitude": ${child["longitude"]} 
        }<#if child_has_next>,</#if>
   </#list>
    ] 
}