var SEARCH_CENTER = {x: 0, y: -10, z: 0};
var SEARCH_RADIUS = 1000;

//var interval = 1000 * 60 * 5; // every 5 minutes
var interval = 1000 * 5; // every 5 seconds

var send_avatar_ids = function() {
    print("Requesting IDs")
    var avatar_list = AvatarList.getAvatarIdentifiers();
    
    avatar_list.forEach(function(elem) {
        Users.requestUsernameFromID(elem);
    });
};

function username_reply(nodeID, userName, machineFingerprint, isAdmin) {
    print("nodeID " + nodeID)
    print("userName " + userName)
    print("machineFingerprint " + machineFingerprint)
    print("isAdmin " + isAdmin)
}

Users.usernameFromIDReply.connect(username_reply);

Script.setInterval(send_avatar_ids, interval);

#send_avatar_ids()

