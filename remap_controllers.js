/*
var mappingJSON = {
    "name": "com.highfidelity.controllers.example.jsonMapping",
    "channels": [
        // include this to test whether it's loaded.
        { "from": "Hardware.Vive.LT", "to": "Actions.TranslateY" },
        { "from": "Standard.RT", "to": "Actions.TranslateY" },
        
        // disable left and right big buttons, to stop rotate and 
        { "from": "Hardware.Vive.LS", "to": "Actions.Roll" }, // note that roll doesn't do anything, thankfully.
        { "from": "Hardware.Vive.LS", "to": "Actions.Roll"}, // disable rotate
    ]
};

var mapping = Controller.parseMapping(JSON.stringify(mappingJSON));
mapping.enable();

Script.scriptEnding.connect(function () {
    mapping.disable();
});*/

Script.setTimeout(function () {
   Controller.captureActionEvents();
}, 5000);

Script.setTimeout(function () {
   Controller.releaseActionEvents();
}, 10000);
