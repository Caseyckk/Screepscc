var utils = require('testutil').utils;

var Utility = (function(){
    function PopulateRoom(roomName, SpawnRoom) {
    try{
         if(Game.rooms[roomName]){
                    var sources = [];
                    Game.rooms[roomName].find(FIND_SOURCES).forEach(function(source){
                        var tempSource = {};
                        tempSource.sourceId = source.id;
                    
                        const ClosestBox = source.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK)  && source.pos.getRangeTo(structure) < 4 } });
                        if(ClosestBox){tempSource.containerId = ClosestBox.id;}
                        else{ console.log('PopulateRoom: No close container for source ' + source.id + ' in room ' + roomName); return; }
                    
                        tempSource.transId = '';
                        tempSource.harvId = '';
                        tempSource.returnId = utils.GetMainStorageId(SpawnRoom);
                        sources.push(tempSource);
                    });
                }else {console.log('PopulateRoom: No Game.rooms for : ' + roomName); return;}
                
                Memory.Thinker.SpawnRooms[SpawnRoom].Rooms[roomName] = {sources: sources};
    }catch(err){console.log('***Error PopulateRoom: ' + err);}} /*end PopulateRoom*/
        
        
         return {
        PopulateRoom: PopulateRoom

    };
}());

module.exports = {Utility};