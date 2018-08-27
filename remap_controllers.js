var MAPPING_NAME = "com.highfidelity.controllers.example.newMapping";
var mapping = Controller.newMapping(MAPPING_NAME);

mapping.from(Controller.Standard.RT).to(Controller.Actions.TranslateY);
Controller.enableMapping(MAPPING_NAME);

Script.scriptEnding.connect(function () {
   Controller.disableMapping(MAPPING_NAME);
});
