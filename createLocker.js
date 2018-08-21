var position = Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation));
var id = Entities.addEntity({
    position: position,
    "script": Script.resolvePath("LockSensorToWorldMap.js") ,
    type: "Box",
    name: "ScriptBox",
    color: { red: 0, green: 0, blue: 155 },
    "userData": JSON.stringify({
    	"grabbableKey" : { "grabbable":false, "wantsTrigger" : true }
    })
});
print("Made a cube!" , id);