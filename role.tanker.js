var utils = require('testutil').utils;

/** Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-c3fd9e89ccc154b', {role: 'tanker', homeRoom: 'W6N1', targetBoxId: 'cef49facb53321a'});
**/
var roleTanker = {
    
/**
 * homeRoom
 * targetBoxId
**/
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(utils.DumpExtra(creep)){return;}

	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.transporting) {
	        /* We want to go get energy */
	        
	       /* if(creep.ticksToLive < 50){creep.suicide;}*/
	        if(_.sum(creep.carry) == 0){if(creep.ticksToLive < 25){creep.memory.role = 'utility'; return; }}
                   
	            
	            if(utils.SaveAPenny(creep)){return;}
	
	        const targBox = Game.getObjectById(creep.memory.targetBoxId);
	        if(!creep.pos.inRangeTo(targBox, 1)){
	            creep.moveTo(targBox, {visualizePathStyle: {stroke: '#ffffff'}});
	        }else{
	            if(targBox.structureType == STRUCTURE_STORAGE && targBox.store[RESOURCE_ENERGY] > creep.carryCapacity){creep.withdraw(targBox, RESOURCE_ENERGY);}
	            else if(targBox.energy > 200){creep.withdraw(targBox, RESOURCE_ENERGY);}
	        }
	        
	        
	        /*if(!creep.pos.inRangeTo(targBox, 1)){
                    creep.moveTo(targBox, {visualizePathStyle: {stroke: '#ffffff'}});
                    console.log(creep.withdraw(targBox, RESOURCE_ENERGY) + ' ' + creep.name);
                }else{creep.withdraw(targBox, RESOURCE_ENERGY)
                if(creep.memory.calledOnceAlready === false){
                    creep.memory.calledOnceAlready = true;
                    roleTanker.run(creep);
                }else{creep.memory.calledOnceAlready = false;}}*/
                
                
                
                
                creep.say('Pickup!!');
	            /*}*/
        }
        else {
            /*we have energy and wish to dump it now*/
            creep.memory.transporting = true;
            
            /*are we home?*/
            if(creep.room.name == creep.memory.homeRoom) {
               
               var targets = creep.room.roomExtensions;
            
            if(targets.length < 1){
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (/*structure.structureType == STRUCTURE_LINK ||*/ structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity - 50;
                    }
                });
            }
            targets = creep.pos.findClosestByPath(targets);
            
            /*var cStart = Game.cpu.getUsed();*/
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                /*console.log('CPU used for tanker raw: ' + (Game.cpu.getUsed() - cStart));*/
            }
            /*cStart = Game.cpu.getUsed();*/
            
            
            /*if(!(creep.memory.cRangeTo > 1 )){ /* creep range is null or <= 1  *//*
                const rangeTo = creep.pos.getRangeTo(targets);
                if(rangeTo > 1){ /* move and assign current range */
                /*console.log('CPU used for tanker rangeTo: ' + (Game.cpu.getUsed() - cStart));*//*
                    if(creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}}) == OK){creep.memory.cRangeTo = (rangeTo-1); }
                    else { creep.memory.cRangeTo = rangeTo; }
                }else { /* range is 1 or less, transfer and assign 0 *//*
                    creep.transfer(targets, RESOURCE_ENERGY);
                    creep.memory.cRangeTo = 0;
                }
            }else{/* range is not null and greater than 1 *//*
            creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.cRangeTo--;
            }
            console.log('CPU used for tanker modified: ' + (Game.cpu.getUsed() - cStart));
            /*if(creep.pos.getRangeTo(targets) > 1){ creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}}); }
            else{ creep.transfer(targets, RESOURCE_ENERGY); }*/
            
                if(creep.carry.energy < 50)
                {
                    creep.memory.transporting = false;
                }
            }
            else { /*We need to get home*/
            
                creep.travelTo(Game.rooms[creep.memory.homeRoom].controller, {visualizePathStyle: {stroke: '#555555'}});
            }
            
        }/* end have energy with to dump*/
	}
};

module.exports = roleTanker;