var utils = require('testutil').utils;

var roleDedHarvester = {
/** Game.spawns['Casey Home'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'dedHarvester-87e60773144aa25' , {role: 'dedharvester', sourceId: '87e60773144aa25', workRoom: 'W6N1', harvesting: true, dropSiteId: 'cef49facb53321a'}); **/
    /** @param {Creep} creep **/
    run: function(creep, sourceId, dropSiteId, workRoom) {
        /* 
        workRoom 
        sourceId
        dropSiteId
        */
        
        /*checks if we have everything*/
        
        if(!creep.memory.state){creep.memory.state = "Harvesting";}
            
            switch(creep.memory.state){
                case 'Harvesting':
                    
                    if(creep.room.name == creep.memory.workRoom){
                        
                        const source = Game.getObjectById(creep.memory.sourceId);
                        
                        if(creep.harvest(source) == ERR_NOT_IN_RANGE){creep.travelTo(source, {reusePath: 15, ignoreCreeps: false, visualizePathStyle: {stroke: Memory.Colors.Harvesting}}); return; }
                        
                        const DropBox = Game.getObjectById(creep.memory.dropSiteId);
                        if(!DropBox){ if(creep.carry.energy == creep.carryCapacity){ creep.memory.state = 'Dropping'; } return;}
                        
                        if( (DropBox.hits < DropBox.hitsMax * .8) && creep.carry.energy > 7 ){
                            creep.repair(DropBox);
                        }else{
                            switch(creep.transfer(DropBox, RESOURCE_ENERGY))
                            {
                                case ERR_FULL:
                                    /*utils.MoveRepair(creep); */
                                    return;
                                    /*creep.drop(RESOURCE_ENERGY);*/
                                    break;
                                /*case ERR_NOT_IN_RANGE:
                                    creep.moveTo(DropBox);
                                    creep.transfer(DropBox, RESOURCE_ENERGY);
                                    break;*/
                                default:
                                break;
                            }
                        }
                        
                        /*if(creep.id == '59a07fc963a4fd18262990d3'){console.log( creep.carry.energy == creep.carryCapacity);}*/
                        if(creep.carry.energy == creep.carryCapacity){ creep.memory.state = 'Dropping'; }
                        
                    }else{ creep.travelTo(Game.flags[creep.memory.workRoom], {reusePath: 50, visualizePathStyle: {stroke: '#555555'}}); }
                    
                    
                break;
                case 'Dropping':
                    var DropBox2 = Game.getObjectById(creep.memory.dropSiteId);
                    if(DropBox2){
                        if((DropBox2.hits < DropBox2.hitsMax * .8) && creep.carry.energy > 7){
                            creep.say(creep.repair(DropBox2));
                            return;
                        }else{ /*dropbox doesn't need repairs*/
                            switch(creep.transfer(DropBox2, RESOURCE_ENERGY))
                            {
                                case ERR_FULL:
                                    utils.MoveRepair(creep); 
                                    creep.drop(RESOURCE_ENERGY);
                                    break;
                                case ERR_NOT_IN_RANGE:
                                    utils.MoveRepair(creep);
                                    creep.moveTo(DropBox2);
                                    creep.transfer(DropBox2, RESOURCE_ENERGY);
                                    break;
                                default:
                                break;
                            }
                        }
                    }else{ /*dropbox doesn't exist*/
                        var ClosestBox = creep.pos.findClosestByPath(creep.room.roomStructures, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && creep.pos.getRangeTo(structure) < 2 } });
                                
                        if(ClosestBox){ creep.memory.dropSiteId == ClosestBox.id; }
                        else{ /*there is no closestBox*/
                            const conSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                            
                            if(conSite && creep.pos.getRangeTo(conSite) < 4){ creep.build(conSite); }
                            else{creep.drop(RESOURCE_ENERGY);} /*there is no con site within range*/
                        }
                    }
                    
                    if(creep.carry.energy < creep.carryCapacity *.7){ creep.memory.state = 'Harvesting'; }
                break;
                default:
                    console.log('dedHarvester state failure');
                    creep.memory.state = 'Harvesting';
                    break;
            }
            

        
	}
	
	
    /*}/*end function */
};

module.exports = roleDedHarvester;