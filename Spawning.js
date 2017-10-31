var UtilitySpawn = require('utility.spawn').utilitySpawn;
var utils = require('testutil').utils;
var UtilityRoom = require('utility.room').utilityRoom;
var Thinker = require('Thinker').Thinker;

var Spawning = (function(){
    
    function SpawnR6(Spawner){
        if(!_.some(Spawner.room.roomCreeps, (creep) => creep.name == 'transport-59d7dee6f2684b64f5eb59f7'))
        {Spawner.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE], 'transport-59d7dee6f2684b64f5eb59f7', {role: 'transport', homeRoom: Spawner.pos.roomName, targetBoxId: '59d7dee6f2684b64f5eb59f7', dropSiteId: '59d344f2187cac3aa41f3383'}); return;}
        
        /*Mining */
    if((Game.getObjectById('5873c17b63ad7a7555b7bcd8').mineralAmount > 0) && !_.some(Game.creeps, (creep) => creep.name == 'miner-5873c17b63ad7a7555b7bcd8')){
    UtilitySpawn.SpawnCreep(Spawner.name, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-5873c17b63ad7a7555b7bcd8', {role: 'miner', workRoom: Spawner.pos.roomName, targetSiteId: '5873c17b63ad7a7555b7bcd8', dropSiteId: '59e121e103f02f097f2d7cb0', state: 'Mining'});
    return;
    }  
    
    if(!_.some(Spawner.room.roomCreeps, (creep) => creep.name == 'transport-59e121e103f02f097f2d7cb0'))
        {Spawner.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'transport-59e121e103f02f097f2d7cb0', {role: 'transport', homeRoom: Spawner.pos.roomName, targetBoxId: '59e121e103f02f097f2d7cb0', dropSiteId: '59d344f2187cac3aa41f3383'}); return;}
        
         /*const roomUpgds = _.filter(Spawner.room.roomCreeps, (creep) => creep.memory.role === 'upgrader');
    if(Spawner.room.MainStorage.store[RESOURCE_ENERGY] > 500000 && roomUpgds.length < 6 ) {
        const uParts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        Spawner.createCreep(uParts, 'UpgraderMAX-' + Math.floor(Math.random()*10000)+1 , {role: 'upgrader', homeRoom: Spawner.pos.roomName, targetBoxId: Spawner.room.MainStorage.id}); 
        return;
    }*/
        
        const roomUpgds = _.filter(Spawner.room.roomCreeps, (creep) => creep.memory.role === 'upgrader');
    if(Spawner.room.MainStorage.store[RESOURCE_ENERGY] > 500000 && roomUpgds.length < 12 ) {
        UtilitySpawn.SpawnUpgrader(Spawner.name, Spawner.room.energyAvailable, Spawner.room.name, Spawner.room.MainStorage.id);
        return;
    }
    const roomBld2 = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == Spawner.room.name && creep.memory.role == 'builder' && creep.memory.type == 'Decons');
    if(roomBld2.length < 1 && Game.getObjectById('58e027aa679dec6747efed47') != null) {
        UtilitySpawn.SpawnCreep(Spawner.name, [WORK,WORK,WORK,WORK,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'DeConstructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: Spawner.room.name, type: 'Decons', role: 'builder', targetId: '58e027aa679dec6747efed47', canDecon: true});
        return;
    }
    
    }/* end spawn 6 */
    
        function BasicSpawning(Spawner, isNew){
try{
        /*const Spawner =  Game.spawns[SpawnName];*/
        var minCount = 1; if(isNew){minCount = 2;}
        const SpawnName = Spawner.name;
        const RoomName =  Spawner.room.name;
        const thisRoom = Game.rooms[RoomName];
        
        const roomCreeps = thisRoom.roomCreeps;
        const roomHarvs = _.filter(roomCreeps, (creep) => creep.memory.role === 'harvester');
		const roomTankers = _.filter(roomCreeps, (creep) => creep.memory.role === 'tanker');
        
        const MainStorage = Spawner.room.MainStorage;
        const AvailEnergy = Spawner.room.energyAvailable;
        const CapEnergy = Spawner.room.energyCapacityAvailable;
        
        /*const roomCreepsRoles = _.groupBy(roomCreeps, 'memory.role');
     console.log(roomCreepsRoles['harvester'].length);*/
     /*const creepCount = _.countBy(roomCreeps, 'memory.role');*/
     
     /*Urgent spawn*/ /**
     var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    if(defenders.length < 1) {
    console.log("Trying to spawn defender: " + Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: 'raid1', homeRoom: 'E91N73'}));
    return;
    }**/
    
    if(roomTankers.length < 1 && roomHarvs < 2){
		UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, MainStorage);
        return;
	}
	
	if(thisRoom.WatchRooms(SpawnName, AvailEnergy, true)){return;}
    
	const roomUpgds = _.filter(roomCreeps, (creep) => creep.memory.role === 'upgrader');
    if(roomUpgds.length < minCount) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, MainStorage.id);
        return;
    }
	
	const roomBld = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
    if(roomBld.length < minCount) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
	
	/*const dedSources = UtilityRoom.GetDedSources(RoomName);
	
	dedSources.forEach(function(DS)
    {
        if(!(_.some(roomCreeps, (creep) => creep.name == 'dedHarvester-' + DS.sourceId))){
            utilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + DS.sourceId, {role: 'dedharvester', sourceId: DS.sourceId, homeRoom: DS.homeRoom, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else{if( !(DS.returnSiteId == '') && !(_.some(roomCreeps, (creep) => creep.name == 'transport-' + DS.dropSiteId))){
             utilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + DS.dropSiteId, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }}
    }); /*dedSources*/
	
	if(roomTankers.length < 2){
		{Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-' + Math.floor(Math.random()*10000)+1, {role: 'tanker', homeRoom: RoomName, targetBoxId: MainStorage.id}); return;}
		return;
	}	
	    
    try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker: ' + error); }
	
	try{
     if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName) )){return;}
    }catch(error){console.log('error spawn[' + SpawnName + '] watch boxes' + error);}
	
	     if(!(_.some(roomCreeps, (creep) => creep.role == 'igore')) && _.some(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName)){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-' + RoomName, {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
        return;
    }
    if(isNew){
        const roomBldCs = _.filter(roomCreeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && creep.memory.type == 'Cons');
        if(roomBldCs.length < 1) {
            UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
            return;
        }
    }
    
    if(!_.some(roomCreeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == RoomName )){
        UtilitySpawn.SpawnDynTransport(SpawnName, AvailEnergy, RoomName);
        return;
        }
                 
                 /*Mining */
    /*if((Game.getObjectById(Spawner.room.Mineral).mineralAmount > 0) &&_.filter(Game.creeps, (creep) => creep.name == 'miner-5873c17b63ad7a7555b7bd77').length < 1 ){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-5873c17b63ad7a7555b7bd77', {role: 'miner', workRoom: 'E89N68', targetSiteId: '5873c17b63ad7a7555b7bd77', dropSiteId: '59b5b8dca112247a3dafdfc7', state: 'Mining'});
    return;
    }  */
    
    try{
    switch(RoomName){
        case 'E88N65':
            SpawnR6(Spawner);
            return;
            break;
    }}catch(err){console.log(err);}
            
}catch(err){console.log('** error in BasicSpawning[' + Spawner.name + ']: ' + err)};

    }

function SpawnCaseyHome(SpawnName){

var logging = false;
var MaxBuilders = 1;
var OHarvesters = 2;
var MaxRaiders = 1;


    try{
/**Room E91N73**/
     const RoomName = 'E91N73';
     
     const roomCreeps = Game.rooms[RoomName].roomCreeps;
     /*console.log(roomCreeps);*/
     /*const roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === RoomName && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));*/

    const roomHarvs = _.filter(roomCreeps, (creep) => creep.memory.role === 'harvester');
    
    
    /*var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' );*/
    /*var dedHarvest ers = _.filter(Game.creeps, (creep) => creep.memory.role === 'dedharvester' );*/
    /*var transporters = _.filter(Game.creeps, (creep) => creep.memory.role === 'transporter' );*/
    
     var AvailEnergy = Game.spawns['Casey Home'].room.energyAvailable;
     var CapEnergy =  Game.spawns['Casey Home'].room.energyCapacityAvailable;
     
     /*const SpawnName = 'Casey Home';*/

    
     /*if(_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedattacker').length < 1)
    {
        UtilitySpawn.SpawnFighter(SpawnName, 'PatrollerR', 'defend', 'E91N75');
		return;
    }*/
    
     /*Urgent spawn*/ /**
     var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    if(defenders.length < 1) {
    console.log("Trying to spawn defender: " + Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: 'raid1', homeRoom: 'E91N73'}));
    
    return;
    }**/
    
    /** Casey Home **/
    
    /*var roomharv = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == 'E91N73' && creep.memory.role == 'harvester' && creep.ticksToLive > 100);*/
   if(logging){ console.log('Harvesters[E91N73]: ' + roomharvs.length);}
    if(roomHarvs.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '5967b3d74255e84adb21d33b');
        return;
    }
    
    if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E91N73', 'E92N73', 'E91N74'], true)){return;}
      
    
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
    
const roomUpgds = _.filter(roomCreeps, (creep) => creep.memory.role === 'upgrader');
    /*var roomUpg = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == 'E91N73' && creep.memory.role == 'upgrader' && creep.ticksToLive > 100);*/
    if(logging){console.log('Upgrader: ' + roomUpgds.length);}
    if(roomUpgds.length < 1) {
        /*UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, 'E91N73');*/
        var newName = Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], 'Upgrader1-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: 'E91N73'});
        /*var newName = Game.spawns[SpawnName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader3_5U-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: 'E91N73'});*/
                console.log('Spawning new upgrader: ' + newName + ' at ::' + SpawnName);
                
        return;
    }
    
    if(roomHarvs.length < (OHarvesters + 1)) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, 'E91N73','5967b3d74255e84adb21d33b');
        return;
    }
    
    
    
            var dedSources = [
        {sourceId:'58dbc57e8283ff5308a407cf' , homeRoom: 'E91N73', workRoom: 'E92N73', dropSiteId: '59720dd6135cf74e25128b85' , returnSiteId: '596afb3c0adae05bb9405b6a', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
        {sourceId:'58dbc55a8283ff5308a4053b' , homeRoom: 'E91N73', workRoom: 'E91N73', dropSiteId: '596afb3c0adae05bb9405b6a' , returnSiteId: '', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: []},
        {sourceId:'58dbc55a8283ff5308a40536' , homeRoom: 'E91N73', workRoom: 'E91N74', dropSiteId: '5972d28c88644b7094da7d32' , returnSiteId: '5978b34242fa9c389425a70b', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]}
        
    ];
    
    dedSources.forEach(function(DS)
    {
        if(!_.some(Game.creeps, (creep) => creep.name == 'dedHarvester-' + DS.sourceId)){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + DS.sourceId, {role: 'dedharvester', sourceId: DS.sourceId, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else{if( !(DS.returnSiteId == '') && !_.some(Game.creeps, (creep) => creep.name == 'transport-' + DS.dropSiteId)){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + DS.dropSiteId, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }}
     
    }); /*dedSources*/
    
    
    /*home room disperse*/
    if(!_.some(roomCreeps, (creep) => creep.name == 'tanker-5967b3d74255e84adb21d33b'))
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-5967b3d74255e84adb21d33b', {role: 'tanker', homeRoom: 'E91N73', targetBoxId: '5967b3d74255e84adb21d33b'}); return;}
    
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'tanker2-5967b3d74255e84adb21d33b').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker2-5967b3d74255e84adb21d33b', {role: 'tanker', homeRoom: 'E91N73', targetBoxId: '5967b3d74255e84adb21d33b'}); return;}
    */
    /*home room transfer transport*/
    if(!_.some(roomCreeps, (creep) => creep.name == 'transport-596b106b56c8ae575ff170c5'))
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE], 'transport-596b106b56c8ae575ff170c5', {role: 'transport', homeRoom: 'E91N73', targetBoxId: '596b106b56c8ae575ff170c5'}); return;}
    
    
    const AllRaiders = _.filter(Game.creeps, (creep) => creep.memory.role == 'raider' && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));
    if(AvailEnergy >= 1000){
            var raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid1');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'Raider2-raid1_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid1', homeRoom: 'E91N73'})
                    return;
                }
                
                /*raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid8');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid8_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid8', homeRoom: 'E91N72'})
                    return;
                }*/
                
                /*raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid9');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid9_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid9', homeRoom: 'E91N72'})
                    return;
                }*/
                
                 raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid7');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider1-raid7_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid7', homeRoom: 'E89N68'})
                    return;
                }
                
                /*raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid2'); 
                if(raiders.length < 0) {
                UtilitySpawn.SpawnCreep('Casey Home', [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'Raider2-raid2_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid2', homeRoom: 'E92N74'})
                    return;
                }*/
                
                /*raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid3');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep('Casey Home', [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'Raider2-raid3_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid3', homeRoom: 'E92N74'})
                    return;
                }*/
                
                /*
                raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid4'); 
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep('Casey Home', [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider2-raid4_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid4', homeRoom: 'E91N73'})
                    return;
                }*/
        }
    const roomBlds = _.filter(roomCreeps, (creep) => creep.memory.role === 'builder');
    
    /*var roomBld = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == 'E91N73' && creep.memory.role == 'builder' && creep.ticksToLive > 100);*/
    if(logging){console.log('Builder: ' + roomBlds.length);}
    if(roomBlds.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, 'E91N73');
        return;
    }
    
    
    
    if(AvailEnergy == CapEnergy && roomBlds.length < MaxBuilders)
        {UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, 'E91N73');  return;}
        else{if(AvailEnergy == CapEnergy && !roomBlds.length < MaxBuilders){console.log('Max energy but not spawning builders because builder count = ' + roomBlds.length)}}
    
    
    if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E92N73', 'E91N74'])){return;}
    
    /*Mining */
    if((Game.getObjectById('58dbc92134e898064bcc2f5b').mineralAmount > 0) &&_.filter(Game.creeps, (creep) => creep.name == 'miner-58dbc92134e898064bcc2f5b').length < 1 ){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-58dbc92134e898064bcc2f5b', {role: 'miner', workRoom: 'E91N73', targetSiteId: '58dbc92134e898064bcc2f5b', dropSiteId: '59dba24d57423a168aca4f0d', state: 'Mining'});
    return;
    }
    
    /**var storages = ['598202abfb76d906a37685a9'];
    storages.forEach(function(StorageId)
    {
     if(_.sum(Game.getObjectById(StorageId).store) > 1500)
     {
         
     }
     
    }); /* End storages */
    
     /*
    function WatchBoxes(spawnerName, AvailEnergy, roomName, BoxWatchList){*/
    if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName))){return;}
    
    if(_.filter(roomCreeps, (creep) => creep.name == 'Igore-E91N73').length < 1 && _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName).length > 0){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-E91N73', {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
            
        return;
    }
if(Game.getObjectById(utils.GetMainStorageId(RoomName)).store.energy > 40000){
    const roomBld = _.filter(roomBlds, (creep) => creep.memory.type == 'Cons');
    if(roomBld.length < 1 ) {
        /*UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});*/
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        return;
    }}
    
    /*if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker').length < 1) {
       var newName = Game.spawns[SpawnName].createCreep([ATTACK,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'E93N72', homeRoom: 'E91N73'});
       Game.creeps[newName].notifyWhenAttacked = false;
     console.log('Spawning new run attacker: ' + newName);
     }*/
    
    /**var attackers = _.filter(Game.creeps, (creep) => creep.name == 'defender_attack2');
    if(attackers.length < 1) {
     var newName = Game.spawns[SpawnName].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'defender_attack2', {role: 'defender', raidFlag: 'raidpower', homeRoom: 'E92N72'}) 
        console.log('Spawning new defender_attack2: ' + newName);
    }
     var attackers = _.filter(Game.creeps, (creep) => creep.name == 'defender_attack2_2');
    if(attackers.length < 1) {
     var newName = Game.spawns[SpawnName].createCreep([ATTACK,ATTACK,MOVE,MOVE], 'defender_attack2_2', {role: 'defender', raidFlag: 'raidpower', homeRoom: 'E92N72'}) 
        console.log('Spawning new defender_attack2_2: ' + newName);
    }**/
    
        /**if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker' && !creep.memory.state).length < 5) {
     /*Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'AP1', homeRoom: 'E91N73'})  */        
        /**var newName = Game.spawns[SpawnName].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'AP1', homeRoom: 'E91N73'}) 
        console.log('Spawning new flagAttacker: ' + newName);
        return;
    }
    
    if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker' && creep.memory.state == 'healer').length < 3) {
     /*Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'AP1', homeRoom: 'E91N73'})  */        
        /**var newName = Game.spawns[SpawnName].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', state: 'healer', raidFlag: 'AP1', homeRoom: 'E94N72'}) 
     console.log('Spawning new healer: ' + newName);
    }**/
    
    /** End Casey Home **/

     /* function SpawnCreep(spawnerName, Parts, creepName, options) */

/*var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker');

    if(attackers.length < 1) {
     Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'raidpower', homeRoom: 'E91N73'})          
        var newName = Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'raid2', homeRoom: 'E91N73'}) 
        console.log('Spawning new flagAttacker: ' + newName);
    }*/
     
     /*if(_.filter(Game.creeps, (creep) => creep.name == 'thief-595ab9ddb23ae1548ad73c64').length < 1){
     Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief-595ab9ddb23ae1548ad73c64', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595ab9ddb23ae1548ad73c64', thiefRoom: 'E92N74'});
}*/


/*if(_.filter(Game.creeps, (creep) => creep.name == 'thief-595a9c1a8265b569e0e16385').length < 1){
     Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief-595a9c1a8265b569e0e16385', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595a9c1a8265b569e0e16385', thiefRoom: 'E92N74'});
}*/
/*if(_.filter(Game.creeps, (creep) => creep.name == 'thief2-595a9c1a8265b569e0e16385').length < 1){
     Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief2-595a9c1a8265b569e0e16385', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595a9c1a8265b569e0e16385', thiefRoom: 'E92N74'});
}*/
/*
if(_.filter(Game.creeps, (creep) => creep.name == 'thief-595a7c141b30338c0495a013').length < 1){
     Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief-595a7c141b30338c0495a013', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595a7c141b30338c0495a013', thiefRoom: 'E92N74'});
}
if(_.filter(Game.creeps, (creep) => creep.name == 'thief2-595a7c141b30338c0495a013').length < 1){
     Game.spawns['Casey Home'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief2-595a7c141b30338c0495a013', {role: 'thief', homeRoom: 'E91N73', targetBoxId: '595a7c141b30338c0495a013', thiefRoom: 'E92N74'});
}*/

UtilitySpawn.RenewSurrounding(SpawnName);
}/*end of first try*/
   catch(err){
    console.log('error in spawn 1' + err);
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 2) {
        var newName = Game.spawns['Casey Home'].createCreep([WORK,CARRY,MOVE], 'Harvester-' + Math.floor(Math.random()*10000)+1, {role: 'harvester'});
    console.log('Spawning new harvester: ' + newName);
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < 1) {
        var newName = Game.spawns['Casey Home'].createCreep([WORK,CARRY,MOVE], 'Upgrader-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    
       var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < 2) {
        var newName = Game.spawns['Casey Home'].createCreep([WORK,CARRY,MOVE], 'Builder-' + Math.floor(Math.random()*10000)+1, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
   } /*end catch*/
    
}/*end Room E91N73*/

function SpawnHome2(){
/*r2*/
var logging = false;
const MaxBuilders = 3;
const OHarvesters = 3;
const MaxRaiders = 2;

    try{
/**Room E92N74**/
const RoomName = 'E92N74';
const SpawnName = 'Home2';
const AvailEnergy = Game.spawns[SpawnName].room.energyAvailable;
const CapEnergy =  Game.spawns[SpawnName].room.energyCapacityAvailable;

var roomharv = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'harvester' && creep.ticksToLive > 200);
    if(roomharv.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '597a5148594af22cf2e97353');
        return;
    }
    
    if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E92N74', 'E92N75'], true)){return;}
     
     /*if(!_.some(Game.creeps, (creep) => creep.name == 'tester')){
         Game.spawns[SpawnName].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tester', {memory: {role: 'transport', type: 1, state: 'PickUp', homeRoom: RoomName, targetBoxId: '5972d28c88644b7094da7d32'}});
         return;
     }*/
    
     var roomUpg = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'upgrader' && creep.ticksToLive > 100);
    if(logging){console.log('Upgrader: ' + roomUpg.length);}
    if(roomUpg.length < 1) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName);
        return;
    }
    
    var roomBld = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && creep.ticksToLive > 100);
    if(logging){console.log('Builder: ' + roomBld.length);}
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
    
    /*room disperse*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-597a5148594af22cf2e97353').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-597a5148594af22cf2e97353', {role: 'tanker', homeRoom: 'E92N74', targetBoxId: '597a5148594af22cf2e97353'});return;}
    
                var dedSources = [
        {sourceId:'58dbc57e8283ff5308a407cb' , homeRoom: 'E92N74', workRoom: 'E92N74', dropSiteId: '597a5148594af22cf2e97353' , returnSiteId: '', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: []},
        {sourceId:'58dbc57e8283ff5308a407c7' , homeRoom: 'E92N74', workRoom: 'E92N75', dropSiteId: '596db14e3a9cca2df02335d8' , returnSiteId: '597f585ff22e58143eed2e0a', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
        
        ];
    
    dedSources.forEach(function(DS)
    {
        if(_.filter(Game.creeps, (creep) => creep.name == 'dedHarvester-' + DS.sourceId).length < 1){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + DS.sourceId, {role: 'dedharvester', sourceId: DS.sourceId, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else{if( !(DS.returnSiteId == '') && _.filter(Game.creeps, (creep) => creep.name == 'transport-' + DS.dropSiteId).length < 1){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + DS.dropSiteId, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }}
     
    }); /*dedSources*/
    
    /*home room transfer transport*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'transport-597f4a5677c0020a14bb5ab4').length < 1){
        Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE], 'transport-597f4a5677c0020a14bb5ab4', {role: 'transport', homeRoom: 'E92N74', targetBoxId: '597f4a5677c0020a14bb5ab4', dropSiteId: '597a5148594af22cf2e97353'});
        return;
    }
    
    UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E92N75']);
        
        /**raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid4'); 
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep('Home2', [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider2-raid4_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid4', homeRoom: 'E92N74'})
                    return;
                }**/
        
        if(_.filter(Game.creeps, (creep) => creep.name == 'miner-58dbc92234e898064bcc300e').length < 1 && Game.getObjectById('58dbc92234e898064bcc300e').mineralAmount > 0){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-58dbc92234e898064bcc300e', {role: 'miner', workRoom: 'E92N74', targetSiteId: '58dbc92234e898064bcc300e', dropSiteId: '59c22944067aad1dfc64779d', state: 'Mining'});
    return;
        }
        /*
        /**if(utils.GetMainStorage(RoomName).storage.energy > 20000)
        {
             var roomUpgOver = _.filter(Game.creeps, (creep) => creep.memory.name == 'upgrade_Over-' + RoomName );
    if(roomUpgOver.length < 1) { 
        UtilitySpawn.SpawnCreep(SpawnNAme, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'upgrade_Over-' + RoomName, {});
        return;
    }
    
        }**/
        
        if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, ['596db14e3a9cca2df02335d8','5983d33fb9bd266e0e8918c7', '5983d33fb9bd266e0e8918c7'])){return;}
        
         /*if(Game.getObjectById('597a5148594af22cf2e97353').store[RESOURCE_HYDROGEN] > 5000 &&_.filter(Game.creeps, (creep) => creep.name == 'transport-H').length < 1){
        Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'transport-H', {role: 'transport', homeRoom: 'E92N74', targetBoxId: '597a5148594af22cf2e97353', dropSiteId: '5967b3d74255e84adb21d33b'});
        return;
    }*/
    
    raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid7');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider1-raid7_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid7', homeRoom: 'E89N68'})
                    return;
                }
                
     /*const roomBld2 = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && creep.memory.type == 'Decons');
    if(roomBld2.length < 1 && Game.getObjectById('598d02713f491575be660274') != null) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'DeConstructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Decons', role: 'builder', targetId: '598d02713f491575be660274'});
        return;
    }*/
    
    const roomBld2 = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld2.length < 1 ) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        return;
    }
    
    if(_.filter(Game.creeps, (creep) => creep.name == 'Igore-E92N74').length < 1 && _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName).length > 0){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-E92N74', {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
            
        return;
    }
    
    /*if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker').length < 1) {
       var newName = Game.spawns[SpawnName].createCreep([ATTACK,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'E93N72', homeRoom: 'E91N73'});
       Game.creeps[newName].notifyWhenAttacked = false;
     console.log('Spawning new run attacker: ' + newName);
     }*/
     
    /*var attackers = _.filter(Game.creeps, (creep) => creep.name == 'defender_attack3');
    if(attackers.length < 1) {
     var newName = Game.spawns[SpawnName].createCreep([ATTACK,MOVE], 'defender_attack3', {role: 'defender', raidFlag: 'E93N72', homeRoom: 'E92N72'}) 
        console.log('Spawning new defender_attack3: ' + newName);
    }*/
    /**
    if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker' && creep.memory.state == 'healer').length < 3) {
     /*Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'AP1', homeRoom: 'E91N73'})  */        
       /** var newName = Game.spawns['Home2'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', state: 'healer', raidFlag: 'AP1', homeRoom: 'E91N73'}) 
     console.log('Spawning new healer: ' + newName);
    }**/
    
     /*if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker').length < 1) {
       var newName = Game.spawns['Home2'].createCreep([TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'E93N72', homeRoom: 'E91N73'}) 
     console.log('Spawning new run attacker: ' + newName);
     }*/
        
    
UtilitySpawn.RenewSurrounding(SpawnName);
} /*end catch*/
       catch(err){console.log('error in r2 spawn' + err);}
}/**end Room E92N74 **/

function SpawnHome3(SpawnName){
    try{
        /*r3*/
const RoomName = 'E91N72';
/*const SpawnName = 'Home3';*/
const AvailEnergy = Game.spawns[SpawnName].room.energyAvailable;
const CapEnergy =  Game.spawns[SpawnName].room.energyCapacityAvailable;
const MaxRaiders = 3;

const BoxesToWatch = [];

/*SpawnFighter(spawnerName, FighterType, targetFlag, HomeRoom)*/

    const roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === RoomName && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));

    const roomHarvs = _.filter(roomCreeps, (creep) => creep.memory.role === 'harvester');
    
    
        
        /*var roomharv = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'harvester' && (creep.ticksToLive > 25 || creep.ticksToLive == undefined));*/
    if(roomHarvs.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '598a2b507485e54974552644');
        return;
    }
    
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer').length < 1){
     console.log(Game.spawns[SpawnName].createCreep([MOVE,CLAIM,MOVE], 'Claimer', {role: 'claimer', job: 'reserve'}));
     return;
    }*/
    
   

    
    /*if(_.filter(roomCreeps, (creep) => creep.name == 'ToHomeTrans').length < 1){
        const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,
                    MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
     UtilitySpawn.SpawnCreep(SpawnName, parts , 'ToHomeTrans', {role: 'transport', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644', dropSiteId: '5967b3d74255e84adb21d33b'});
    return;
        
    } 
    if(_.filter(roomCreeps, (creep) => creep.name == 'ToHomeTrans2').length < 1){
        const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,
                    MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
     UtilitySpawn.SpawnCreep(SpawnName, parts , 'ToHomeTrans2', {role: 'transport', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644', dropSiteId: '5967b3d74255e84adb21d33b'});
    return;
        
    } 
    if(_.filter(roomCreeps, (creep) => creep.name == 'ToHomeTrans3').length < 1){
        const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,
                    MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
     UtilitySpawn.SpawnCreep(SpawnName, parts , 'ToHomeTrans3', {role: 'transport', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644', dropSiteId: '5967b3d74255e84adb21d33b'});
    return;
        
    } */
    
        /*if(_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedattacker').length < 1)
    {
        UtilitySpawn.SpawnFighter(SpawnName, 'PatrollerR', 'defend', RoomName);
		return;
    }*/
    
    /**console.log(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E91N72', 'E91N71']));**/
     if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E91N72', 'E91N71', 'E92N71'], true)){return;}
          
    
     var roomUpg = _.filter(roomCreeps, (creep) => creep.memory.role == 'upgrader');
    if(roomUpg.length < 1) {
        /*UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, '598dc95cd1539562cc39af14');*/
        var newName = Game.spawns[SpawnName].createCreep([WORK,CARRY,MOVE], 'Upgrader1-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: RoomName, targetBoxId: '598dc95cd1539562cc39af14'});
        return;
    }
    
    var roomBld = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
    
    /*SpawnCreep(spawnerName, Parts, creepName, options) {*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-598a2b507485e549745526442').length < 1)
    {UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-598a2b507485e549745526442', {role: 'tanker', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644'});
       return; 
    }
    
                var dedSources = [
        {sourceId:'58dbc55a8283ff5308a4053f' , homeRoom: 'E91N72', workRoom: 'E91N72', dropSiteId: '598a2b507485e54974552644' , returnSiteId: '', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
        /*R3_down_right */
        {sourceId:'58dbc57f8283ff5308a407d4' , homeRoom: 'E91N72', workRoom: 'E92N71', dropSiteId: '598daf2768793357bcbc85a7' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
        {sourceId:'58dbc57f8283ff5308a407d5' , homeRoom: 'E91N72', workRoom: 'E92N71', dropSiteId: '598daf2768793357bcbc85a7' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
    /*R3_s*/
    {sourceId:'58dbc55b8283ff5308a40541' , homeRoom: 'E91N72', workRoom: 'E91N71', dropSiteId: '5996ec80942a3d4bbdd3fe88' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
    {sourceId:'58dbc55b8283ff5308a40542' , homeRoom: 'E91N72', workRoom: 'E91N71', dropSiteId: '5999106f2fdb4d412688fdc9' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
    
    /*{sourceId:'5873beb211e3e4361b4db525' , homeRoom: 'E91N72', workRoom: 'E89N71', dropSiteId: '598ff85c7e6e3873fa3355b4' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]},
     {sourceId:'5873beb211e3e4361b4db523' , homeRoom: 'E91N72', workRoom: 'E89N72', dropSiteId: '598ff20b532d77295b3996b0' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]}/*,
    {sourceId:'58dbc57e8283ff5308a407d2' , homeRoom: 'E91N72', workRoom: 'E92N72', dropSiteId: '598b1729a46fb048da2c884f' , returnSiteId: '598a2b507485e54974552644', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]}*/
    
    
    ];
    
    dedSources.forEach(function(DS)
    {
        if(_.filter(Game.creeps, (creep) => creep.memory.sourceId == DS.sourceId && (creep.ticksToLive > 49 || creep.ticksToLive == undefined)).length < 1){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + Math.floor(Math.random()*10000)+1, {role: 'dedharvester', sourceId: DS.sourceId, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else if( !(DS.returnSiteId == '') && _.filter(Game.creeps, (creep) => creep.memory.targetBoxId == DS.dropSiteId && (creep.ticksToLive > 49 || creep.ticksToLive == undefined)).length < 1){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + Math.floor(Math.random()*10000)+1, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }
     
    }); /*dedSources*/
    
    /*room disperse*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-598a2b507485e54974552644').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-598a2b507485e54974552644', {role: 'tanker', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644'});
       return; 
    }
    /*For upgraders*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'trans-H3_Upgraders-598daadb05abdb64b517ecb3').length < 1)
    {UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE] , 'trans-H3_Upgraders-598daadb05abdb64b517ecb3', {role: 'transport', homeRoom: RoomName, targetBoxId: '598a2b507485e54974552644', dropSiteId: '598daadb05abdb64b517ecb3'});
    return;
    }
    
    if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-598dc95cd1539562cc39af14').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-598dc95cd1539562cc39af14', {role: 'tanker', homeRoom: 'E91N72', targetBoxId: '598dc95cd1539562cc39af14'});
       return; 
    }
    
    /*try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker r3: ' + error); }*/
    
    /*SpawnFighter(spawnerName, FighterType, targetFlag, HomeRoom)*/
    /*if(_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedattacker').length < 1)
    {
        UtilitySpawn.SpawnFighter(SpawnName, 'PatrollerR', 'defend', RoomName);
		return;
    }*/
    
    if(roomHarvs.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '598a2b507485e54974552644');
        return;
    }
     /*if(roomUpg.length < 1) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, '598dc95cd1539562cc39af14');
        return;
    }*/
    
    /*var storage = Game.getObjectById('5986d2dc8189fd14e76a5a48');
    if(storage.store.energy == storage.storeCapacity)
    {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName);
    }*/
    
    if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E91N71', 'E92N71'])){return;}
    
    const AllRaiders = _.filter(Game.creeps, (creep) => creep.memory.role == 'raider' && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));

    if(AvailEnergy >= CapEnergy * .80){
            var raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid5');
                /*if(raiders.length < 1) {
                UtilitySpawn.SpawnCreep('Home3', [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid5_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid5', homeRoom: RoomName})
                    return;
                }*/
                raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid6');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep('Home3', [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid6_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid6', homeRoom: RoomName})
                    return;
                }
                
                /*raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid7');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep('Home3', [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid7_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid7', homeRoom: RoomName})
                    return;
                }*/
                
                /*raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid8');
                if(raiders.length < MaxRaiders) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'Raider1-raid8_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid8', homeRoom: 'E91N72'})
                    return;
                }*/
                
                raiders = _.filter(AllRaiders, (creep) => creep.memory.raidFlag == 'raid9');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid9_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid9', homeRoom: 'E91N72'})
                    return;
                }
                
                /*raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid8');
                if(raiders.length < 1) {
                UtilitySpawn.SpawnCreep('Home3', [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid8_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid8', homeRoom: RoomName})
                    return;
                }
                
                raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid9');
                if(raiders.length < 1) {
                UtilitySpawn.SpawnCreep('Home3', [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid9_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid9', homeRoom: RoomName})
                    return;
                }*/
                
               /* var attackers = _.filter(Game.creeps, (creep) => creep.memory.name == 'defender_attack');
    if(attackers.length < 1) {
     var newName = Game.spawns[SpawnName].createCreep([ATTACK,ATTACK,MOVE,MOVE], 'defender_attack', {role: 'defender', raidFlag: 'raidpower', homeRoom: 'E92N72'}) 
        console.log('Spawning new defender_attacker: ' + newName);
    }*/
                
    }
    
    /**if(_.filter(Game.creeps, (creep) => creep.name == 'thief-5958aa351b30338c04941559').length < 1){
     Game.spawns['Home3'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief-5958aa351b30338c04941559', {role: 'thief', homeRoom: RoomName, targetBoxId: '5958aa351b30338c04941559', thiefRoom: 'E92N71'});
return;
        
    }
    if(_.filter(Game.creeps, (creep) => creep.name == 'thief_2-5958aa351b30338c04941559').length < 1){
     Game.spawns['Home3'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief_2-5958aa351b30338c04941559', {role: 'thief', homeRoom: RoomName, targetBoxId: '5958aa351b30338c04941559', thiefRoom: 'E92N71'});
return;
        
    }
     if(_.filter(Game.creeps, (creep) => creep.name == 'thief_3-5958aa351b30338c04941559').length < 1){
     Game.spawns['Home3'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief_3-5958aa351b30338c04941559', {role: 'thief', homeRoom: RoomName, targetBoxId: '5958aa351b30338c04941559', thiefRoom: 'E92N71'});
return;
        
    }**/
     /*if(_.filter(Game.creeps, (creep) => creep.name == 'thief_4-5958aa351b30338c04941559').length < 1){
     Game.spawns['Home3'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'thief_4-5958aa351b30338c04941559', {role: 'thief', homeRoom: RoomName, targetBoxId: '5958aa351b30338c04941559', thiefRoom: 'E92N71'});
return;
        
    }*/
    
     try{
     if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName) )){return;}
    }catch(error){console.log('error in spawn 3 watch boxes' + error);}
    
    /*if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, [
        '5988ecd0f524a3683d9d323f', '5989c7d8ec2d062d878986e7', 
       /* R3_S  '5999106f2fdb4d412688fdc9', '5996ec80942a3d4bbdd3fe88',
    /*R3_SE '598daf2768793357bcbc85a7', 
    /*'598b1729a46fb048da2c884f', */
    /*'598ff85c7e6e3873fa3355b4', /*'598ff20b532d77295b3996b0', '59953d5645961a7d07216606'])){return;}*/
    
    /*Mining */
    if( Game.getObjectById('58dbc92134e898064bcc2f5c').mineralAmount > 0 && _.filter(Game.creeps, (creep) => creep.name == 'miner-58dbc92134e898064bcc2f5c').length < 1){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-58dbc92134e898064bcc2f5c', {role: 'miner', workRoom: RoomName, targetSiteId: '58dbc92134e898064bcc2f5c', dropSiteId: '59d9a17631ff547c7a38533d', state: 'Mining'});
    return;
    }
    
    if(_.filter(Game.creeps, (creep) => creep.name == 'Igore-E91N72').length < 1 && _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName).length > 0){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-E91N72', {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
        return;
    }
    
    if(AvailEnergy == CapEnergy)
    {
        const roomBld = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == 'E89N68' && creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: 'E89N68', type: 'Cons', role: 'builder'});
        return;
    }
    }
    
        if(Game.getObjectById(utils.GetMainStorageId(RoomName)).store.energy > 40000){
    const roomBld2 = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld2.length < 1 ) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        /*UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        return;*/
    }}
    
    /*if(AvailEnergy == CapEnergy && _.filter(Game.creeps, (creep) => creep.memory.role == 'flagattacker').length < 1) {
      var newName = Game.spawns['Home3'].createCreep([TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'FlagAttacker-' + Math.floor(Math.random()*10000)+1, {role: 'flagattacker', raidFlag: 'E93N72', homeRoom: 'E91N73'}) 
     console.log('Spawning new run attacker: ' + newName);
     }*/
     
      /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-CONS').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-CONS' , {type: 'Cons', role: 'claimer', realRole: 'builder'});
        return;
    }
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-CONS2').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-CONS2' , {role: 'claimer', realRole: 'builder'});
        return;
    }*/
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-UP').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-UP' , {role: 'claimer', realRole: 'upgrader'});
        return;
    }*//*
    if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-HARV').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-HARV' , {role: 'claimer', realRole: 'harvester'});
        return;
    }*/
    
    
    
        UtilitySpawn.RenewSurrounding(SpawnName);
    } catch(err){console.log('error in spawn 3 ' + err);}
}/**end Room E91N72 **/

function SpawnHome4(SpawnName){
    try{
        /*r4*/
const RoomName = 'E89N68';
/*const SpawnName = 'Home4';*/
const AvailEnergy = Game.spawns[SpawnName].room.energyAvailable;
const CapEnergy =  Game.spawns[SpawnName].room.energyCapacityAvailable;
const MaxRaiders = 4;

const BoxesToWatch = [];

const mainStorageId = '';

/*SpawnFighter(spawnerName, FighterType, targetFlag, HomeRoom)*/
 const roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === RoomName && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));

    
        const storeEnergy = Game.getObjectById(utils.GetMainStorageId(RoomName)).store.energy;
        
        if(storeEnergy < 5000 && _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'harvester' && (creep.ticksToLive > 25 || creep.ticksToLive == undefined )).length < 1 )
        {
           UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '599fc222065bbc7edb30efc3');
        return; 
        }
        /**var roomharv = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'harvester' && creep.ticksToLive > 25);
    if(roomharv.length < 1 && (_.filter(Game.creeps, (creep) => creep.name == 'tanker-599fc222065bbc7edb30efc3').length < 1) && storeEnergy > 5000 ) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '599fc222065bbc7edb30efc3');
        return;
    }**/
    
        /*if(_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedattacker').length < 1)
    {
        UtilitySpawn.SpawnFighter(SpawnName, 'PatrollerR', 'defend', RoomName);
		return;
    }*/
    
    /**console.log(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E91N72', 'E91N71']));**/
     /*if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E89N68'])){return;}*/
          
          if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E89N69', 'E88N68', 'E88N69', 'E89N68', 'E88N67'], true)){return;}
     
     /*room disperse*/
    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'tanker' && creep.memory.homeRoom == 'E89N68'  && (creep.ticksToLive > 25 || creep.ticksToLive == undefined )).length < 2){
    if(AvailEnergy > 850)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-' + Math.floor(Math.random()*10000)+1, {role: 'tanker', homeRoom: 'E89N68', targetBoxId: '599fc222065bbc7edb30efc3'});
       return; 
    }
    Game.spawns[SpawnName].createCreep([CARRY,CARRY,MOVE], 'tanker-'+ Math.floor(Math.random()*10000)+1, {role: 'tanker', homeRoom: 'E89N68', targetBoxId: '599fc222065bbc7edb30efc3'});
       return; 
    }
    
    
     var roomUpg = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'upgrader' && (creep.ticksToLive > 25 || creep.ticksToLive == undefined ));
    if(roomUpg.length < 1) {
        var newName = Game.spawns[SpawnName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader5_15U-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: RoomName, targetBoxId:'59ad0ba7f47de347415889c1', boostLabId: '59ca7498ca564d16ed1e2b93', state: 'boosting'});
        
        /*UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, '59ad0ba7f47de347415889c1');*/
        
        return;
    }
    
    var roomBld = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == RoomName && creep.memory.role == 'builder' && (creep.ticksToLive > 25 || creep.ticksToLive == undefined ));
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
    /*
    if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-598a2b507485e549745526442').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-598a2b507485e549745526442', {role: 'tanker', homeRoom: 'E91N72', targetBoxId: '598a2b507485e54974552644'});
       return; 
    }*/
    
     
var dedSources = [
        {sourceId:'5873beb211e3e4361b4db52d' , homeRoom: RoomName, workRoom: 'E89N68', dropSiteId: '599fc222065bbc7edb30efc3' , returnSiteId: '', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
        {sourceId:'5873beb211e3e4361b4db52f' , homeRoom: RoomName, workRoom: 'E89N68', dropSiteId: '59a6d9ea84f4ce0556f8dfe4' , returnSiteId: '', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
        {sourceId:'5873be9b11e3e4361b4db2eb' , homeRoom: RoomName, workRoom: 'E88N69', dropSiteId: '59ac9d9745e2de600ee05c87' , returnSiteId: '599fc222065bbc7edb30efc3', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]}
    ];
    
    dedSources.forEach(function(DS)
    {
        if(_.filter(Game.creeps, (creep) => creep.memory.sourceId == DS.sourceId && (creep.ticksToLive > 49 || creep.ticksToLive == undefined )).length < 1){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + Math.floor(Math.random()*10000)+1, {role: 'dedharvester', homeRoom: DS.homeRoom, sourceId: DS.sourceId, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else if( !(DS.returnSiteId == '') && _.filter(Game.creeps, (creep) => creep.memory.targetBoxId == DS.dropSiteId && (creep.ticksToLive > 49 || creep.ticksToLive == undefined )).length < 1){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + Math.floor(Math.random()*10000)+1, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }
     
    }); /*dedSources*/
    
     try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker: ' + error); }
    
    /*room disperse*/
   /* if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-599fc222065bbc7edb30efc3').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-599fc222065bbc7edb30efc3', {role: 'tanker', homeRoom: 'E89N68', targetBoxId: '599fc222065bbc7edb30efc3'});
       return; 
    }*/
    
    /*For upgraders*//*
    if(_.filter(Game.creeps, (creep) => creep.name == 'trans-H3_Upgraders-598daadb05abdb64b517ecb3').length < 1)
    {UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,MOVE] , 'trans-H3_Upgraders-598daadb05abdb64b517ecb3', {role: 'transport', homeRoom: RoomName, targetBoxId: '598a2b507485e54974552644', dropSiteId: '598daadb05abdb64b517ecb3'});
    return;
    }*/
    
    
    
    
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-598dc95cd1539562cc39af14').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-598dc95cd1539562cc39af14', {role: 'tanker', homeRoom: 'E91N72', targetBoxId: '598dc95cd1539562cc39af14'});
       return; 
    }*/
    
    /*SpawnFighter(spawnerName, FighterType, targetFlag, HomeRoom)*/
    /*if(_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedattacker').length < 1)
    {
        UtilitySpawn.SpawnFighter(SpawnName, 'PatrollerR', 'defend', RoomName);
		return;
    }*/
    
    /*if(roomharv.length < 1) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, '599fc222065bbc7edb30efc3');
        return;
    }*/
    
    const roomBld4 = _.filter(Game.creeps, (creep) => creep.memory.homeRoom == 'E89N68' && creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld4.length < 1) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: 'E89N68', type: 'Cons', role: 'builder'});
        return;
    }
    
     /*if(roomUpg.length < 3) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, '59ad0ba7f47de347415889c1');
        return;
    }*/
    try{
     if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName) )){return;}
    }catch(error){console.log('error in spawn 4 watch boxes' + err);}
    
    /*For upgraders*/
    if(_.filter(Game.creeps, (creep) => creep.name == 'trans-H4_Upgraders').length < 1)
    {UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE] , 'trans-H4_Upgraders', {role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59a4f7c017f58d52dd1a9df5'});
    return;
    }
    
    /*room disperse*/
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'tanker-599fc222065bbc7edb30efc32').length < 1)
    {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'tanker-599fc222065bbc7edb30efc32', {role: 'tanker', homeRoom: 'E89N68', targetBoxId: '599fc222065bbc7edb30efc3'});
       return; 
    }*/
    
    /*home room transfer transport*//*
    if(_.filter(Game.creeps, (creep) => creep.name == 'transport-59a6d9ea84f4ce0556f8dfe4').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE], 'transport-59a6d9ea84f4ce0556f8dfe4', {role: 'transport', homeRoom: 'E89N68', targetBoxId: '59a6d9ea84f4ce0556f8dfe4'}); return;}
    */
    
    /*Mining */
    if((Game.getObjectById('5873c17b63ad7a7555b7bd77').mineralAmount > 0) &&_.filter(Game.creeps, (creep) => creep.name == 'miner-5873c17b63ad7a7555b7bd77').length < 1 ){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-5873c17b63ad7a7555b7bd77', {role: 'miner', workRoom: 'E89N68', targetSiteId: '5873c17b63ad7a7555b7bd77', dropSiteId: '59b5b8dca112247a3dafdfc7', state: 'Mining'});
    return;
    }
    
    if(_.filter(roomCreeps, (creep) => creep.name == 'Igore-E89N68').length < 1 && _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName).length > 0){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-E89N68', {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
            
        return;
    }
    
    /*var storage = Game.getObjectById('5986d2dc8189fd14e76a5a48');
    if(storage.store.energy == storage.storeCapacity)
    {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName);
    }*/
    
    /*if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E91N71', 'E92N71'])){return;}*/
    
    
    if(AvailEnergy >= CapEnergy * .80){
            var raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid5');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],'Raider1-raid5_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid5', homeRoom: RoomName})
                    return;
                }/*
                
                raiders = _.filter(Game.creeps, (creep) => creep.memory.raidFlag == 'raid6');
                if(raiders.length < 1) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,CARRY,CARRY,MOVE,MOVE],'Raider1-raid6_' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid6', homeRoom: RoomName})
                    return;
                }*/
                if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E89N69', 'E88N67'])){return;}
    
               
               /* var attackers = _.filter(Game.creeps, (creep) => creep.memory.name == 'defender_attack');
    if(attackers.length < 1) {
     var newName = Game.spawns[SpawnName].createCreep([ATTACK,ATTACK,MOVE,MOVE], 'defender_attack', {role: 'defender', raidFlag: 'raidpower', homeRoom: 'E92N72'}) 
        console.log('Spawning new defender_attacker: ' + newName);
    }*/
    /*if(false){*//*
     if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR1'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR1' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
        if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR2'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR2' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
        if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR3'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR3' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
        /*if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR4'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR4' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
         if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR5'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR5' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
                 if(!(_.some(Game.creeps, (creep) => creep.name == 'Transport-LR6'))){
         const parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                UtilitySpawn.SpawnCreep(SpawnName, parts,'Transport-LR6' ,{role: 'transport', homeRoom: RoomName, targetBoxId: '599fc222065bbc7edb30efc3', dropSiteId: '59d344f2187cac3aa41f3383', path: Memory.Paths.RoomSupport.E89N68toE88N65.path, pathTo: Memory.Paths.RoomSupport.E89N68toE88N65.pathTo, pathFrom: Memory.Paths.RoomSupport.E89N68toE88N65.pathFrom, flag1Name: 'trans1', flag2Name: 'trans2', state: 'PickUp'})
                    return;
                }
        /*for(var count = 0; 0)*/
                
    }

   
  
    
        UtilitySpawn.RenewSurrounding(SpawnName);
    } catch(err){console.log('error in spawn 4' + err);}
}/**end Room E89N68 **/

/* r5 */
function SpawnHome5(SpawnName){
    
const logging = false;
const MaxBuilders = 1;
const OHarvesters = 2;
const MaxRaiders = 3;
    try{
/**Room E94N67**/

    const RoomName = 'E94N67';
    const MainStorage = utils.GetMainStorageId(RoomName);
     
    const roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === RoomName && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));
        const roomHarvs = _.filter(roomCreeps, (creep) => creep.memory.role === 'harvester');
    
     var AvailEnergy = Game.spawns[SpawnName].room.energyAvailable;
     var CapEnergy =  Game.spawns[SpawnName].room.energyCapacityAvailable;
     
     /*const roomCreepsRoles = _.groupBy(roomCreeps, 'memory.role');
     console.log(roomCreepsRoles['harvester'].length);*/
     
     /*const creepCount = _.countBy(roomCreeps, 'memory.role');*/
    
     /*Urgent spawn*/ /**
     var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    if(defenders.length < 1) {
    console.log("Trying to spawn defender: " + Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: 'raid1', homeRoom: 'E91N73'}));
    
    return;
    }**/
    
    /*try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker: ' + error); }*/
    
   /* const storeEnergy = Game.getObjectById(MainStorage).store.energy;
        
        if(storeEnergy < 5000 && _.filter(roomCreeps, (creep) => creep.memory.role === 'tanker').length < 1 && roomHarvs.length < 1 &&  )
        {
           UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, MainStorage);
        return; 
        }*/
    
    if(roomHarvs.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, MainStorage);
        return;
    }
    
   /* if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, ['E94N67', 'E94N68', 'E93N68', 'E93N67'], true)){return;}*/
    if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, UtilityRoom.GetRoomNetwork(RoomName), true)){return;}
    
const roomUpgds = _.filter(roomCreeps, (creep) => creep.memory.role === 'upgrader');
    if(roomUpgds.length < 1) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, '59c40eebf74c21032f138287');
        return;
    }
    
    var roomBld = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
    
    var dedSources = [
        {sourceId:'58dbc5b88283ff5308a40d3c' , homeRoom: RoomName, workRoom: RoomName, dropSiteId: '59b13dcb45d2b66e5549c2f7' , returnSiteId: '59b32d2ebefddd4b380b3cc1', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]}
    ];
    
    dedSources.forEach(function(DS)
    {
        if(_.filter(roomCreeps, (creep) => creep.name == 'dedHarvester-' + DS.sourceId).length < 1){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + DS.sourceId, {role: 'dedharvester', sourceId: DS.sourceId, homeRoom: DS.homeRoom, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else{if( !(DS.returnSiteId == '') && _.filter(roomCreeps, (creep) => creep.name == 'transport-' + DS.dropSiteId).length < 1){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + DS.dropSiteId, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }}
     
    }); /*dedSources*/
    
    /*if(roomHarvs.length < (OHarvesters + 1)) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName ,MainStorage);
        return;
    }*/
    
    if(_.filter(roomCreeps, (creep) => creep.name == 'tanker-59b32d2ebefddd4b380b3cc1').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-59b32d2ebefddd4b380b3cc1', {role: 'tanker', homeRoom: RoomName, targetBoxId: '59b32d2ebefddd4b380b3cc1'}); return;}
    
    if(_.filter(roomCreeps, (creep) => creep.name == 'tanker-59b32d2ebefddd4b380b3cc12').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-59b32d2ebefddd4b380b3cc12', {role: 'tanker', homeRoom: RoomName, targetBoxId: '59b32d2ebefddd4b380b3cc1'}); return;}
    
    
    try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker: ' + error); }

    
    if(AvailEnergy >= CapEnergy * .80){
            var raiders = _.filter(roomCreeps, (creep) => creep.memory.raidFlag == 'raid50');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider1-raid50' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid50', homeRoom: RoomName})
                    return;
                }
                
                raiders = _.filter(roomCreeps, (creep) => creep.memory.raidFlag == 'raid51');
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider1-raid51' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid51', homeRoom: RoomName})
                    return;
                }

                /*if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E89N69', 'E88N67'])){return;}*/
    
                
    }
    
    
    
     try{
     if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName) )){return;}
    }catch(error){console.log('error spawn 5 watch boxes' + error);}
    
    if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E94N68', 'E93N68', 'E93N67'])){return;}
    
    /*Mining */
    if((Game.getObjectById('58dbc92534e898064bcc3173').mineralAmount > 0) &&_.filter(roomCreeps, (creep) => creep.name == 'miner-58dbc92534e898064bcc3173').length < 1 ){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-58dbc92534e898064bcc3173', {role: 'miner', homeRoom: RoomName, workRoom: RoomName, targetSiteId: '58dbc92534e898064bcc3173', dropSiteId: '59bdf41ed34bc66ee5776192', state: 'Mining'});
    return;
    }
    
    const roomBld5 = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld5.length < 1) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        return;
    }
    
     if(_.filter(roomCreeps, (creep) => creep.name == 'Igore-E94N67').length < 1 && _.filter(Memory.Labs.JobBoard, (job) => job.homeRoom ==  RoomName).length > 0){
        UtilitySpawn.SpawnCreep(SpawnName, [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE] , 'Igore-E94N67', {role: 'igore', homeRoom: RoomName, state: 'NoJob' });
            
        return;
    }
    
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-CONS_5').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-CONS_5' , {type: 'Cons', role: 'claimer', realRole: 'builder'});
        return;
    }
    if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-CONS2_5').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-CONS2_5' , {role: 'claimer', realRole: 'builder'});
        return;
    }*/
    /*if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-UP_5').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-UP_5' , {role: 'claimer', realRole: 'upgrader'});
        return;
    }
    if(_.filter(Game.creeps, (creep) => creep.name == 'Claimer-HARV_5').length < 1){
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Claimer-HARV_5' , {role: 'claimer', realRole: 'harvester'});
        return;
    }*/
    
    
    } catch(err){console.log('error in spawn 5: '+ err);}
}/**end Room E94N67 **/

/* r6 */
function SpawnHome6(SpawnName){
    
const logging = false;
const MaxBuilders = 1;
const OHarvesters = 2;
const MaxRaiders = 3;
    try{
/**Room E94N67**/

    const RoomName = 'E96N67';
    const MainStorage = utils.GetMainStorageId(RoomName);
     
    const roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.homeRoom === RoomName && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));
        const roomHarvs = _.filter(roomCreeps, (creep) => creep.memory.role === 'harvester');
    
     var AvailEnergy = Game.spawns[SpawnName].room.energyAvailable;
     var CapEnergy =  Game.spawns[SpawnName].room.energyCapacityAvailable;
     
     /*const roomCreepsRoles = _.groupBy(roomCreeps, 'memory.role');
     console.log(roomCreepsRoles['harvester'].length);*/
     
     /*const creepCount = _.countBy(roomCreeps, 'memory.role');*/
    
     /*Urgent spawn*/ /**
     var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    if(defenders.length < 1) {
    console.log("Trying to spawn defender: " + Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: 'raid1', homeRoom: 'E91N73'}));
    
    return;
    }**/
    
    if(roomHarvs.length < 2) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName, MainStorage);
        return;
    }
    
    if(UtilityRoom.WatchRooms(SpawnName, AvailEnergy, RoomName, UtilityRoom.GetRoomNetwork(RoomName), true)){return;}
    
const roomUpgds = _.filter(roomCreeps, (creep) => creep.memory.role === 'upgrader');
    if(roomUpgds.length < 2) {
        UtilitySpawn.SpawnUpgrader(SpawnName, AvailEnergy, RoomName, MainStorage);
        return;
    }
    
    var roomBld = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
    if(roomBld.length < 1) {
        UtilitySpawn.SpawnBuilder(SpawnName, AvailEnergy, RoomName);
        return;
    }
    
    /*var dedSources = [
        {sourceId:'58dbc5b88283ff5308a40d3c' , homeRoom: RoomName, workRoom: RoomName, dropSiteId: '59b13dcb45d2b66e5549c2f7' , returnSiteId: '59b32d2ebefddd4b380b3cc1', hParts: [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], tParts: [WORK,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE]}
    ];
    
    dedSources.forEach(function(DS)
    {
        if(_.filter(roomCreeps, (creep) => creep.name == 'dedHarvester-' + DS.sourceId).length < 1){
            UtilitySpawn.SpawnCreep(SpawnName, DS.hParts ,'dedHarvester-' + DS.sourceId, {role: 'dedharvester', sourceId: DS.sourceId, homeRoom: DS.homeRoom, workRoom: DS.workRoom, harvesting: true, dropSiteId: DS.dropSiteId });
            return;
         }else{if( !(DS.returnSiteId == '') && _.filter(roomCreeps, (creep) => creep.name == 'transport-' + DS.dropSiteId).length < 1){
             UtilitySpawn.SpawnCreep(SpawnName, DS.tParts , 'transport-' + DS.dropSiteId, {role: 'transport', homeRoom: DS.homeRoom, targetBoxId: DS.dropSiteId, dropSiteId: DS.returnSiteId});
             return;
     }}
     
    }); /*dedSources*/
    
    /*if(roomHarvs.length < (OHarvesters + 1)) {
        UtilitySpawn.SpawnHarvester(SpawnName, AvailEnergy, RoomName ,MainStorage);
        return;
    }*/
    
    /*if(_.filter(roomCreeps, (creep) => creep.name == 'tanker-59b32d2ebefddd4b380b3cc1').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-59b32d2ebefddd4b380b3cc1', {role: 'tanker', homeRoom: RoomName, targetBoxId: '59b32d2ebefddd4b380b3cc1'}); return;}
    
    if(_.filter(roomCreeps, (creep) => creep.name == 'tanker-59b32d2ebefddd4b380b3cc12').length < 1)
        {Game.spawns[SpawnName].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'tanker-59b32d2ebefddd4b380b3cc12', {role: 'tanker', homeRoom: RoomName, targetBoxId: '59b32d2ebefddd4b380b3cc1'}); return;}
    */
    
   /* try{
         if(Thinker.Harvesting(RoomName, SpawnName)){return;}
    }catch(error){console.log('error thinker: ' + error); }*/

    
    if(AvailEnergy >= CapEnergy * .80){
            var raiders = _.filter(roomCreeps, (creep) => creep.memory.raidFlag == 'raid60');
            const rParts = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                if(raiders.length < 2) {
                UtilitySpawn.SpawnCreep(SpawnName, rParts,'Raider1-raid60' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid60', homeRoom: RoomName})
                    return;
                }
                /*
                raiders = _.filter(roomCreeps, (creep) => creep.memory.raidFlag == 'raid61');
                if(raiders.length < 4) {
                UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'Raider1-raid61' + Math.floor(Math.random()*10000)+1,{role: 'raider', raidFlag: 'raid61', homeRoom: RoomName})
                    return;
                }

                /*if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E89N69', 'E88N67'])){return;}*/
    
                
    }
    
    
    
     /*try{
     if(UtilityRoom.WatchBoxes(SpawnName, AvailEnergy, RoomName, utils.GetWatchBoxes(RoomName) )){return;}
    }catch(error){console.log('error spawn 6 watch boxes' + error);}*/
    
    /*if(UtilityRoom.RoomsToReserv(SpawnName, AvailEnergy, RoomName, ['E94N68', 'E93N68', 'E93N67'])){return;}*/
    
    /*Mining *//*
    if((Game.getObjectById('58dbc92534e898064bcc3173').mineralAmount > 0) &&_.filter(roomCreeps, (creep) => creep.name == 'miner-58dbc92534e898064bcc3173').length < 1 ){
    UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'miner-58dbc92534e898064bcc3173', {role: 'miner', homeRoom: RoomName, workRoom: RoomName, targetSiteId: '58dbc92534e898064bcc3173', dropSiteId: '59bdf41ed34bc66ee5776192', state: 'Mining'});
    return;
    }*/
    /*
    const roomBld5 = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder' && creep.memory.type == 'Cons');
    if(roomBld5.length < 1) {
        UtilitySpawn.SpawnCreep(SpawnName, [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Constructinator' + Math.floor(Math.random()*10000)+1 , {homeRoom: RoomName, type: 'Cons', role: 'builder'});
        return;
    }*/
    
    } catch(err){console.log('error in spawn 6: '+ err);}
}/**end Room r6 **/

return {
        SpawnCaseyHome: SpawnCaseyHome, 
        SpawnHome2: SpawnHome2,
        SpawnHome3: SpawnHome3,
        SpawnHome4: SpawnHome4,
        SpawnHome5: SpawnHome5,
        SpawnHome6: SpawnHome6,
        BasicSpawning: BasicSpawning
    };
}());

module.exports = {Spawning};

