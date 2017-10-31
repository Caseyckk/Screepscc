var UtilityRoom = require('utility.room').utilityRoom;
var utils = require('testutil').utils;
var UtilitySpawn = require('utility.spawn').utilitySpawn;
const uThinker = require('Thinker.Utility').Utility;

var Thinker = (function(){
    function Harvesting(SpawnRoom, SpawnName) {
        
        /*console.log("Thinker Thinking...");*/
        if(!SpawnRoom){console.log("No SpawnRoom for Thinker.Harvester"); return; }
        if(!SpawnName){console.log("No SpawnName for Thinker.Harvester"); return; }
        
        
    /*maitenence: run this to setup memory*/ 
        if(!Memory.Thinker){Memory.Thinker = {};}
        if(!Memory.Thinker.SpawnRooms){Memory.Thinker.SpawnRooms = {};}
        if(!Memory.Thinker.SpawnRooms[SpawnRoom]){ Memory.Thinker.SpawnRooms[SpawnRoom] = {Rooms: []}; }
        
        /* check if all rooms exist, populate if not*/
        UtilityRoom.GetRoomNetwork(SpawnRoom).forEach(function(roomName){
            if(Memory.Thinker.SpawnRooms[SpawnRoom].Rooms[roomName] === undefined){
                uThinker.PopulateRoom(roomName, SpawnRoom);
            }
        });
    /* end maitenence section */
        
        /*todo: keep an eye on == VS === checks, these are fuzzy logic for this developer still.... */
       
       const ThinkCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === SpawnRoom && (creep.memory.role === 'dedharvester' || creep.memory.role === 'transport') && (creep.ticksToLive > 100 || creep.ticksToLive == undefined) );
        /*if(SpawnRoom == 'E89N68'){Memory.temp2 = ThinkCreeps;}*/
        /*if(SpawnRoom == 'E89N68'){console.log('thinker1');}*/
        var spawned = false;
        
        /*console.log(JSON.stringify(Memory.Thinker.SpawnRooms[SpawnRoom].Rooms));*/
        for(var RoomName in Memory.Thinker.SpawnRooms[SpawnRoom].Rooms)
        {        if(spawned == true){return;}
            /*console.log(RoomName);*/
            var harvRoom = Memory.Thinker.SpawnRooms[SpawnRoom].Rooms[RoomName];
            
           harvRoom.sources.some(function(source)
           {
               /*if(RoomName == 'E88N68'){console.log('thinker 2: ' + _.filter(ThinkCreeps, (creep) => creep.memory.sourceId == source.sourceId).length);}*/
               /*if(SpawnRoom == 'E94N67' && harvRoom == 'E94N68'){console.log(_.filter(ThinkCreeps, (creep) => creep.memory.sourceId == source.sourceId ).length);}*/
               if(!_.some(ThinkCreeps, (creep) => creep.memory.sourceId == source.sourceId )){
                   const hParts = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
                   /*console.log('thinker3');*/
                   UtilitySpawn.SpawnCreep(SpawnName, hParts ,'dedHarvester-' + Math.floor(Math.random()*10000)+1, {role: 'dedharvester', homeRoom: SpawnRoom, sourceId: source.sourceId, workRoom: RoomName, harvesting: true, dropSiteId: source.containerId });
           spawned = true;
                   return true; /*todo: multi spawner logic*/
               }
               if(!_.some(ThinkCreeps, (creep) => creep.memory.targetBoxId == source.containerId ) && Game.getObjectById(source.containerId) && Game.getObjectById(source.containerId).structureType != STRUCTURE_LINK){
                   const tParts = [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE];
                   
                   UtilitySpawn.SpawnCreep(SpawnName, tParts ,'transport-' + Math.floor(Math.random()*10000)+1, {role: 'transport', homeRoom: SpawnRoom, targetBoxId: source.containerId, dropSiteId: source.returnId });
           spawned= true;
                   return true; /*todo: multi spawner logic*/
               }
               
           });
        };
        if(spawned){console.log('Thinker Spawned'); return true;}
        
        console.log("Thinker Done thinking about harvesting: " + SpawnRoom);
        return false;
        
    } /*End Harvesting*/
    
    
    function LabWork(LabRoom) {
        var LabJobs = [];
        var MiscJobs = [];
        var termId;
        var storageId;
        
        if(!Memory.Labs){Memory.Labs = {JobBoard: {}, WorkBoard: {} }; }
        
        
        switch(LabRoom){
            case 'E91N73':
                termId = '5978697d0a12b57374966c46';
                storageId = '5967b3d74255e84adb21d33b' ;
                
                MiscJobs = [
                    {structureId: '5978697d0a12b57374966c46', resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    ];
                    /*only if overflow moving*/
                    if(Game.getObjectById('5967b3d74255e84adb21d33b').store[RESOURCE_OXYGEN] > 100000){ MiscJobs.push( {structureId: '5978697d0a12b57374966c46', resType: RESOURCE_OXYGEN, storeMin: 10000, storeMax: 25000} ); }
                    if(Game.getObjectById('5967b3d74255e84adb21d33b').store[RESOURCE_HYDROGEN] > 50000){ MiscJobs.push( {structureId: '5978697d0a12b57374966c46', resType: RESOURCE_HYDROGEN, storeMin: 10000, storeMax: 25000} ); }
                    /*if(Game.getObjectById('5967b3d74255e84adb21d33b').store[RESOURCE_ENERGY] > 500000){ MiscJobs.push( {structureId: '59c81652ebf78106f849b77c', resType: RESOURCE_ENERGY, storeMin: 0, storeMax: 10000} ); }*/
                    
                
                LabJobs = [
        /*{homeRoom: LabRoom, labId: '5997fd47104b9d0ab609afe3', storageId: storageId, resType: RESOURCE_KEANIUM, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},
        {homeRoom: LabRoom, labId: '59a13db90bbef74653b4b5a6', storageId: storageId, resType: RESOURCE_LEMERGIUM, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},
        {homeRoom: LabRoom, labId: '5996f3149de67f5ebc376a64', storageId: storageId, resType: RESOURCE_ZYNTHIUM, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},*/
        {homeRoom: LabRoom, labId: '599e5ce6b653d36b3604461a', storageId: termId, resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, isBooster: true},
        
        {homeRoom: LabRoom, labId: '59c6205066baa0444e0efce1', storageId: storageId, resType: RESOURCE_OXYGEN, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59c8e8abd5a81126e37db46a', storageId: termId, resType: RESOURCE_HYDROXIDE, storeMin: '', termId: termId, dropId: termId},
        /*{homeRoom: LabRoom, labId: '59c955b835fe7520a62ad7dd', storageId: storageId, resType: RESOURCE_OXYGEN RESOURCE_HYDROGEN RESOURCE_GHODIUM_ACID, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},*/
        {homeRoom: LabRoom, labId: '59c5b4efea2e2f105e8e2ad5', storageId: termId, resType: RESOURCE_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59c713198518e45fb1ece31f', storageId: termId, resType: RESOURCE_HYDROGEN, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59c8a2c0db83c308f9d48fe9', storageId: termId, resType: RESOURCE_GHODIUM, storeMin: '', termId: termId, dropId: termId},
        /*{homeRoom: LabRoom, labId: '59c966a045fe2835dcf42ebd', storageId: storageId, resType: RESOURCE_KEANIUM, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},
        {homeRoom: LabRoom, labId: '59c826fc5956b01e4805f558', storageId: storageId, resType: RESOURCE_KEANIUM, storeMin: '', termId: termId, dropId: '5978697d0a12b57374966c46'},*/
        {homeRoom: LabRoom, labId: '59c86be467e7714f9e651596', storageId: termId, resType: RESOURCE_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, Empty: true}
        
        ];
        
                break;
            case 'E91N72':
                termId = '5998724cb9a0010632894e24';
                storageId = '598a2b507485e54974552644' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    ];
                    if(!(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_KEANIUM] > 50000) && Game.getObjectById('598a2b507485e54974552644').store[RESOURCE_KEANIUM] > 0 &&  _.sum(Game.getObjectById('5998724cb9a0010632894e24').store) < 280000 ){ MiscJobs.push( {structureId: '5998724cb9a0010632894e24', resType: RESOURCE_KEANIUM, storeMin: 10000, storeMax: 25000} ); }
                    
                    LabJobs = [
        {homeRoom: LabRoom, labId: '59a7da4e2af23d7009bcc10c', storageId: storageId, resType: RESOURCE_KEANIUM, storeMin: '', termId: termId, dropId: '598a2b507485e54974552644'},
        {homeRoom: LabRoom, labId: '59a90a67f2e043679d5d64e2', storageId: termId, resType: RESOURCE_ZYNTHIUM, storeMin: '', termId: termId, dropId: '598a2b507485e54974552644'},
        {homeRoom: LabRoom, labId: '59ac5545583d5c22a6e638a6', storageId: storageId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: '598a2b507485e54974552644'},
        {homeRoom: LabRoom, labId: '59ab18df3f57de47639ff0a7', storageId: termId, resType: RESOURCE_GHODIUM, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59cc18b136275e60a6eadece', storageId: termId, resType: RESOURCE_GHODIUM, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59cf40fe35947e18164412ee', storageId: termId, resType: RESOURCE_GHODIUM, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59aa3da41a6546137ee8b2e2', storageId: termId, resType: RESOURCE_ZYNTHIUM_KEANITE, storeMin: '', termId: termId, dropId: termId}
        
        ];
                    
                
                break;
            case 'E89N68':
                termId = '59b5b8dca112247a3dafdfc7';
                storageId = '599fc222065bbc7edb30efc3' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 5000, storeMax: 15000}
                    
                    ];
                    
                     LabJobs = [
        {homeRoom: LabRoom, labId: '59b78240851f4e6163107a7b', storageId: termId, resType: RESOURCE_CATALYST, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59b6f0848bc25c0b1c61eb48', storageId: termId, resType: RESOURCE_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59b655fc240ab1154963005b', storageId: termId, resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59caf20af306e54350bbb52c', storageId: termId, resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59ca92b0d01dd503c6f6078f', storageId: termId, resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59ca7498ca564d16ed1e2b93', storageId: termId, resType: RESOURCE_CATALYZED_GHODIUM_ACID, storeMin: '', termId: termId, dropId: termId, isBooster: true}
        
        ];
                break;
            case 'E94N67':
                termId = '59bdf41ed34bc66ee5776192';
                storageId = '59b32d2ebefddd4b380b3cc1' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    
                    ];
                    
                    
                break;
            case 'E92N74':
                termId = '59c22944067aad1dfc64779d';
                storageId = '597a5148594af22cf2e97353' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    
                    ];
                    
                    LabJobs = [
        {homeRoom: LabRoom, labId: '59c2e48e406ccc754caff2a0', storageId: termId, resType: RESOURCE_LEMERGIUM, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59c348049228b87a743f6b18', storageId: termId, resType: RESOURCE_UTRIUM, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59c3ae82be0647161af8c1b1', storageId: termId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59c4150e8e99c646e9f697a5', storageId: termId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59c4e154aca20b183b83f991', storageId: termId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59c47a7c1675d553904d00f4', storageId: termId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: termId, Empty: true}
        
        ];
                    
                break;
        case 'E88N65':
             termId = '59e121e103f02f097f2d7cb0';
                storageId = '59d344f2187cac3aa41f3383' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    
                    ];
                    
                    LabJobs = [
        {homeRoom: LabRoom, labId: '59e01a518c448f78f64acaa2', storageId: termId, resType: RESOURCE_KEANIUM, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59ea31e5c829b55c3e236858', storageId: termId, resType: RESOURCE_ZYNTHIUM, storeMin: '', termId: termId, dropId: termId},
        {homeRoom: LabRoom, labId: '59e0717950eda179dcb35622', storageId: termId, resType: RESOURCE_ZYNTHIUM_KEANITE, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59ea7972648cb623ace9374e', storageId: termId, resType: RESOURCE_ZYNTHIUM_KEANITE, storeMin: '', termId: termId, dropId: termId, Empty: true},
        {homeRoom: LabRoom, labId: '59e96e202ab0eb3c9cdece99', storageId: termId, resType: RESOURCE_ZYNTHIUM_KEANITE, storeMin: '', termId: termId, dropId: termId, Empty: true}
        
        ];
            break;
                
       /* case '':
            termId = '';
                storageId = '' ;
                
                MiscJobs = [
                    {structureId: termId, resType: RESOURCE_ENERGY, storeMin: 20000, storeMax: 25000}
                    
                    ];
                    
                    LabJobs = [
        {homeRoom: LabRoom, labId: '59c47a7c1675d553904d00f4', storageId: termId, resType: RESOURCE_UTRIUM_LEMERGITE, storeMin: '', termId: termId, dropId: termId, Empty: true}
        
        ];
            break;*/
            
            default:
                return;
                break;
        }
        
        /*const fromId = '5967b3d74255e84adb21d33b';
        const toId ='5978697d0a12b57374966c46';
        Object.keys(Game.getObjectById(fromId).store).forEach(function(res){
            jobName = toId + res
             if(Game.getObjectById(fromId).store[res] < 10000 && (!Memory.Labs.WorkBoard[jobName] || !Memory.Labs.JobBoard[jobName])){
           Memory.Labs.JobBoard[jobName] = {homeRoom: 'E91N73', labId: toId, storageId: fromId, resType: res, resourceAmount: Game.getObjectById(fromId).store[res]}; 
             }
        });*/
        
        storage = Game.getObjectById(storageId);
        
        /*all jobs need{ homeRoom, labId, storageId, resType, resourceAmount,  */
        MiscJobs.forEach(function(job){
            const jobName = job.structureId + job.resType;
            if( (Game.getObjectById(job.structureId).store[job.resType] < job.storeMin || Game.getObjectById(job.structureId).store[job.resType] === undefined) && storage.store[job.resType] > 250){
                if(!Memory.Labs.WorkBoard[jobName] || !Memory.Labs.JobBoard[jobName]){
                    Memory.Labs.JobBoard[jobName] = {  homeRoom: LabRoom, labId: job.structureId, storageId: storageId, resType: job.resType, resourceAmount: (job.storeMax - Game.getObjectById(job.structureId).store[job.resType])  };
                }
            }
            
        });
        
        
        
    /*populate job board for labs*/ /* add it if lab has less than 2500 minerals, storage has at least 500, and it's not already on the boards */
    LabJobs.forEach(function(LabJob)
        {
           if(Game.getObjectById(LabJob.labId)){
               const lab = Game.getObjectById(LabJob.labId);
               const LabJobName = LabJob.labId + LabJob.resType;
               storage = Game.getObjectById(LabJob.storageId);
               
                if(LabJob.Empty ){
                    const emptyName = LabJob.storageId + LabJob.resType;
                    if(lab.mineralAmount > 500 && !Memory.Labs.JobBoard[emptyName] && !Memory.Labs.WorkBoard[emptyName]){
                        Memory.Labs.JobBoard[emptyName] = {homeRoom: LabRoom, labId: LabJob.storageId, storageId: LabJob.labId, resType: lab.mineralType, resourceAmount: lab.mineralAmount};
                    }
           }else{
               
               if((lab.mineralAmount < 2500 || lab.mineralAmount === undefined)  && storage.store[LabJob.resType] > 500){ /*store > 500 is set so that an igore is never starting less than a full job*/
                   if(!Memory.Labs.JobBoard[LabJobName] && !Memory.Labs.WorkBoard[LabJobName]){
                       LabJob.resourceAmount = 3000 - lab.mineralAmount;
                       if(LabJob.resourceAmount > storage[LabJob.resType]){LabJob.resourceAmount = storage[LabJob.resType];}
                       Memory.Labs.JobBoard[LabJobName] = LabJob;
                   }
               }
               
               if(LabJob.isBooster && lab.energy < 1250 && !(Memory.Labs.JobBoard[LabJob.labId + 'energy'] || Memory.Labs.WorkBoard[LabJob.labId + 'energy']) ){
                   Memory.Labs.JobBoard[LabJob.labId + 'energy'] = {  homeRoom: LabRoom, labId: LabJob.labId, storageId: storageId, resType: RESOURCE_ENERGY, resourceAmount: (2000 - lab.energy) };
               }
           }
           }
          
           
        });
    
    /*
        LabJobs.forEach(function(LabJob)
        {
           if(Game.getObjectById(LabJob.labId)){
               const lab = Game.getObjectById(LabJob.labId);
               if(lab.mineralAmount < LabJob.storeMin && Game.getObjectById(LabJob.storageId).store[LabJob.resType] > 499){
                   if(!Memory.Labs.JobBoard[LabJob.id] && !Memory.Labs.WorkBoard[LabJob.id]){ 
                        if(LabJob.storeMin != ''){LabJob.resourceAmount = LabJob.storeMin; }else{ LabJob.resourceAmount = 3000 - lab.mineralAmount;}
                        if(LabJob.resourceAmount > Game.getObjectById(LabJob.storageId).store[LabJob.resType]){LabJob.resourceAmount = Game.getObjectById(LabJob.storageId).store[LabJob.resType];}
                        Memory.Labs.JobBoard[LabJob.id] = LabJob;
                   }
               }
           }
        });*/
        
        /*run reactions*/
        if(Memory.Labs.hasRun == false){
            Memory.Labs.hasRun = true;
            
        const reactions = [
/* r1 */
{ rType: 'HO', reactionLabId: '59c8e8abd5a81126e37db46a', lab1Id: '59c6205066baa0444e0efce1', lab2Id: '59c713198518e45fb1ece31f'},
{ rType: 'HO', reactionLabId: '59c955b835fe7520a62ad7dd', lab1Id: '59c6205066baa0444e0efce1', lab2Id: '59c713198518e45fb1ece31f'},
{ rType: 'GH2O', reactionLabId: '59c5b4efea2e2f105e8e2ad5', lab1Id: '59c8e8abd5a81126e37db46a', lab2Id: '59c826fc5956b01e4805f558'},
{ rType: 'GH', reactionLabId: '59c966a045fe2835dcf42ebd', lab1Id: '59c713198518e45fb1ece31f', lab2Id: '59c8a2c0db83c308f9d48fe9'},
{ rType: 'GH', reactionLabId: '59c826fc5956b01e4805f558', lab1Id: '59c713198518e45fb1ece31f', lab2Id: '59c8a2c0db83c308f9d48fe9'},
{ rType: 'GH2O', reactionLabId: '59c86be467e7714f9e651596', lab1Id: '59c955b835fe7520a62ad7dd', lab2Id: '59c966a045fe2835dcf42ebd'},

/* r2 */
{ rType: 'UL', reactionLabId: '59c3ae82be0647161af8c1b1', lab1Id: '59c2e48e406ccc754caff2a0', lab2Id: '59c348049228b87a743f6b18'},
{ rType: 'UL', reactionLabId: '59c4150e8e99c646e9f697a5', lab1Id: '59c2e48e406ccc754caff2a0', lab2Id: '59c348049228b87a743f6b18'},
{ rType: 'UL', reactionLabId: '59c4e154aca20b183b83f991', lab1Id: '59c2e48e406ccc754caff2a0', lab2Id: '59c348049228b87a743f6b18'},
{ rType: 'UL', reactionLabId: '59c47a7c1675d553904d00f4', lab1Id: '59c2e48e406ccc754caff2a0', lab2Id: '59c348049228b87a743f6b18'},

/* r4 */
            /*{ rType: 'ZK', reactionLabId: '5997fc6fe3a2a06172f57130', lab1Id: '5996f3149de67f5ebc376a64', lab2Id: '5997fd47104b9d0ab609afe3'},*/
            
                                                    /* ZK2 */                                /* Z */                             /* K */
            { rType: 'ZK', reactionLabId: '59ad74a0e698a957ed89c252', lab1Id: '59a90a67f2e043679d5d64e2', lab2Id: '59a7da4e2af23d7009bcc10c'},
            
                                                    /* ZK1 */                                /* Z */                             /* K */
            { rType: 'ZK', reactionLabId: '59aa3da41a6546137ee8b2e2', lab1Id: '59a90a67f2e043679d5d64e2', lab2Id: '59a7da4e2af23d7009bcc10c'},
            { rType: 'ZK', reactionLabId: '59cebee9b20f7b6de2aa0df5', lab1Id: '59a90a67f2e043679d5d64e2', lab2Id: '59a7da4e2af23d7009bcc10c'},
            
                                                    /*  */                                /* UL */                             /* ZK1/ZK2 */
            { rType: 'G', reactionLabId: '59ab18df3f57de47639ff0a7', lab1Id: '59ac5545583d5c22a6e638a6', lab2Id: '59aa3da41a6546137ee8b2e2'},                                                    /*  */                                /* UL */                             /* ZK1 */
            /*{ rType: 'G', reactionLabId: '59ab18df3f57de47639ff0a7', lab1Id: '59ac5545583d5c22a6e638a6', lab2Id: '59ad74a0e698a957ed89c252'},*/
            { rType: 'G', reactionLabId: '59cc18b136275e60a6eadece', lab1Id: '59ac5545583d5c22a6e638a6', lab2Id: '59ad74a0e698a957ed89c252'},
            { rType: 'G', reactionLabId: '59cf40fe35947e18164412ee', lab1Id: '59ac5545583d5c22a6e638a6', lab2Id: '59cebee9b20f7b6de2aa0df5'},
            
                                                    /*  */                                /*  */                             /* NA */
            { rType: 'XGH20', reactionLabId: '59b655fc240ab1154963005b', lab1Id: '59b6f0848bc25c0b1c61eb48', lab2Id: '59b78240851f4e6163107a7b'},
            { rType: 'XGH20', reactionLabId: '59ca92b0d01dd503c6f6078f', lab1Id: '59b6f0848bc25c0b1c61eb48', lab2Id: '59b78240851f4e6163107a7b'},
            { rType: 'XGH20', reactionLabId: '59caf20af306e54350bbb52c', lab1Id: '59b6f0848bc25c0b1c61eb48', lab2Id: '59b78240851f4e6163107a7b'},
/* r6 */
            { rType: 'ZK', reactionLabId: '59e96e202ab0eb3c9cdece99', lab1Id: '59ea31e5c829b55c3e236858', lab2Id: '59e01a518c448f78f64acaa2'},
            { rType: 'ZK', reactionLabId: '59e0717950eda179dcb35622', lab1Id: '59ea31e5c829b55c3e236858', lab2Id: '59e01a518c448f78f64acaa2'},
            { rType: 'ZK', reactionLabId: '59ea7972648cb623ace9374e', lab1Id: '59ea31e5c829b55c3e236858', lab2Id: '59e01a518c448f78f64acaa2'}
            ];
            
        reactions.forEach(function(reaction)
        {
            if(Game.getObjectById(reaction.reactionLabId).cooldown < 1){
                Game.getObjectById(reaction.reactionLabId).runReaction(Game.getObjectById(reaction.lab1Id), Game.getObjectById(reaction.lab2Id));
            }
        });
        
        if(Game.time % 10 === 0){
            const egores = _.filter(Game.creeps, (creep) => creep.memory.role == 'egore' && creep.memory.state != 'NoJob');
               Object.keys(Memory.Labs.WorkBoard).forEach(function(jobId){
                   const job = Memory.Labs.WorkBoard[jobId];
                   /*console.log('job: '+ job.labId + ' ' + job.resType);*/
                  if(_.filter(egores, (creep) => creep.memory.dropBoxId == job.labId).length < 1){delete Memory.Labs.WorkBoard[jobId];}
               });
               
                if(!(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_ZYNTHIUM] > 50000)){Game.getObjectById('59bdf41ed34bc66ee5776192').send(RESOURCE_ZYNTHIUM, 5000, 'E91N72');}
                if(!(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_ZYNTHIUM] > 50000)){Game.getObjectById('59e121e103f02f097f2d7cb0').send(RESOURCE_ZYNTHIUM, 5000, 'E91N72');}
                if(!(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_UTRIUM_LEMERGITE] > 50000)){Game.getObjectById('59c22944067aad1dfc64779d').send(RESOURCE_UTRIUM_LEMERGITE, 5000, 'E91N72');}
               if(!(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_UTRIUM_LEMERGITE] > 50000)){Game.getObjectById('5978697d0a12b57374966c46').send(RESOURCE_UTRIUM_LEMERGITE, 5000, 'E91N72');}
               
                if(!(Game.getObjectById('5978697d0a12b57374966c46').store[RESOURCE_GHODIUM] > 50000)){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_GHODIUM, 5000, 'E91N73');}
                if(!(Game.getObjectById('59e121e103f02f097f2d7cb0').store[RESOURCE_GHODIUM] > 50000)){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_GHODIUM, 5000, 'E88N65');}
                if(!(Game.getObjectById('59b5b8dca112247a3dafdfc7').store[RESOURCE_GHODIUM_ACID] > 50000)){Game.getObjectById('5978697d0a12b57374966c46').send(RESOURCE_GHODIUM_ACID, 5000, 'E89N68');}
                if(!(Game.getObjectById('5978697d0a12b57374966c46').store[RESOURCE_HYDROGEN] > 50000)){Game.getObjectById('59c22944067aad1dfc64779d').send(RESOURCE_HYDROGEN, 5000, 'E91N73');}
                if(!(Game.getObjectById('59e121e103f02f097f2d7cb0').store[RESOURCE_HYDROGEN] > 50000)){Game.getObjectById('59c22944067aad1dfc64779d').send(RESOURCE_HYDROGEN, 5000, 'E88N65');}
              if((Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_ENERGY] > 50000)){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_ENERGY, 5000, 'E88N65');}
               if((Game.getObjectById('5978697d0a12b57374966c46').store[RESOURCE_ENERGY] > 50000)){Game.getObjectById('5978697d0a12b57374966c46').send(RESOURCE_ENERGY, 5000, 'E88N65');}
              if((Game.getObjectById('59bdf41ed34bc66ee5776192').store[RESOURCE_ENERGY] > 50000)){Game.getObjectById('59bdf41ed34bc66ee5776192').send(RESOURCE_ENERGY, 5000, 'E88N65');}
               if((Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_ENERGY] > 50000)){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_ENERGY, 5000, 'E88N65');}
               if((Game.getObjectById('59b5b8dca112247a3dafdfc7').store[RESOURCE_ENERGY] > 50000)){Game.getObjectById('59b5b8dca112247a3dafdfc7').send(RESOURCE_ENERGY, 5000, 'E88N65');}
               /* r6 */
                if(!(Game.getObjectById('59e121e103f02f097f2d7cb0').store[RESOURCE_KEANIUM] > 50000)){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_KEANIUM, 5000, 'E88N65');}
        }
        
        /*oh*/
        /*if(Game.getObjectById('5997fc6fe3a2a06172f57130').cooldown < 1){
        Game.getObjectById('5997fc6fe3a2a06172f57130').runReaction(Game.getObjectById('5996f3149de67f5ebc376a64'), Game.getObjectById('5998b4260286dc351bf54ebd'));
        }*/
        /*ZK*/
        /*if(Game.getObjectById('5997fc6fe3a2a06172f57130').cooldown < 1){
        Game.getObjectById('5997fc6fe3a2a06172f57130').runReaction(Game.getObjectById('5996f3149de67f5ebc376a64'), Game.getObjectById('5997fd47104b9d0ab609afe3'));
        }*/
        
        }
    } /*End LabWork*/

    
    return {
        Harvesting: Harvesting,
        LabWork: LabWork

    };
}());

module.exports = {Thinker
};