var roleClaimer = {
    run: function(creep) {
        /* Game.spawns['Casey Home'].createCreep([CLAIM,CLAIM,MOVE,MOVE], 'Claimer-' + Math.floor(Math.random()*10000)+1, {role: 'claimer'}) */


if(typeof creep.memory.homeRoom != 'undefined'){
        if(creep.room.name == Game.flags[creep.memory.homeRoom].pos.roomName)
        {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#555555'}});
            }
            if(!(creep.room.controller.sign=="Don't like my remote mining? Please contact me!")){creep.signController(creep.room.controller, "Don't like my remote mining? Please contact me!")}
        }
        else
        {
           creep.moveTo(Game.flags[creep.memory.homeRoom], {visualizePathStyle: {stroke: '#555555'}});
        }
}
else{
        if(!Game.flags['Capture']){console.log(creep.id + ': has no capture flag'); exit;}


if(!creep.memory.waypoint){
    creep.moveTo(Game.flags['Capture1'],{visualizePathStyle: {stroke: '#ffffff'}});
    creep.say('ToCapture1');
    
    if(creep.room.name == Game.flags['Capture1'].pos.roomName){creep.memory.waypoint = true;}
    return;
}
if(!(creep.memory.waypoint == '2')){
    creep.moveTo(Game.flags['Capture2'],{visualizePathStyle: {stroke: '#ffffff'}});
    creep.say('ToCapture2');
    
    if(creep.room.name == Game.flags['Capture2'].pos.roomName){creep.memory.waypoint = '2';}
    return;
}
creep.say('To New Home');

        if(creep.room.name == Game.flags['Capture'].pos.roomName)
        {
            if(creep.memory.realRole){creep.memory.role = creep.memory.realRole; creep.memory.type = 'Cons'; creep.memory.homeRoom = creep.room.name;  return; }
            
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#555555'}});
            }
            creep.signController(creep.room.controller, "I come to build not war. See my industry grow!");
        }
        else
        {
           creep.moveTo(Game.flags['Capture'], {visualizePathStyle: {stroke: '#555555'}});
        }
}
        
       /** Game.creeps['C_1234'].claimController(Game.rooms.controller);**/

       /* Game.flags['Capture'].pos.roomName */
        
        
    }
};

module.exports = roleClaimer;