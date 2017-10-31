var utils = require('testutil').utils;

/** Game.spawns['Casey Home'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'transport-c3fd9e89ccc154b', {role: 'transport', homeRoom: 'W6N1', targetBoxId: 'cef49facb53321a'});
**/
var roleDynTransport = {
    
/**
 * homeRoom
 * targetBoxId
 * state
**/
    /** @param {Creep} creep **/
    run: function(creep) {
        /*if(!(creep.memory.state)){creep.memory.state == 'NoJob';}*/
        switch(creep.memory.state){
            case 'OnJob':
                if(_.sum(creep.carry) < creep.carryCapacity * .85){
                    if(utils.SaveAPenny(creep)){return;}
                    /*
                    const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    if(droppedResource && droppedResource.amount > 10 && creep.pos.getRangeTo(droppedResource) <= 5 ){
                        creep.say('Penny!');
                        if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                            creep.moveTo(droppedResource);
                            return;
                        }
                    } */
                }
                    
                if(!(creep.memory.targetBoxId == null)) /*If target to get cargo from*/
                {
                    const box = Game.getObjectById(creep.memory.targetBoxId);
                    if(box === null){if(creep.memory._move){creep.moveByPath(creep.memory._move.path);}else{creep.memory.state == 'NoJob'} return;}
                    /*console.log((box === null) + " : box was type");
                    console.log("box1: " + box);*/
                    if(Object.keys(box.store).length > 1)
                    {
                        if(creep.withdraw(box, Object.keys(box.store)[1]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(box, {reusePath: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}})
                    }
                    }else{
                        /*console.log("box2: " + box);*/
                        if(creep.withdraw(box, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(box, {reusePath: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}})
                    }
                    }
                    
                    if(_.sum(creep.carry) >= creep.carryCapacity * .85){
                        /*delete Memory.Globals.Rooms['E91N73'].JobBoard['598202abfb76d906a37685a9']; */
                       if(delete Memory.Globals.Rooms[creep.memory.homeRoom].JobBoard[creep.memory.targetBoxId]){
                        delete creep.memory.targetBoxId;}
                    }
                }
                else{ /*No cargo target, time to unload*/
                    var DropBox;
                    if(!creep.memory.dropSiteId){DropBox = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));}
                    else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
                    
                    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                creep.build(target);
            } else { utils.MoveRepair(creep); }
                    
                    if(DropBox){creep.moveTo(DropBox,{reusePath: 25})}
                    else{creep.travelTo(Game.flags[creep.memory.homeRoom], {reusePath: 25, visualizePathStyle: {stroke: '#555555'}});}
                   if(creep.pos.getRangeTo(DropBox) == 1) {
                       if(Object.keys(creep.carry).length > 1)
                       {
                           creep.transfer(DropBox, Object.keys(creep.carry)[1]);
                        }else{
                       creep.transfer(DropBox, RESOURCE_ENERGY); 
                        }
                       
                       if(_.sum(creep.carry) == 0){if(creep.ticksToLive < 100){creep.memory.role = 'utility';} else {creep.memory.state = "NoJob";}} /*TODO: creep list self as jobless?*/
                   }
                }
                    
                
                
                
                break;
            case 'NoJob':
                if(creep.ticksToLive < 100){creep.memory.role = 'utility'; return;}
                if(creep.pos.getRangeTo(Game.flags[creep.memory.homeRoom]) > 0){ creep.moveTo(Game.flags[creep.memory.homeRoom], {reusePath: 25, visualizePathStyle: {stroke: '#555555'}}); }
                break;
            case 'IdleJob':
                
                /*const droppedResource2 = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(droppedResource2 && creep.pos.getRangeTo(droppedResource2) == 0 ){creep.pickup(droppedResource2);}*/
                    
                    
                if(!(creep.memory.targetBoxId == null)) /*If target to get cargo from*/
                {
                    const box = Game.getObjectById(creep.memory.targetBoxId);
                    if(box === null){creep.moveByPath(creep.memory._move.path); return;}
                
                    if(creep.withdraw(box, creep.memory.pickupType) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(box, {reusePath: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}})
                    }
                        if(_.sum(creep.carry) >= creep.carryCapacity * .85){ delete creep.memory.targetBoxId;}
                    
                }else{
                    var DropBox;
                    if(!creep.memory.dropSiteId){DropBox = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom));}
                    else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
                   /* console.log(DropBox.id);*/
                    if(DropBox){creep.moveTo(DropBox,{reusePath: 25})}
                    else{creep.moveByPath(creep.memory._move.path); return;}
                   if(creep.pos.getRangeTo(DropBox) == 1) {
                       if(Object.keys(creep.carry).length > 1)
                       {
                           creep.transfer(DropBox, Object.keys(creep.carry)[1]);
                        }else{
                       creep.transfer(DropBox, RESOURCE_ENERGY); 
                        }
                       
                       if(_.sum(creep.carry) == 0){delete creep.memory.dropSiteId; if(creep.ticksToLive < 100){creep.role = 'utility';} else {creep.memory.state = "NoJob";}} /*TODO: creep list self as jobless?*/
                   }
                }
                
                
                
                break;
            default:
            console.log('State for dynTrans was incorrect');
                      creep.memory.state = 'NoJob';
            break;
        }
        
        
	    
            
    
	}/*End function*/
};

module.exports = roleDynTransport;