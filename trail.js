(function() {
    var self = this;
    var line;
    var start_position;
    var number_of_points = 0;
    var max_points = 300;

    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    function subtractPosition(minuend, subtrahend) {
        var difference = {};
        var dimensions = ["x", "y", "z"];
        dimensions.forEach(function (i) {
            difference[i] = minuend[i] - subtrahend[i];
        });
        return difference;
    }

    function isClose(eps, vecA, vecB) {
        var difference = subtractPosition(vecA, vecB);
        var dimensions = ["x", "y", "z"];
        return dimensions.every(function (d) {
            return -eps < difference[d] && difference[d] < eps;
        });
        
    }

    // oop, let's see if we need to add something to the current line trail thing.
    function handleNewPosition() {
        //print("Handling new position...");
        var position = Entities.getEntityProperties(self.entityID).position;

        if (line == undefined) {
            start_position = position;

            // create the line thing.
            line = Entities.addEntity({
                type: "PolyLine",
                position: position,
                rotation: Quat.IDENTITY,
                dimensions: { x: 2, y: 2, z: 1 },
                linePoints: [
                    { x: 0, y: 0, z: 0 },
                ],
                normals: [
                    { x: 0, y: 0, z: 1 },
                ],
                strokeWidths: [ 0.02, 0.02],
                color: { red: 0, green: 127, blue: 0 },  // Use just the red channel from the image.
                textures: "https://vhilab.github.io/cdr-hf-hosting/White_square.jpg",
                isUVModeStretch: true,
                lifetime: 30  // Delete after 30 seconds
            });

            var text = Entities.addEntity({
                type: "Text",
                position: position,
                dimensions: { x: 0.6, y: 0.3, z: 0.01 },
                lineHeight: 0.12,
                text: "Hello\nthere!",
                faceCamera: true,
                lifetime: 300  // Delete after 5 minutes.
            });

        } else {
            var lineProperties = Entities.getEntityProperties(line, ["linePoints", "normals", "strokeWidths"]);

            var position = Entities.getEntityProperties(self.entityID).position
            var randomVector3 = {x: randomFloat(-0.1, 0.1), y: randomFloat(-0.1, 0.1), z:randomFloat(-0.1, 0.1)};

            var positionDifference = subtractPosition(position, start_position);

            if (!isClose(0.001, positionDifference, lineProperties.linePoints[lineProperties.linePoints.length-1])) {
                lineProperties.linePoints.push(positionDifference);
                lineProperties.normals.push({x:0, y:0, z:1});
                lineProperties.strokeWidths.push(0.02);

                Entities.editEntity(line, lineProperties)
            }
        }
    }

    this.unload = function() {
        Script.clearInterval(self.intervalID);
    };

    this.preload = function(entityID) {
        self.intervalID = Script.setInterval(function() {
            handleNewPosition();
        }, 100);
        self.entityID = entityID;
        Script.setTimeout(this.unload, 30*1000);
    };
});