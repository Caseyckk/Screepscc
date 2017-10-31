var getSource = require('Utility');
var utils = require('testutil').utils;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        /** homeRoom state boostLabId **/
        switch(creep.memory.state){
            case 'upgrading':
                
                if(creep.room.name !== creep.memory.homeRoom){
                    creep.moveTo(Game.flags[creep.memory.homeRoom], {visualizePathStyle: {stroke: '#555555'}});
                    return;
                }
                
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                if(creep.carry.energy == 0){creep.memory.state = 'harvesting'; return;}
            }
                
                
                break;
            case 'harvesting':
                
                var storage;
            if(creep.memory.targetBoxId){
                storage = Game.getObjectById(creep.memory.targetBoxId);
                if(storage.structureType == STRUCTURE_STORAGE || storage.structureType == STRUCTURE_CONTAINER)
                {
                    if(storage.store.energy > creep.carryCapacity*2){
                        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{ getSource.run(creep);}
                }else {
                    if(storage.energy > 0){ /*this is a link probably*/
                        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        storage = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));
                if(storage !== null){
                    if (storage.structureType == STRUCTURE_STORAGE){
                        if(storage.store.energy > 10000)
                        {
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{ getSource.run(creep); }}
                    }}
                }
                if(creep.carry.energy === creep.carryCapacity){creep.memory.state = 'upgrading'; return;}
            }else{ /* no target storage saved */
                
                storage = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));
                if(storage !== null){
                    if (storage.structureType == STRUCTURE_STORAGE){
                        if(storage.store.energy > 10000)
                        {
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{ getSource.run(creep); }
                    }else if(storage.structureType == STRUCTURE_CONTAINER)
                    {
                        if(storage.store.energy > creep.carryCapacity)
                        {
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{ getSource.run(creep); }
                    }else if(storage.energy > 0)
                    {
                        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else{ getSource.run(creep); }
                    
                }else{ getSource.run(creep); }
                if(creep.carry.energy === creep.carryCapacity){creep.memory.state = 'upgrading'; return;}
            }
            
            
                
                break;
            case 'boosting':
                if(creep.spawning){return;}
                if(!(Game.getObjectById(creep.memory.boostLabId).mineralAmount > 500)){creep.memory.state = 'harvesting'; return;}
                switch(Game.getObjectById(creep.memory.boostLabId).boostCreep(creep)){
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(Game.getObjectById(creep.memory.boostLabId));
                        break;
                    case ERR_INVALID_TARGET:
                    case ERR_NOT_FOUND:
                    case ERR_NOT_ENOUGH_RESOURCES:
                        creep.memory.state = 'harvesting';
                        return;
                        break;
                    case OK:
                        return;
                        break;
                    default:
                    const result = Game.getObjectById(creep.memory.boostLabId).boostCreep(creep);
                    console.log('error with upgrader: ' + result);
                    Game.notify('An upgrade creep tried to boost, ' + result + ' ' + creep.id + ' ' + creep.memory.homeRoom);
                    /*creep.memory.state = 'harvesting';*/
                    break;
                }
                break;
            default: 
            console.log('error with upgrader state ' + creep.id );
            creep.memory.state = 'harvesting';
                break;
        }
        
        
    }  
};

module.exports = roleUpgrader;
