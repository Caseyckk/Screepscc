var utils = require('testutil').utils;
var UtilitySpawn = require('utility.spawn').utilitySpawn;

var utilityRoom = (function(){
        
        function WatchRooms(spawnerName, AvailEnergy, HomeRoom, watchRooms, spawn) {
            var isEnemies = false;
            
            watchRooms.forEach(function(room)
    {
        if(!Game.rooms[room]){return false;}
        
        var enemies = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if(enemies.length > 0){
           /*console.log(Game.time + ":Enemy in " + Game.rooms[room] + " of type:" + enemies[0].owner.username, 0);*/
           try{
               if(enemies[0].owner.username == 'Invader'){/*Game.notify(Game.time + ":Enemy " + Game.rooms[room] + " type:" + enemies[0].owner.username, 720);*/
               
               
               }else{Game.notify(Game.time + ":Enemy in " + Game.rooms[room] + " type:" + enemies[0].owner.username + ' ' + enemies[0].owner + ' ' + enemies[0].body.length + ' ' + _.countBy( enemies[0].body, 'type') , 0);}
           
            /*Game.notify(Game.time + ":Enemy in " + Game.rooms[room]);*/
            Memory.log.push(Game.time + ":Enemy in " + Game.rooms[room] + " type:" + enemies[0].owner.username);
            if(Memory.log.length > 2000){Memory.log.shift();}
           }catch(error){console.log(error);}
       console.log("Enemy in " + room);
       if(spawn && AvailEnergy >= 1000 && _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.room.name == HomeRoom) < 6 ){
            console.log(Game.spawns[spawnerName].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: room, homeRoom: HomeRoom})); 
        }
        
        if(!Game.flags[room]){ Game.rooms[room].createFlag(new RoomPosition(24,24,room), room);}
            isEnemies = true;
        }
    });
          return isEnemies;  
            
            /**for (const room in Game.rooms)
    {
        var enemies = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if(enemies.length > 0){
            
       Game.notify("Enemy in " + Game.rooms[room]);
       if(AvailEnergy > 600 ){
            Game.spawns['Casey Home'].createCreep([ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: room, homeRoom: 'E91N73'}) 
        }
            return;
        }
    }**/
        }/*WatchRooms*/
        
        function WatchBoxes(spawnerName, AvailEnergy, roomName, BoxWatchList, DontSpawn){
            try{
    if(DontSpawn && !(Game.time % 5 === 0)){return;}
            var roo = Memory.Globals.Rooms[roomName];
            /*if(Object.keys(roo.JobBoard).length == BoxWatchList.length){return;}*/
            if(!BoxWatchList){return false;;}
            
            BoxWatchList.forEach(function(box){
                if(typeof Game.getObjectById(box) === 'null' || !Game.getObjectById(box) ){return;}

                if(_.sum(Game.getObjectById(box).store) >= 1250 && !roo.JobBoard[box] ){ /*if the box has over X amount stored already && isn't already being worked on*/
                console.log("A box needs empty in room: " + Game.getObjectById(box).room.name);
                    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == roomName );
                    if(dynTrans.length > 0){
                    dynTrans[0].memory.targetBoxId = box;
                    dynTrans[0].memory.state = 'OnJob';
                    roo.JobBoard[box] = {trans: dynTrans[0].id};
            
                    }else if(!DontSpawn){
                    console.log("WE need more dynTrans in room" +  roomName);
                    UtilitySpawn.SpawnDynTransport(spawnerName, AvailEnergy, roomName);
                    return true;
                    }
    
                }/*box is either not full or already on job board*/
                /*lets make sure it's being worked on*/
                else{ /*If it's on the board but no dynTrans are assigned to it, remove from board*/
                    if(roo.JobBoard[box])
                    { /*if its on the board, but full and < 2 trans set to it, lets set a 2nd*/
                        if(_.sum(Game.getObjectById(box).store) >= 2000 && _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.targetBoxId == box).length < 2){
                            var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == roomName );
                            if(dynTrans.length > 0){
                                dynTrans[0].memory.targetBoxId = box;
                                dynTrans[0].memory.state = 'OnJob';
                                roo.JobBoard[box] = {trans: dynTrans[0].id};
                                }else if(!DontSpawn){
                                    console.log("WE need more dynTrans in room" +  roomName);
                                    UtilitySpawn.SpawnDynTransport(spawnerName, AvailEnergy, roomName);
                                    return true;
                                    }
                        }else if(_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.targetBoxId == box).length < 1){ /*if its on the job board but no one assigned, remove it*/
                            console.log("Removing unworked jobListing: " + box + delete roo.JobBoard[box]);
                            }
                    }
                }
        
            });/*end for each BoxWatchList roo */
            return false;
            }catch(err){console.log('**err with watchboxes for room ' + roomName + ' : ' + err); return false;}
        }/*end WatchBoxes*/
        
        function RoomsToReserv(spawnerName, AvailEnergy, homeRoom, RoomsToReserv){
        
        RoomsToReserv.forEach(function(RTR)
        {
            if(_.filter(Game.creeps, (creep) => creep.memory.name == 'Claimer-' + RTR).length < 1)
            {
                var TTE;
                try{TTE = Game.rooms[RTR].controller.reservation.ticksToEnd;}
                catch(error){TTE = 0;}
                if(TTE < 2500)
                {
                    if(AvailEnergy > 1950){
                        Game.spawns[spawnerName].createCreep([CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE], 'Claimer-' + RTR, {role: 'claimer', homeRoom: RTR, job: 'reserve'});
                        return true;
                    }else{
                        Game.spawns[spawnerName].createCreep([CLAIM,CLAIM,MOVE,MOVE], 'Claimer-' + RTR, {role: 'claimer', homeRoom: RTR, job: 'reserve'});
                        return true;
                    }
                }/*else if(TTE < 2500){
                    Game.spawns[spawnerName].createCreep([CLAIM,CLAIM,MOVE], 'Claimer-'+ RTR, {role: 'claimer', homeRoom: RTR, job: 'reserve'});
                    return true;
                }*/
            }
        });
        return false;
        }/*end RoomsToReserv*/
        
        function LabWork(roomName){
        
        
    const LabJobs = [
        /*{labId: '5996f3149de67f5ebc376a64', storageId: '5967b3d74255e84adb21d33b', resType: RESOURCE_OXYGEN, storeMin: '500', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},*/
        {labId: '5998b4260286dc351bf54ebd', storageId: '5967b3d74255e84adb21d33b', resType: RESOURCE_HYDROGEN, storeMin: '500', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},
        {labId: '5997fd47104b9d0ab609afe3', storageId: '5978697d0a12b57374966c46', resType: RESOURCE_KEANIUM, storeMin: '500', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},
        {labId: '59a13db90bbef74653b4b5a6', storageId: '5978697d0a12b57374966c46', resType: RESOURCE_LEMERGIUM, storeMin: '300', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},
        {labId: '5996f3149de67f5ebc376a64', storageId: '5978697d0a12b57374966c46', resType: RESOURCE_ZYNTHIUM, storeMin: '0', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},
        {labId: '599e5ce6b653d36b3604461a', storageId: '5978697d0a12b57374966c46', resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '700', termId: '5978697d0a12b57374966c46', dropId: '599e5ce6b653d36b3604461a'}
        /*{labId: '599e5ce6b653d36b3604461a', storageId: '5967b3d74255e84adb21d33b', resType: RESOURCE_ENERGY, storeMin: '700', termId: '5978697d0a12b57374966c46', dropId: '5978697d0a12b57374966c46'},*/
       
        
        ];
    
    
        LabJobs.forEach(function(LabJob)
        {
           if(Game.getObjectById(LabJob.labId)){
               const lab = Game.getObjectById(LabJob.labId);
               if(lab.mineralAmount < LabJob.storeMin && Game.getObjectById(LabJob.storageId).store[LabJob.resType] > 499){
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E91N73' && creep.room.name == 'E91N73' );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E91N73').length < 1)){
                    dynTrans[0].memory.targetBoxId = LabJob.storageId;
                    dynTrans[0].memory.dropSiteId = LabJob.labId;
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = LabJob.resType;
                    }
                return;
               }
               
               
               
           }
           
           
        });
        /*oh*/
        /*if(Game.getObjectById('5997fc6fe3a2a06172f57130').cooldown < 1){
        Game.getObjectById('5997fc6fe3a2a06172f57130').runReaction(Game.getObjectById('5996f3149de67f5ebc376a64'), Game.getObjectById('5998b4260286dc351bf54ebd'));
        }*/
        /*ZK*/
        if(Game.getObjectById('5997fc6fe3a2a06172f57130').cooldown < 1){
        Game.getObjectById('5997fc6fe3a2a06172f57130').runReaction(Game.getObjectById('5996f3149de67f5ebc376a64'), Game.getObjectById('5997fd47104b9d0ab609afe3'));
        }
        
        /*&& (Game.getObjectById('5998b4260286dc351bf54ebd').store.*/
        /*if(Game.getObjectById('5998b4260286dc351bf54ebd').cooldown < 1  ){
        Game.getObjectById('5998b4260286dc351bf54ebd').runReaction(Game.getObjectById('59a13db90bbef74653b4b5a6'), Game.getObjectById('5997fd47104b9d0ab609afe3'));
        }*/
        
        }/*end LabWork*/
        
        function GetRoomNetwork(SpawnRoomName){
            switch(SpawnRoomName){
                case 'E89N68':
                    return ['E88N68', 'E88N67', 'E89N69'];
                    break;
                case 'E94N67':
                    return ['E94N68', 'E93N68', 'E93N67'];
                    break;
                case 'E91N72':
                    return ['E89N71', 'E89N72'];
                    break; 
                case 'E96N67':
                    return ['E96N67', 'E97N67'];
                    break;
                case 'E88N65':
                    return ['E88N65'];
                    break;
                default:
                    console.log("Error, no match in GetRoomNetwork for " + SpawnRoomName);
                    return [];
                    break;
            }
        }/*end GetRoomNetwork*/
        
         function SellMinerals(RoomName, ResourceType){
             
         }/*end SellMinerals*/
        
        
        
    return {
        WatchRooms: WatchRooms,
        WatchBoxes: WatchBoxes,
        RoomsToReserv: RoomsToReserv,
        LabWork: LabWork,
        GetRoomNetwork: GetRoomNetwork,
        SellMinerals: SellMinerals

    };
}());

module.exports = {utilityRoom
};