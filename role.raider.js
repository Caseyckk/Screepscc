var getSource = require('Utility');
var utils = require('testutil').utils;

var roleRaider = {
    run: function(creep, raidFlag, homeRoom) {
        /* Game.spawns['Casey Home'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'Raider-' + Math.floor(Math.random()*10000)+1, {role: 'raider', raidFlag: 'Raid1', homeRoom: 'W6N1'}) 
        Game.spawns['Casey Home'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Raider-' + Math.floor(Math.random()*10000)+1, {role: 'raider', raidFlag: 'Raid1', homeRoom: 'W6N1'});
        */
        if(!Game.flags[raidFlag]){console.log(creep.id + ': has no raid flag'); return;}
        if(!homeRoom){console.log(creep.id + ': has no home'); return;}
        
        
        if(utils.Flee(creep)){creep.harvesting = false; return;}

        if(creep.carry.energy < creep.carryCapacity && creep.memory.harvesting) {
            if(creep.room.name == Game.flags[raidFlag].pos.roomName)
            {
                if(utils.SaveAPenny(creep)){return;}
                
                var sources = creep.room.find(FIND_SOURCES,{
                filter: (sources) => {
                        return (sources.energy > 0 )}});
                          
                sources.sort();
if(creep.room.name == 'E92N74' || creep.room.name == 'E89N68' /*|| creep.room.name == 'E94N68'*/){
    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.travelTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
}
    else
    {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.travelTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            }
            }    
        else{
            creep.travelTo(Game.flags[raidFlag], {visualizePathStyle: {stroke: '#555555'}});
            }
        }
        
        else {
            creep.memory.harvesting = false;
            
            var Repairs = creep.room.find(FIND_STRUCTURES, {
                   filter: function(object){
                       if((object.structureType != STRUCTURE_ROAD && object.structureType != STRUCTURE_CONTAINER) || object.hits > object.hitsMax * .85) {
                           return false;
                       }
                       return true;
                   } 
                });  
                if(creep.room.name !== homeRoom){
                if(Repairs.length > 0){
                    creep.say('🚧 repair');
                    const damaged = creep.pos.findClosestByPath(Repairs);
                    if(!(creep.pos.getRangeTo(damaged) < 4)){ creep.moveTo(damaged, {visualizePathStyle: {stroke: '#11ffff'}}) }
                        
                        creep.repair(damaged);
                        
                        if(creep.carry.energy < (creep.carryCapacity/2))
                {creep.memory.harvesting = true;}
                               return;
                }
}
            if(!utils.Build(creep))
            {
        if(creep.room.name == homeRoom){
           /* var targets; 

            targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });*/
            if(homeRoom == 'E91N73' || homeRoom == 'E91N72'){
                var DropBox;
                    if(!creep.memory.dropSiteId){DropBox = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));}
                    else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
                    
                    if(DropBox){creep.moveTo(DropBox,{reusePath: 25})}
                    else{creep.moveByPath(creep.memory._move.path); return;}
                   if(creep.pos.getRangeTo(DropBox) == 1) {
                       if(Object.keys(creep.carry).length > 1)
                       {
                           creep.transfer(DropBox, Object.keys(creep.carry)[1]);
                        }else{
                       creep.transfer(DropBox, RESOURCE_ENERGY); 
                        }
                   }
                       
                       if(_.sum(creep.carry) == 0){delete creep.memory.dropSiteId; if(creep.ticksToLive < 100){creep.role = 'utility';} else {creep.memory.harvesting = true;}} /*TODO: creep list self as jobless?*/
                return;
            }
            
             
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.carry.energy < (creep.carryCapacity/2))
                {creep.memory.harvesting = true;}
                creep.say('⚡ upgrade');
            }  
            
        else{
            creep.travelTo(Game.flags[homeRoom], {visualizePathStyle: {stroke: '#555555'}});
            }
            
        
            }/*End build attempt*/
            else{ /*We didn't find anything to build.*/
                if(creep.carry.energy < (creep.carryCapacity/2))
                {creep.memory.harvesting = true;}
            }
        }/*end not harvesting*/
        
    }
};

module.exports = roleRaider;