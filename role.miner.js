var getSource = require('Utility');
var utils = require('testutil').utils;

var roleMiner = {

    /** @param {Creep} creep **/ /*workRoom, state, targetSiteId, dropSiteId,  */
    /* SpawnCreep(spawnerName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], miner-id, {workRoom: , targetSiteId: , dropSiteId: , state: 'Mining'}) { */
    run: function(creep) {
        
        if(!creep.memory.state){creep.memory.state = "Mining";}
        
        switch(creep.memory.state){
            case 'Mining':
                if(!creep.memory.targetSiteId){Console.log("Miner without targetSiteId!"); return;}
                
                var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(droppedResource && creep.pos.getRangeTo(droppedResource) == 0 ){
                    creep.pickup(droppedResource);}
                    /*console.log(creep.moveTo(Game.getObjectById(creep.memory.targetSiteId), {reusePath: 10, visualizePathStyle: {stroke: Memory.Colors.Harvesting}}));*/
                    
                if(creep.room.name == creep.memory.workRoom){
                    if(creep.memory.mTimer > 0){creep.memory.mTimer--;}else{
                        if(creep.harvest(Game.getObjectById(creep.memory.targetSiteId)) == ERR_NOT_IN_RANGE) {
                            if(creep.moveTo(Game.getObjectById(creep.memory.targetSiteId), {reusePath: 10, visualizePathStyle: {stroke: Memory.Colors.Harvesting}}) == ERR_NO_PATH){
                                console.log("No path to minerals for " + creep.id);
                            }
                        }else{creep.say('⛏️'); creep.memory.mTimer = 5 ;}}
                        if(Game.getObjectById(creep.memory.targetSiteId).mineralAmount == 0){creep.memory.state = 'Dropping';}
                }/*move to workroom?*/

                 
                if(_.sum(creep.carry) >= creep.carryCapacity -16){creep.memory.state = "Dropping";}
                break;
            case 'Dropping':
                creep.say('⬇️');
                creep.memory.mTimer--;
                
                if(Object.keys(creep.carry).length > 1)
                {
                    if(creep.transfer(Game.getObjectById(creep.memory.dropSiteId), Object.keys(creep.carry)[1])== ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.dropSiteId), {reusePath: 5, visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        return;
                }else{
                    if(creep.transfer(Game.getObjectById(creep.memory.dropSiteId), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.dropSiteId), {reusePath: 5, visualizePathStyle: {stroke: '#ffffff'}})
                    }
                }
                
                if(_.sum(creep.carry) == 0){
                    if(creep.ticksToLive < 10){creep.suicide();
                    }else if(Game.getObjectById(creep.memory.targetSiteId).mineralAmount == 0){creep.memory.role = 'utility'; creep.memory.homeRoom = creep.memory.workRoom;
                    }else{creep.memory.state = "Mining";}}
                break;
            default:
                console.log("No mining state!");
                creep.say('⚠️');
                return;
        }
        

	}/*end function*/
};

module.exports = roleMiner;