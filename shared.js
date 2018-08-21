(function() {
    var self = this;

    shared_var = "Whooooaaa";

    this.preload = function(entityID) {
        self.entityID = entityID;
        print("HELLO WORLD");
        var position = Entities.getEntityProperties(self.entityID).position;
        print(position);
        var text = Entities.addEntity({
            type: "Text",
            position: position,
            dimensions: { x: 0.6, y: 0.3, z: 0.01 },
            lineHeight: 0.12,
            text: "Hello\nthere!",
            faceCamera: true,
            lifetime: 10  // Delete after 10 seconds
        });

    };

    this.unload = function() {
    }
});