var utils = require('testutil').utils;

/** Game.spawns['Casey Home'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'transport-c3fd9e89ccc154b', {role: 'transport', homeRoom: 'W6N1', targetBoxId: 'cef49facb53321a'});
**/
var roleIgor = {
    
/**
 * homeRoom
 * targetBoxId
 * dropBoxId
 * resourceType
 * resourceAmount
 * state
**/
/** states
 * PickupJob
 * DeliverJob
 * NoJob
 **/
    /** @param {Creep} creep **/
    run: function(creep) {
        switch(creep.memory.state){
            case 'PickupJob':
                
                if(creep.memory.targetBoxId == null){console.log('Igor has no target'); delete Memory.Labs.WorkBoard[creep.memory.dropBoxId + creep.memory.resourceType]; creep.memory.state = 'NoJob'; }
                    
                    const carrying = _.sum(creep.carry);
                if (carrying < creep.carryCapacity && carrying != creep.memory.resourceAmount) /*If we have space and don't already have all the resources we need*/
                {
                    const box = Game.getObjectById(creep.memory.targetBoxId);
                    var withdrawAmount;
                    if(creep.carryCapacity < creep.memory.resourceAmount){withdrawAmount = creep.carryCapacity;}else{withdrawAmount = creep.memory.resourceAmount;}
                        switch(creep.withdraw(box, creep.memory.resourceType, withdrawAmount)){
                            case ERR_NOT_IN_RANGE:
                                creep.moveTo(box, {reusePath: 15, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}})
                                return;
                                break;
                            case ERR_NOT_ENOUGH_RESOURCES:
                            case ERR_INVALID_ARGS:
                                delete creep.memory.targetBoxId;
                                delete creep.memory.dropBoxId;
                                delete creep.memory.resourceType;
                                /*creep.memory.resourceAmount = 0;*/
                                creep.memory.state = 'NoJob';
                                return;
                                break;
                            case ERR_FULL:
                                creep.memory.state = 'DeliverJob';
                                return;
                                break;
                            case OK:
                                creep.memory.state = 'DeliverJob';
                                creep.memory.resourceAmount = creep.memory.resourceAmount - withdrawAmount;
                                return;
                                break;
                        }
                    }
                    if(creep.memory.resourceAmount == 0){creep.memory.state = 'NoJob';}
                    
                break;
            case 'DeliverJob':
                const dropBox = Game.getObjectById(creep.memory.dropBoxId);
               
                    switch(creep.transfer(dropBox, creep.memory.resourceType))
                    {
                        case ERR_NOT_IN_RANGE:
                                creep.moveTo(dropBox, {reusePath: 15, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}})
                                return;
                                break;
                        case ERR_FULL:
                        case ERR_INVALID_TARGET:
                        /*case ERR_NOT_ENOUGH_RESOURCES:*/
                                /*delete creep.memory.targetBoxId;*/
                                creep.memory.resourceAmount = 0;
                                delete Memory.Labs.WorkBoard[creep.memory.dropBoxId + creep.memory.resourceType];
                                
                                
                                /*if(creep.memory.resourceType === RESOURCE_ENERGY && Game.getObjectById(creep.memory.dropBoxId).structureType == STRUCTURE_LAB){
                                    delete Memory.Labs.WorkBoard[creep.memory.dropBoxId + '_Energy'];
                                }else{delete Memory.Labs.WorkBoard[creep.memory.dropBoxId];}*/
                                if(_.sum(creep.carry) > 0){creep.memory.dropBoxId = creep.memory.targetBoxId;}else{creep.memory.state = 'NoJob';}
                                return;
                                break;
                        case ERR_NOT_ENOUGH_RESOURCES:
                        case OK:
                            if(creep.memory.resourceAmount > 0){
                                if (_.sum(creep.carry) > 0 ){return;}
                                creep.memory.state = 'PickupJob';
                                return;
                            }else{
                                 delete Memory.Labs.WorkBoard[creep.memory.dropBoxId + creep.memory.resourceType];
                                /*if(creep.memory.resourceType === RESOURCE_ENERGY && Game.getObjectById(creep.memory.dropBoxId).structureType == STRUCTURE_LAB){
                                    delete Memory.Labs.WorkBoard[creep.memory.dropBoxId + '_Energy'];
                                }else{delete Memory.Labs.WorkBoard[creep.memory.dropBoxId];}*/
                                
                                if(creep.ticksToLive < 50){creep.role = 'utility';} else {creep.memory.state = "NoJob";}
                                return;
                                break;
                            }
                    }
                    
                    
                break;
                
            case 'NoJob':
                
                /*if(_.sum(creep.carry) > 0){}*/
                
                if(utils.DumpExtra(creep)){return;}
                
                if(creep.memory.Ltimer >0){creep.memory.Ltimer--;}
                else{
                    const jobs = _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  creep.memory.homeRoom);
                    if(jobs.length > 0){
                        const job = jobs[0];
                        const jobName = job.labId + job.resType;
                        delete Memory.Labs.JobBoard[jobName];
                                
                        /*if(creep.memory.resourceType === RESOURCE_ENERGY && Game.getObjectById(job.labId).structureType == STRUCTURE_LAB){
                                    delete Memory.Labs.JobBoard[job.labId + '_Energy'];
                                }else{delete Memory.Labs.JobBoard[job.labId];}*/
                        /*delete Memory.Labs.JobBoard[job.labId];*/
                    
                        creep.memory.targetBoxId = job.storageId;
                        creep.memory.dropBoxId = job.labId ;
                        /*creep.memory.resourceAmount = 3000 - Game.getObjectById(job.labId).store[RESOURCE_ENERGY];*/
                        creep.memory.resourceAmount = job.resourceAmount;
                        creep.memory.resourceType = job.resType ;
                        
                         Memory.Labs.WorkBoard[jobName] = job;
                                
                        
                        /*if(creep.memory.resourceType === RESOURCE_ENERGY && Game.getObjectById(creep.memory.dropBoxId).structureType == STRUCTURE_LAB){
                                    Memory.Labs.WorkBoard[job.labId + '_Energy'] = job;
                                }else{Memory.Labs.WorkBoard[job.labId] = job;}*/
                        /*Memory.Labs.WorkBoard[creep.memory.dropBoxId] = job;*/
                        creep.memory.state = 'PickupJob';
                        return;
                    }else{creep.memory.Ltimer = 10;}
                }
                if(creep.pos.getRangeTo(Game.flags[creep.memory.homeRoom]) > 0){ creep.moveTo(Game.flags[creep.memory.homeRoom], {reusePath: 25, visualizePathStyle: {stroke: '#555555'}}); }
                break;
            default:
            console.log('State for Igor was incorrect: ' + creep.memory.state);
                      creep.memory.state = 'NoJob';
            break;
        }
        
        
	    
            
    
	}/*End function*/
};

module.exports = roleIgor;