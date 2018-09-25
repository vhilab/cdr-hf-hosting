(function(){
	print("Top of teleportal back room far");

	function TeleportalBackroomFar(){};

	TeleportalBackroomFar.prototype = {
        startNearTrigger: function(entityID, args){
            print("startNearTrigger started. [lafej]");
            var targetPosition = { x: 0.126, y:-11.49, z:-34.68};
            var orientation = { x: 0, y: 0, z: 0, w: 1 };
            goToFeetLocation(position, true, orientation);
        },
	};

	return new TeleportalBackroomFar();
});
