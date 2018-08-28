Controller.captureActionEvents(); // disable rotation
Messages.sendLocalMessage('Hifi-Teleport-Disabler','both'); // disable teleporting

Script.scriptEnding.connect(function () {
    Messages.sendLocalMessage('Hifi-Teleport-Disabler','none'); // enable teleporting
    Controller.releaseActionEvents(); // enable rotation
});
