(function() {

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Return a random number between `low` (inclusive) and `high` (exclusive)
    function randColor() {
        return { red: randomInteger(0, 255), green: randomInteger(0, 255), blue: randomInteger(0, 255)};
    }

    var self = this;
    this.preload = function(entityID) {
        self.intervalID = Script.setInterval(function() {
            Entities.editEntity(entityID, {
                color: randColor()
            });
        }, 1000);
    };
    this.unload = function() {
        Script.clearInterval(self.intervalID);
    }
});