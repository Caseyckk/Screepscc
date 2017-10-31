var getSource = require('Utility');
var utils = require('testutil').utils;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.harvesting) {
	        creep.say('🥄');
            getSource.run(creep);
        }
        else {
            if(creep.room.name != creep.memory.homeRoom){creep.moveTo(Game.flags[creep.memory.homeRoom]); return;}
            
            creep.memory.harvesting = false;
            
            utils.MoveRepair(creep);
            
            var AvailEnergy = creep.room.energyAvailable;
            var MaxEnergy = creep.room.energyCapacityAvailable;
     
            var targets; 
            if(AvailEnergy >= MaxEnergy *.85){
            targets = _.filter(creep.room.roomStructures, (structure) =>
                        (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < (structure.energyCapacity * .50) || 
                        (structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity - 50))
                    );
            } else { targets = creep.room.roomExtensions; }
            
            
            if(targets.length > 0) {
                creep.say('🛢️');
                /*targets= _.sortBy(targets, t => creep.pos.getRangeTo(t));
            
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
                }*/
                
                targets = creep.pos.findClosestByPath(targets);
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                if(creep.carry.energy < (creep.carryCapacity/4)) {creep.memory.harvesting = true;}
            }
            else
            {
                if(creep.memory.dropSiteId)
                {
                    if(creep.transfer(Game.getObjectById(creep.memory.dropSiteId), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.dropSiteId), {reusePath: 10, ignoreCreeps:false, visualizePathStyle: {stroke: '#ffffff'}});
                        /*if(creep.moveTo(Game.getObjectById(creep.memory.dropSiteId), {reusePath: 10, ignoreCreeps:false, visualizePathStyle: {stroke: '#ffffff'}})== ERR_NO_PATH)
                    {creep.moveTo(Game.getObjectById(creep.memory.dropSiteId), {reusePath: 3, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});}*/
                        }
                }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
                }

                creep.say('⚡');
            }
            if(creep.carry.energy < (creep.carryCapacity/4)) {if(creep.ticksToLive < 100){creep.memory.role = 'utility'; return;} creep.memory.harvesting = true;}
                
            }
        }
	}
};

module.exports = roleHarvester;