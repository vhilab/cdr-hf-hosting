_fakeprint = function(some_text){
	var position = Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation));
	var text = Entities.addEntity({
        type: "Text",
        position: position,
        dimensions: { x: 0.6, y: 0.3, z: 0.01 },
        lineHeight: 0.06,
        text: some_text,
        faceCamera: true,
        lifetime: 10  // Delete after 10 seconds
    });
};

fakeprint = _fakeprint;

fakeprint("sanity.js loaded");