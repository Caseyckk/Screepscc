var getSource = require('Utility');
var utils = require('testutil').utils;

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
       /** Memory.temp = getSource;**/

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.memory.source = "";
	        creep.say('🚧 build');
	    }
	    
	    if(creep.memory.type == 'Cons' ){creep.say("🚧🚧🚧!", true);}
	    
	    if(creep.memory.type == 'Decons'){
	       
	        if(utils.DumpExtra(creep)){return;}
	        if(_.sum(creep.carry) == creep.carryCapacity){
	             creep.dropEnergy;
	            if(creep.transfer(utils.GetMainStorageId(creep.memory.homeRoom), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                creep.moveTo(utils.GetMainStorageId(creep.memory.homeRoom));
	                return;
	            }
	        }
	        
	        if(!creep.memory.targetId){console.log('Decons has no targetId: ' + creep.name); return;}
	        const structure = Game.getObjectById(creep.memory.targetId);
	        
	        switch(structure.structureType){
	            case STRUCTURE_TERMINAL:
	                if(Object.keys(structure.store).length > 0){
	                   if(creep.withdraw(structure, Object.keys(structure.store)[1]) == ERR_NOT_IN_RANGE){
	                       creep.moveTo(structure);
	                       return;
	                   } 
	                }else if(structure.store.energy > 0){
	                       if(creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                       creep.moveTo(structure);
	                       return; 
	                       }
	                }
	                break;
	           case STRUCTURE_CONTAINER:
	                   if(Object.keys(structure.store).length > 0){
	                   if(creep.withdraw(structure, Object.keys(structure.store)[1]) == ERR_NOT_IN_RANGE){
	                       creep.moveTo(structure);
	                       return;
	                   } 
	                }else if(structure.store.energy > 0){
	                       if(creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                       creep.moveTo(structure);
	                       return; 
	                       }
	                }
	                   break;
	               case STRUCTURE_SPAWN:
	               case STRUCTURE_STORAGE:
	                   case STRUCTURE_TOWER:
	                       case STRUCTURE_LINK:
	                           case STRUCTURE_WALL:
	                   break;
	           default:
	               console.log('Decons no structure for ' + structure.id);
	               return;
	               break;
	        }
	        console.log('deconstructor is ready to deconstruct: ' + creep.memory.targetId);
	        if(creep.memory.canDecon == true && creep.dismantle(structure) == ERR_NOT_IN_RANGE){
	            creep.moveTo(structure);
	        }
	        
	        if(!(Game.getObjectById(creep.memory.targetId))){creep.memory.canDecon = false; creep.memory.type = 'Cons';}
	        
	        return;
	    } /* end decons */
	    
	    
	    if(utils.DumpExtra(creep)){return;}
	    /*if(utils.SaveAPenny(creep)){return;}*/
	    /*if(Object.keys(creep.carry).length > 1)
	    {
	            if(creep.transfer(Game.getObjectById('5967b3d74255e84adb21d33b'), Object.keys(creep.carry)[1])) {
                    creep.moveTo(Game.getObjectById('5967b3d74255e84adb21d33b'), {visualizePathStyle: {stroke: '#ffffff'}});
                }
	            return;
	    }*/
	    

	    if(creep.memory.building) {
	        var repairStructure = creep.pos.findClosestByRange(creep.room.roomRepairs);
	        /*FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax * .8 && structure.hits < 50000;
            } 
            });*/
            /*console.log('is repair: ' + repairStructure);*/
            if(repairStructure){creep.repair(repairStructure);}
            /*creep.repair(repairStructure);*/
	        
	        var Repairs = _.filter(creep.room.roomStructures, (object) =>
                       object.structureType != STRUCTURE_ROAD && (object.hits < (object.hitsMax / 2) && object.hits < 100000) && object.id != '58e027aa679dec6747efed47' );     
                /*console.log(Repairs.length > 0);*/
                if(Repairs.length > 0 ){
                    Repairs.sort;
                    /*Memory.Globals.HasRepairer = true;*/
                    creep.say('🚧 repair');
                        creep.moveTo(Repairs[0], {visualizePathStyle: {stroke: '#11ffff'}});
                        creep.repair(Repairs[0], {visualizePathStyle: {stroke: '#11ffff'}});
                }
                else /*We build*/
                {
                    try{
	      
                creep.say('⚡ upgrade');
                
                  var targets; 
            targets = _.filter(creep.room.roomStructures, (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 50);
            
            /*if(creep.room.name == 'E88N65'){console.log(_.filter(creep.room.roomStructures, (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 50));}
            if(creep.room.name == 'E88N65'){console.log(targets.length)};*/
            /*console.log(_.filter(creep.room.roomStructures, (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity));*/
            /*console.log(targets.length);*/
            if(targets.length > 0 && creep.memory.type != 'Cons' ) {
                creep.say('🛢️');
                targets= _.sortBy(targets, t => creep.pos.getRangeTo(t));
            
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 5, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                 if(!utils.Build(creep)) {
                     
                if(utils.Repair(creep)){return;}
                     
                
            
            if(creep.room.name == creep.memory.homeRoom){
                const structure = creep.pos.findClosestByPath(_.filter(creep.room.roomStructures, (structure) => structure.structureType == STRUCTURE_CONTROLLER && structure.my) );
            if(creep.upgradeController(structure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: Memory.Colors.Upgrading}});
            }
            }else{creep.moveTo(Game.flags[creep.memory.homeRoom]);}
            }
            }
                            

                    }
            catch(error){console.log(error);}
                }
	    }
	    else {
	       /* var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
	        if(droppedResource && droppedResource.amount > 100 && !creep.memory.type == 'Cons'){
	            if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResource, {visualizePathStyle: {stroke: Memory.Colors.Harvesting}});
                creep.say("SAVEaPENNY!");
            }
	        }else{*/
	        if(utils.SaveAPenny(creep)){return;}
	            const storage = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));
	            if(storage /*&& creep.memory.type && creep.memory.type == 'Cons'*/ && storage.store.energy >= 2000)
	            {
	                if(creep.memory.type && creep.memory.type == 'Cons'){creep.say("I am the Constructinator!", true);}
	                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});}
	            }else
	            getSource.run(creep);
	        /*}*/
	        

	        
	        
	    } /*end else*/
	} 
};

module.exports = roleBuilder;