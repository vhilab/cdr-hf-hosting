// define the function andwait for the page to load.
function addExitForm() {
	$("#hidden-exit").click(function(){
		$('#exitform').toggle();
	}).after(
		"<form hidden id=\"exitform\" action=\"javascript:void(0);\" onsubmit=\"tryToLeave()\">\
		<input id=\"textinput\" type=\"text\">\
		<input type=\"submit\">\
	</form>");
}

function tryToLeave() {
	if ($('#textinput').val() === "puromycin") {
		var clickEvent = {
	        "type": "click",
	        "data": "returnToMenu"
	    };
	    EventBridge.emitWebEvent(JSON.stringify(clickEvent));
	}
}	 

$(document).ready(addExitForm);