var utils = require('testutil').utils;
var Movecc = require('Movecc').Movecc;

/** Game.spawns['Casey Home'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'transport-c3fd9e89ccc154b', {role: 'transport', homeRoom: 'W6N1', targetBoxId: 'cef49facb53321a'});
**/
var roleTransport = {
    
/**
 * homeRoom
 * targetBoxId
**/
    /** @param {Creep} creep **/
    run: function(creep, homeRoom) {
        var startCpu = Game.cpu.getUsed();
        
        if(creep.memory.type){
            console.log('here');
            /*  static moveccTo(creep, destinationId, options = {}) { */

            if(!creep.memory.movecc){creep.memory.movecc = {state: 'moveTo'};}
            const cCPU = Game.cpu.getUsed();
            switch(creep.memory.state){
                case 'PickUp':
                    if(creep.memory.movecc.state == 'moveTo'){
                        if(Movecc.moveccTo(creep, creep.memory.targetSiteId)){creep.memory.movecc.state = 'moveFrom'; creep.memory.state = 'DropOff';}
                    }else{creep.travelTo(Game.getObjectById(creep.memory.targetBoxId));}
                    console.log('used this CPU to testMove: '+ (Game.cpu.getUsed() - cCPU));
                    break;
                case 'DropOff':
                    if(creep.memory.movecc.state == 'moveFrom'){
                        if(Movecc.moveccTo(creep, creep.memory.targetSiteId)){creep.memory.movecc.state = 'moveTo'; creep.memory.state = 'PickUp'; /*delete Memory.Cache.SpawnRooms;*/}
                    }else{creep.travelTo(Game.getObjectById(creep.memory.targetBoxId));}
                    console.log('used this CPU to testMove: ' + (Game.cpu.getUsed() - cCPU));
                    break;
                default:
                    creep.memory.state = 'PickUp';
            }
            return;
        }
        
        
        switch(''/*creep.memory.state*/)
        {
            case 'PickUp': /*we want to go get energy*/
            if(utils.SaveAPenny(creep)){return;}
            /*Memory.logs['CPUUSAGE']['transporter'].push('after SaveAPenny: ' + Game.cpu.getUsed() - startCpu); cpustart = Game.cpu.getUsed();*/
            if(utils.DumpExtra(creep)){return;}
                /*var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(droppedResource && droppedResource.amount > 25 && creep.pos.getRangeTo(droppedResource) <= 5 ){
                    creep.say('Penny!');
                    if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedResource);
                        return;
                    }
                }*/
                
                const targetBox = Game.getObjectById(creep.memory.targetBoxId); 
                if(creep.pos.getRangeTo(targetBox) == 1){
                    
                    if(creep.memory.pickupType)
                    {
                       if(Object.keys(box.store).length > 1)
                    {
                        creep.withdraw(box, creep.memory.pickupType)
                    } 
                    }else{
                        creep.withdraw(targetBox, RESOURCE_ENERGY);
                        utils.MoveRepair(creep);
                        if(_.sum(creep.carry) >= creep.carryCapacity - 10){
                            creep.memory.state = 'DropOff';
                            /*TODO:Run again*/
                        /*roleTransport.run(creep, homeRoom);*/
                        }
                    }
                }
                else{
                    creep.say('Pickup!');
                    if(creep.travelTo(targetBox, {reusePath: 25, ignoreCreeps: true, visualizePathStyle: {stroke: '#ffffff'}})== ERR_NO_PATH)
                    {creep.travelTo(targetBox, {reusePath: 1, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});}
                }
                 if(_.sum(creep.carry) >= creep.carryCapacity - 10){ creep.memory.state = 'DropOff'; }
                  return;  
            break;
            case 'DropOff': /*time to drop it off*/
                utils.MoveRepair(creep);
                
                var DropBox;
                if(!creep.memory.dropSiteId){DropBox = Game.getObjectById(utils.GetMainStorageId(creep.memory.homeRoom)); creep.memory.dropSiteId = DropBox.id;}
                else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
            
                if(creep.room.name == creep.memory.homeRoom) {
                    
                    if(creep.transfer(DropBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('DropOff!');
                        creep.travelTo(DropBox, {reusePath: 5, visualizePathStyle: {stroke: '#ffffff'}});
                    }else{ /* transfered energy maybe */
                        if(creep.carry.energy != 0 && creep.ticksToLive < 10){
                            if(creep.pos.getRangeTo(Game.getObjectById(creep.memory.targetBoxId)) == 1){
                                    creep.transfer(Game.getObjectById(creep.memory.targetBoxId), RESOURCE_ENERGY)
                                    if(creep.carry.energy == 0){creep.memory.role = 'utility'; return;}
                            }
                        }else if(creep.ticksToLive < 100 && creep.pos.getRangeTo(Game.getObjectById(creep.memory.targetBoxId)) != 1 ){/*0 energy in carry, not next to target box, and < 100 ticks to live*/
                            creep.memory.role = 'utility'; return;
                        }else{
                            creep.memory.state = 'PickUp';
                            /*roleTransport.run(creep, homeRoom);*/
                        } /* 0 energy and > 100 ticks to live or we're next to a box*/
                    }
                    
                }else { /*We need to get home*/
                    utils.MoveRepair(creep);
                    if(DropBox){creep.travelTo(DropBox,{reusePath: 25})}
                    else{creep.moveTo(Game.flags[homeRoom], {reusePath: 25, visualizePathStyle: {stroke: '#555555'}});}
                }

                
return;
            break;
            default:
            /*console.log("Wrong Transport state for: " + creep.id)
            creep.memory.state = 'PickUp';*/
            /*return;*/
        }
        
        
        if(creep.memory.path){ /* this is a flag to flag transport */
        /*const startCPUt = Game.cpu.getUsed();*/
            switch(creep.memory.state){
                case 'PickUp':
                    if(creep.ticksToLive < 250){creep.memory.role = 'utility';}
                    if(_.sum(creep.carry) >= creep.carryCapacity){
                        if(JSON.stringify(creep.pos) != JSON.stringify(Game.flags[creep.memory.flag1Name].pos)){
                            creep.travelTo(Game.flags[creep.memory.flag1Name], {reusePath: 10, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}} );
                        }else {creep.memory.state = 'ToFlag2'; creep.memory.position = 0; creep.memory.roomCount = 0; /*creep.memory.path = Memory.temp2.path;*/}
                        return;
                    }
                   
                    const targetBox = Game.getObjectById(creep.memory.targetBoxId);
                    if(creep.withdraw(targetBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targetBox, {reusePath: 10, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
                }
                    break;
                case 'DropOff':
                    
                     if(_.sum(creep.carry) == 0){
                    if(JSON.stringify(creep.pos) != JSON.stringify(Game.flags[creep.memory.flag2Name].pos)){
                            creep.travelTo(Game.flags[creep.memory.flag2Name], {reusePath: 10, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}} );
                        }else {creep.memory.state = 'ToFlag1';  creep.memory.position = ((creep.memory.path.length) -1); creep.memory.roomCount = 0;  }
                        return;
                    }
                
                    const dropBox = Game.getObjectById(creep.memory.dropSiteId);
                    if(creep.transfer(dropBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropBox, {reusePath: 10, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
                }
               
                    break;
                case 'ToFlag1':
                    if(!(creep.memory.pathFrom)){creep.memory.pathFrom = new Array(creep.memory.path.length -1);}
                    if(!(creep.memory.startLocString)){creep.memory.startLocString = JSON.stringify(Game.flags[creep.memory.flag1Name].pos);}
                    /*if(!(creep.memory.pathR)){creep.memory.pathR = _.Reverse(creep.memory.path);}*/
                    if(JSON.stringify(creep.pos) !=  creep.memory.startLocString){
                    /*creep.moveByPath(_.reverse(creep.memory.path)); /*todo: probably better to save this reverse off somewhere */
                         /* if we are at the position, aim for the next one*/
                         if(creep.memory.position > -1 && creep.pos.roomName != creep.memory.path[creep.memory.position].roomName && creep.pos.roomName == creep.memory.path[creep.memory.position-1].roomName){creep.memory.position--; creep.memory.roomCount++}
                             if(JSON.stringify(creep.pos) == JSON.stringify(creep.memory.path[creep.memory.position])){
                                 creep.say('on track');
                                 creep.memory.position--;
                                 creep.memory.stuck = 0;
                             }else{ creep.memory.stuck++; if(creep.memory.stuck > 5) {creep.travelTo(new RoomPosition(creep.memory.path[creep.memory.position].x, creep.memory.path[creep.memory.position].y, creep.memory.path[creep.memory.position].roomName)); console.log('creep returning wrong'); return;}}
                             var posN;
                          if(creep.memory.position < 0){posN = Game.flags[creep.memory.flag1Name].pos}
                          else{posN = creep.memory.path[creep.memory.position];}
                         
                         if(creep.memory.pathFrom[creep.memory.position] && creep.memory.pathFrom[creep.memory.position] != null){
                             creep.move(creep.memory.pathFrom[creep.memory.position]);
                         }
                         else{
                             /*console.log(creep.move(creep.pos.getDirectionTo(posN.x, posN.y))); 
                             creep.memory.path[creep.memory.position].directionFrom = creep.pos.getDirectionTo(posN.x, posN.y); */
                             
                             const direction = creep.pos.getDirectionTo(posN.x, posN.y);
                             /*console.log(direction);*/
                             creep.move(direction); 
                             
                             if(creep.memory.pathFrom[creep.memory.position] == null){creep.memory.pathFrom[creep.memory.position] = direction;}
                             else{creep.memory.pathFrom.unshift(direction);}
                         }
                         
                         /*console.log(creep.move(creep.pos.getDirectionTo(posN.x, posN.y)));*/
                        /*console.log(creep.moveTo(posN.x, posN.y));*/
                        /*Memory.getDirectionToLog.push(Game.cpu.getUsed() - startCPUt);*/
                        /*console.log(Game.cpu.getUsed() - startCPUt);*/
                    }else{creep.memory.state = 'PickUp'; return;}
                    break;
                case 'ToFlag2': /* this.move(this.pos.getDirectionTo(path[ */
                    if(!(creep.memory.position)){creep.memory.position = 0;}
                    if(!(creep.memory.pathTo)){creep.memory.pathTo = [];}
                    if(!(creep.memory.roomCount)){creep.memory.roomCount = 0;}
                    if(!(creep.memory.destLocString)){creep.memory.destLocString = JSON.stringify(Game.flags[creep.memory.flag2Name].pos);}
                    
                     /*if(creep.pos.x != Game.flags[creep.memory.flag2Name].pos.x || creep.pos.y !=  Game.flags[creep.memory.flag2Name].pos.y || creep.pos.roomName !=  Game.flags[creep.memory.flag2Name].pos.roomName   ){*/
                      if(JSON.stringify( creep.pos) != creep.memory.destLocString){
                          /* if we are at the position, aim for the next one*/
                         if(creep.pos.roomName != creep.memory.path[creep.memory.position].roomName && creep.pos.roomName == creep.memory.path[creep.memory.position+1].roomName) {creep.memory.position++; creep.memory.roomCount++}
                         const intendedLocation = creep.memory.path[creep.memory.position];
                             if(JSON.stringify(creep.pos) == JSON.stringify(intendedLocation)){
                                 creep.say('on track');
                                 creep.memory.position++;
                                 creep.memory.stuck = 0;
                             } else{creep.memory.stuck++; if(creep.memory.stuck > 5){creep.travelTo(new RoomPosition(intendedLocation.x, intendedLocation.y, intendedLocation.roomName)); console.log('** transport off track:' + creep.name + ' : ' + creep.pos.roomName); return;}}
                         
                         if(creep.memory.pathTo[creep.memory.position - creep.memory.roomCount]){creep.move(creep.memory.pathTo[creep.memory.position - creep.memory.roomCount]);}
                         /*if(posN.directionTo){console.log(creep.move(posN.directionTo));}*/
                         else{
                             const posN = creep.memory.path[creep.memory.position];
                             const direction = creep.pos.getDirectionTo(posN.x, posN.y);
                             creep.move(direction); 
                             creep.memory.pathTo.push(direction);
                             if(creep.memory.position == 1){creep.memory.pathTo.push(direction);}
                             /*if(creep.memory.pathTo[creep.memory.position]){creep.memory.pathTo[creep.memory.position] = direction;}
                             else{creep.memory.pathTo.push(direction);}*/
                         }
                         
                         
                        /*console.log(creep.moveTo(posN.x, posN.y));*/
                        /*creep.moveTo(posN.x, posN.y) == OK/*JSON.stringify(creep.pos) == JSON.stringify(posN)){creep.memory.position++;}*/
                    /*console.log(creep.move(creep.pos.getDirectionTo(creep.memory.path[creep.memory.position])));*/
                   /* Memory.getDirectionToLog.push(Game.cpu.getUsed() - startCPUt);*/
                   /*console.log(Game.cpu.getUsed() - startCPUt);*/
                    }else{creep.memory.state = 'DropOff'; return;}
                    break;
                default:
                creep.memory.state = 'PickUp';
                    break;
            }
            return;
        }
        
	    if(_.sum(creep.carry) < creep.carryCapacity-10 && !creep.memory.transporting) {
	        /* We want to go get energy */
	        if(creep.ticksToLive < 100){creep.memory.role = 'utility';}
	        
	        if(utils.SaveAPenny(creep)){return;}
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after SaveAPenny'); cpustart = Game.cpu.getUsed();*/
            if(!creep.memory.movecc){creep.memory.movecc = {state: 'moveTo'};}
				if(creep.memory.movecc.state == 'moveTo'){
                        if(Movecc.moveccTo(creep, creep.memory.targetSiteId)){creep.memory.movecc.state = 'moveFrom'; creep.memory.state = 'DropOff';}
                    }else{
						        if(creep.withdraw(Game.getObjectById(creep.memory.targetBoxId), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(Game.getObjectById(creep.memory.targetBoxId), {reusePath: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
                }
					}



/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after withdraw'); cpustart = Game.cpu.getUsed();*/
                creep.say('?Pickup!!');
                	        utils.MoveRepair(creep);
                	        if(creep.carry.energy >= creep.carryCapacity - 10){
                	            creep.memory.transporting = true;
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after pickup'); cpustart = Game.cpu.getUsed();*/
                	            var DropBox;
                	            if(!creep.memory.dropSiteId){DropBox = Game.getObjectById("5967b3d74255e84adb21d33b");}
                	            else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
                	            if(DropBox){creep.moveTo(DropBox,{reusePath: 25})}
                	            else{creep.travelTo(Game.flags[homeRoom], {reusePath: 10, visualizePathStyle: {stroke: '#555555'}});}
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after dropBox with withdraw'); cpustart = Game.cpu.getUsed();*/
                	        }
        }
        else {
            /*we have energy and wish to dump it now*/
            creep.memory.transporting = true;
            			            if(!creep.memory.movecc){creep.memory.movecc = {state: 'moveFrom'};}
            /*are we home?*/
            if(creep.ticksToLive < 100){
                if(creep.pos.getRangeTo(Game.getObjectById(creep.memory.targetBoxId)) == 1)
                {
                    creep.transfer(Game.getObjectById(creep.memory.targetBoxId), RESOURCE_ENERGY)
                    if(creep.carry.energy == 0)
                    {
                        creep.memory.role = 'utility';
                    }
                }
            }
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after recycle'); cpustart = Game.cpu.getUsed();*/
            if(creep.memory.movecc.state == 'moveFrom'){
                        if(Movecc.moveccTo(creep, creep.memory.targetSiteId)){creep.memory.movecc.state = 'moveTo'; creep.memory.state = 'PickUp'; /*delete Memory.Cache.SpawnRooms;*/}
                    }else{
					
            var DropBox;
                if(!creep.memory.dropSiteId){DropBox = creep.room.MainStorage; creep.memory.dropSiteId = DropBox.id; /*Game.getObjectById("5967b3d74255e84adb21d33b");*/}
                else{DropBox = Game.getObjectById(creep.memory.dropSiteId);}
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after dropBox'); cpustart = Game.cpu.getUsed();*/
            
            if(creep.room.name == homeRoom) {
            if(utils.DumpExtra(creep)){return;}
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                creep.build(target);
            }
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after after con sites'); cpustart = Game.cpu.getUsed();*/
                
                if(creep.transfer(DropBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(DropBox, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                if(creep.carry.energy < 10)
                {
                    creep.memory.transporting = false;}
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after is homeRoom'); cpustart = Game.cpu.getUsed();*/
            }
            else { /*We need to get home*/
            
           utils.MoveRepair(creep);
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after moveRepair'); cpustart = Game.cpu.getUsed();*/
           var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                creep.build(target);
            }
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after con site not home'); cpustart = Game.cpu.getUsed();*/
            if(DropBox){creep.moveTo(DropBox,{reusePath: 10})}
            else{creep.travelTo(Game.flags[homeRoom], {reusePath: 25, visualizePathStyle: {stroke: '#555555'}});}
/*Memory.logs['CPUUSAGE']['transporter'].push((Game.cpu.getUsed() - startCpu) + ' :after dropBox not home'); cpustart = Game.cpu.getUsed();*/
            }
			}
        }/* end have energy with to dump*/
	}
};

module.exports = roleTransport;