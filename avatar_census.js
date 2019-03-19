var SEARCH_CENTER = {x: 0, y: -10, z: 0};
var SEARCH_RADIUS = 1000;

var interval = 1000 * 60 * 5; // every 5 minutes

var send_avatar_ids = function(deltaTime) {
    var avatar_list = AvatarList.getAvatarIdentifiers();
};

Script.setInterval(send_avatar_ids, interval);
