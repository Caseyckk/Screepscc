var utils = require('testutil').utils;

/** Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'theif-595ab9ddb23ae1548ad73c64', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595ab9ddb23ae1548ad73c64', thiefRoom: 'E92N74'});
**/
var roleThief = {
    
/**
 * homeRoom
 * targetBoxId
 *  * thiefRoom
**/
    /** @param {Creep} creep **/
    run: function(creep, homeRoom, thiefRoom) {
        
	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.transporting) {
	        /* We want to go get energy */
	       
	      
		        if(creep.room.name == thiefRoom) {
		             if(Game.getObjectById(creep.memory.targetBoxId).energy < 50){
		                 /*console.log(Game.getObjectById(creep.memory.targetBoxId).energy < 50)
		                
		                 Memory.temp = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE ) &&
                            structure.energy > 0;
                    }
		                 })[0].id;*/
		                 /*creep.memory.targetBoxId = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE ) &&
                            structure.energy > 0;
                    }
            })[0];*/
	       }
		            
	        if(creep.withdraw(Game.getObjectById(creep.memory.targetBoxId), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.targetBoxId), {visualizePathStyle: {stroke: '#ffffff'}});
                }
		        }
                else{
	            creep.moveTo(Game.flags[thiefRoom], {visualizePathStyle: {stroke: '#555555'}});
	        }
	        creep.say('Steal!!');
        }
        else {
            /*we have energy and wish to dump it now*/
            creep.memory.transporting = true;
            /*var repairStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            } 
            });
            creep.repair(repairStructure);*/

            
            /*are we home?*/
            
            if(creep.room.name == homeRoom) {
               
               var DropBox;
                if(!creep.memory.dropSiteId){DropBox = Game.getObjectById(utils.GetMainStorageId(creep.room.name));}
                else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
                if(creep.transfer(DropBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(DropBox, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                if(creep.carry.energy == 0)
                {
                    creep.memory.transporting = false;}
        
                
                /*else
                {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    if(creep.carry.energy < (creep.carryCapacity/2))
                    {creep.memory.transporting = false;}
                    creep.say('⚡ upgrade');
                }*/
            }
            else { /*We need to get home*/
            
                creep.moveTo(Game.flags[homeRoom], {visualizePathStyle: {stroke: '#555555'}});
            }
            
        }/* end have energy with to dump*/
	}
};

module.exports = roleThief;