var Protos = require('Protos').Protos;

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var Spawning = require('Spawning').Spawning;
var Utility = require('Utility');
var roleClaimer = require('role.claimer');
var roleRaider = require('role.raider');
var roleDedHarvester = require('role.dedharvester');
var roleTransport = require('role.transport');
var roleTanker = require('role.tanker');
var roleThief = require('role.thief');
var roleFlagAttacker = require('role.flagattacker');
var roleDefender = require('role.defender');
var roleMiner = require('role.miner');
var roleRangedAttacker = require('role.rangedattacker');

var roleIgore = require('role.igor');

var roleUtility = require('role.utility');
var utils = require('testutil').utils;
var UtilitySpawn = require('utility.spawn').utilitySpawn;
var UtilityRoom = require('utility.room').utilityRoom;
var Thinker = require('Thinker').Thinker;

var roleDynTrans = require('role.dyntransport');
var Traveler = require('Traveler');
var Movecc = require('Movecc').Movecc;


module.exports.loop = function () {
    /*console.log('CPU start:' + Game.cpu.getUsed());*/
    const CPUSTART = Game.cpu.getUsed();
    try{
        if(Game.cpu.bucket < 150){console.log('Skipping tick, low CPU'); Game.notify('low bucket', 60); console.log('CPU Bucket: ' + Game.cpu.bucket); return;}
        
        try{ Protos.run(); }catch(err){console.log("*** Error in prototypes: " + err);}
         
        const RenewCount = Game.cpu.getUsed();
        UtilitySpawn.RenewSurrounding('CH1-3');
        /*console.log('Renew cost: ' + (Game.cpu.getUsed() - RenewCount));*/
        UtilitySpawn.RenewSurrounding('CH2-2');
        
        while(Memory.logs.CPU.length > 200){
            Memory.logs.CPU.shift();
        }
        
        /*Memory.temp5 = Movecc.CalcPath(Game.flags['test'].pos, Game.flags['test2'].pos);*/
        
       /*try{
       if(Game.time % 50 == 0){Memory.Globals.Spy = 2;}
if(Memory.Globals.Spy > 0){
	switch(Memory.Globals.Spy){
		case 2: 
		Game.getObjectById('59c3e74705aa94533a4c3efe').observeRoom('E91N76');
		break;
		case 1:
		if(!(Game.getObjectById('599df793c1e12d03a7ecc4f7').store[RESOURCE_UTRIUM] > 25000)){
			console.log(Game.getObjectById('599df793c1e12d03a7ecc4f7').store[RESOURCE_UTRIUM]);
		}else{console.log(Game.getObjectById('599df793c1e12d03a7ecc4f7').store[RESOURCE_UTRIUM]);}
		break;
		
	}
	Memory.Globals.Spy--;
}
}}catch(err)(console.log('***Error in U to CC code: ' + err);)*/
        /*console.log('before defines:' + Game.cpu.getUsed());*/
        
        
    }catch(error){console.log(error);};

try{
       /*console.log('CPU Before CPUUSAGE CLEAR:' + Game.cpu.getUsed());*/
    if( Memory.logs['CPUUSAGE']['transporter'].length > 100){Memory.logs['CPUUSAGE']['transporter'] = [];}
    
    /*console.log('CPU Bucket: ' + Game.cpu.bucket);*/
  /* console.log('CPU Before Tower:' + Game.cpu.getUsed());*/
  
  const towerRooms = ['E91N73', 'E92N74', 'E91N72', 'E89N68', 'E94N67', 'E88N65'];
    towerRooms.forEach(function(towerRoom){
        Game.rooms[towerRoom].RunTowers();
    });
        
        /*UtilityRoom.WatchRooms('Home3', '0', 'E91N72', ['E91N72', 'E91N71', 'E92N71'], false);*/
        /*console.log('CPU After tower:' + Game.cpu.getUsed());*/
}catch(error){console.log("Issue with towers: " + error);}

try{
    Game.getObjectById("596afb3c0adae05bb9405b6a").transferEnergy(Game.getObjectById("596b106b56c8ae575ff170c5"));
    Game.getObjectById("5978b34242fa9c389425a70b").transferEnergy(Game.getObjectById("596b106b56c8ae575ff170c5"));
    Game.getObjectById("597f585ff22e58143eed2e0a").transferEnergy(Game.getObjectById("597f4a5677c0020a14bb5ab4"));
/*r3*/
    Game.getObjectById("598daadb05abdb64b517ecb3").transferEnergy(Game.getObjectById("59a05d86b8b80a5249e2fac0"));
    Game.getObjectById("59a05d86b8b80a5249e2fac0").transferEnergy(Game.getObjectById("598dc95cd1539562cc39af14"));
/*r4*/
Game.getObjectById('59a6d9ea84f4ce0556f8dfe4').transferEnergy(Game.getObjectById('59e7db43c9d240055913e871')); /*S source to mid room */
if(Game.getObjectById('59ad0ba7f47de347415889c1').energy < 650){Game.getObjectById('59e7db43c9d240055913e871').transferEnergy(Game.getObjectById('59ad0ba7f47de347415889c1'))
}else{Game.getObjectById('59e7db43c9d240055913e871').transferEnergy(Game.getObjectById('59a4f7c017f58d52dd1a9df5'))}

Game.getObjectById('59a4f7c017f58d52dd1a9df5').transferEnergy(Game.getObjectById('59c43ef348e9150dbfa1e114')); /* towards upgraders */
if(Game.getObjectById('59e7db43c9d240055913e871').energy < 650){ Game.getObjectById('59c43ef348e9150dbfa1e114').transferEnergy(Game.getObjectById('59ad0ba7f47de347415889c1'));}

/*r5? */ 
Game.getObjectById('59d7821c31d7995e67e6fccd').transferEnergy(Game.getObjectById('59d7dee6f2684b64f5eb59f7'));

 
 try{/* if(Game.time % 10 === 0){UtilityRoom.LabWork('');}*/
 const labtime = Game.cpu.getUsed();
     Thinker.LabWork('E91N73');
     Thinker.LabWork('E91N72');
     Thinker.LabWork('E89N68');
     Thinker.LabWork('E94N67');
     Thinker.LabWork('E92N74');
     Thinker.LabWork('E88N65');
     console.log((Game.cpu.getUsed() - labtime) + ':used for labs');
 }catch(error){console.log('error with labwork ' + error);}
 
 /*console.log('CPU After transerenergy:' + Game.cpu.getUsed());*/
    if(Game.time % 10 === 0){
       /* const getType = RESOURCE_LEMERGIUM;
        const getMax = 25000;
        const term = Game.getObjectById('59c22944067aad1dfc64779d');
        if(!(term.store[getType] > getMax)){
            const Ltrades = _.filter(Game.market.getAllOrders(), (order) => order.resourceType == getType && order.type == 'sell' && order.price <= 0.08 && order.amount > 5);
            if(Ltrades.length > 0){
                var getAmount = 2500;
                if(Ltrades[0].amount < 2500){getAmount = Ltrades[0].amount;}
                console.log('Buying ' + getAmount + ' at price ' + Ltrades[0].price + ' for room ' + term.pos.roomName);
                Memory.logs.trades.push('Buying ' + getType + ' : ' + getAmount + ' at price ' + Ltrades[0].price + ' for room ' + term.pos.roomName);
            Game.market.deal(Ltrades[0].id, getAmount, term.pos.roomName);
            }
        }*/
    }
   
    
    if(Game.time % 50 === 0){Memory.Globals.tradeState = 5;}
    /*if(Game.getObjectById('59b5b8dca112247a3dafdfc7').store[RESOURCE_CATALYZED_GHODIUM_ACID] > 5000){Game.getObjectById('59b5b8dca112247a3dafdfc7').send(RESOURCE_CATALYZED_GHODIUM_ACID, 5000, 'E91N73');}*/
    /*if(Game.getObjectById('5998724cb9a0010632894e24').store[RESOURCE_GHODIUM] > 5000){Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_GHODIUM, 5000, 'E92N74');}*/
    
    /*console.log(Memory.Globals.tradeState);*/
    if(Memory.Globals.tradeState > 0){
        const ResType = RESOURCE_KEANIUM;
        const SaleRoom =  'E91N72';
        if(!(Game.rooms[SaleRoom].terminal.store[ResType] > 0)){Memory.Globals.tradeState = 200;}
     switch(Memory.Globals.tradeState){
        case 5:
            console.log("Beginning trade search");
            Memory.trades = _.filter(Game.market.getAllOrders(), (order) => order.resourceType == ResType && order.type == 'buy' && order.price >= 0.075 && order.amount > 5);
            console.log("Found Raw trades: " + Memory.trades.length);
            Memory.logs.trades.push('Raw Trades:' + Memory.trades.length );
            if(Memory.logs.trades.length > 100){Memory.logs.trades.shift();}
            if(Memory.trades.length === 0){Memory.Globals.tradeState = 0;}
             break;
        case 4:
            for(var deal in Memory.trades){
                Memory.trades[deal].cost = Game.market.calcTransactionCost(1000, SaleRoom, Memory.trades[deal].roomName);
            }
            break;
        case 3:
            Memory.trades = _.filter(Memory.trades, (order) => order.cost < 1000)
            console.log("We have remaining trades: " + Memory.trades.length);
            Memory.logs.trades.push("We have remaining trades: " + Memory.trades.length);
            if(Memory.logs.trades.length > 100){Memory.logs.trades.shift();}
            break;
        case 2:
            Memory.trades = _.sortBy(Memory.trades, deal => [deal.price, deal.cost, deal.amount])
            break;
        case 1:
            for(var deal in Memory.trades){
                var Num = Memory.trades[deal].amount;
                if(Game.rooms[SaleRoom].terminal.store[ResType] < Num){Num = Game.rooms[SaleRoom].terminal.store[ResType]}
                const result = Game.market.deal(Memory.trades[deal].id, Num, SaleRoom);
                console.log('Traded [' + result + '] # ' + Num + 'of mineral ' + ResType);
                if(!Num == OK){}
            }
            break;
     }
     Memory.Globals.tradeState--;
        
    }
    /*console.log('CPU After trade:' + Game.cpu.getUsed());*/
    
    /* 
    Memory.temp2 = _.filter(Game.market.getAllOrders(), (order) => order.resourceType == RESOURCE_HYDROXIDE && order.type == 'buy') 
    Game.market.calcTransactionCost(1000, 'E91N73','E37N74')
    
    for(var deal in Memory.temp2){
Memory.temp2[deal].cost = Game.market.calcTransactionCost(1000, 'E91N73', Memory.temp2[deal].roomName);
}


Memory.temp2 = _.sortBy(Memory.temp2, deal => deal.cost)

Game.market.deal('59707350ba4c157e0c6f4f23', 300, 'E91N73')
    
    */
    /*Game.getObjectById().send(RESOURCE_KEANIUM, 40000, '')
    Game.getObjectById('5998724cb9a0010632894e24').send(RESOURCE_ENERGY, 6500, 'E91N73')
    Game.getObjectById('59b5b8dca112247a3dafdfc7').send(RESOURCE_CATALYST, 10000, 'E91N73')
    Game.market.createOrder(ORDER_SELL, RESOURCE_OXYGEN, .235, 25000, 'E91N73')
    
    
    Memory.temp2 = _.filter(Game.market.getAllOrders(), (order) => order.resourceType == RESOURCE_UTRIUM_LEMERGITE && order.type == 'sell' && order.amount > 100);             
      for(var deal in Memory.temp2){                 Memory.temp2[deal].cost = Game.market.calcTransactionCost(1000, 'E91N72', Memory.temp2[deal].roomName);             }
      Memory.temp2 = _.sortBy(Memory.temp2, deal => [deal.price, deal.cost]);
      
       RESOURCE_UTRIUM_LEMERGITE
      Game.market.deal('594fd7b8393699450f26006a', 1000, 'E91N73');
      
      
        Game.market.createOrder(ORDER_BUY, RESOURCE_GHODIUM_ACID, 1.1, 20000, 'E89N68');
        Game.market.createOrder(ORDER_BUY, RESOURCE_UTRIUM_LEMERGITE, .090, 20000, 'E91N72');
    */
if(Game.time % 10 === 0){
    if(Game.getObjectById('5967b3d74255e84adb21d33b').store[RESOURCE_ENERGY] > 500000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E91N73' && creep.room.name == 'E91N73' );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E91N73').length < 1)){
                    dynTrans[0].memory.targetBoxId = '5967b3d74255e84adb21d33b';
                    dynTrans[0].memory.dropSiteId = '5978697d0a12b57374966c46';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }/*else*/
    /*if(Game.getObjectById('59b5b8dca112247a3dafdfc7').store[RESOURCE_ENERGY] > 7500) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E89N68' && creep.room.name == 'E89N68' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E89N68').length < 1)){
                    dynTrans[0].memory.targetBoxId = '59b5b8dca112247a3dafdfc7';
                    dynTrans[0].memory.dropSiteId = '599fc222065bbc7edb30efc3';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }*/
    if(Game.getObjectById('59b32d2ebefddd4b380b3cc1').store[RESOURCE_ENERGY] > 500000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E94N67' && creep.room.name == 'E94N67' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E94N67').length < 1)){
                    dynTrans[0].memory.targetBoxId = '59b32d2ebefddd4b380b3cc1';
                    dynTrans[0].memory.dropSiteId = '59bdf41ed34bc66ee5776192';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }
    if(Game.getObjectById('598a2b507485e54974552644').store[RESOURCE_ENERGY] > 400000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E91N72' && creep.room.name == 'E91N72' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E91N72').length < 1)){
                    dynTrans[0].memory.targetBoxId = '598a2b507485e54974552644';
                    dynTrans[0].memory.dropSiteId = '5998724cb9a0010632894e24';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }
     if(Game.getObjectById('59e121e103f02f097f2d7cb0').store[RESOURCE_ENERGY] > 50000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E88N65' && creep.room.name == 'E88N65' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E88N65').length < 1)){
                    dynTrans[0].memory.targetBoxId = '59e121e103f02f097f2d7cb0';
                    dynTrans[0].memory.dropSiteId = '59d344f2187cac3aa41f3383';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }
    if(Game.getObjectById('599fc222065bbc7edb30efc3').store[RESOURCE_ENERGY] > 500000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E89N68' && creep.room.name == 'E89N68' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E89N68').length < 1)){
                    dynTrans[0].memory.targetBoxId = '599fc222065bbc7edb30efc3';
                    dynTrans[0].memory.dropSiteId = '59b5b8dca112247a3dafdfc7';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }
    if(Game.getObjectById('59e8570f9e84d624d8c106b6').energy < 300000) {
    var dynTrans = _.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'NoJob' && creep.memory.homeRoom == 'E89N68' && creep.room.name == 'E89N68' && creep.ticksToLive > 100 );
                    if(dynTrans.length > 0 && (_.filter(Game.creeps, (creep) => creep.memory.role == 'dynTrans' && creep.memory.state == 'IdleJob' && creep.memory.homeRoom == 'E89N68').length < 1)){
                    dynTrans[0].memory.targetBoxId = '599fc222065bbc7edb30efc3';
                    dynTrans[0].memory.dropSiteId = '59e8570f9e84d624d8c106b6';
                    dynTrans[0].memory.state = 'IdleJob';
                    dynTrans[0].memory.pickupType = RESOURCE_ENERGY;
                    }
    }
    
}
    
    
    /*console.log('CPU After transfers:' + Game.cpu.getUsed());*/
}catch(error){console.log("Error with transfers:" + error); Memory.error = error; }

 /*roomMaint: try{
    if(!Memory.Globals){Memory.Globals = {};}
    if(!Memory.Globals.Rooms){Memory.Globals.Rooms = {};}
    
        for(const spawner in Game.spawns){
            const roomName = Game.spawns[spawner].room.name;
            
            if(!Memory.Globals.Rooms[roomName]) {
                roo = {name: roomName, JobBoard: {}, BoxWatchList: [], Sources: []};
                Memory.Globals.Rooms[roomName] = roo;
            }
        };
}
catch(error){console.log("Error with room management: " + error);}*/

    try{
     
     /*const FreeSpawner = UtilitySpawn.GetSpawner(['Casey Home', 'CH1-2']);*/
     console.log(
    '[Casey Home] ' + Game.spawns['Casey Home'].room.energyAvailable + '/' + Game.spawns['Casey Home'].room.energyCapacityAvailable + '  ' + 
    '[Home2] ' + Game.spawns['Home2'].room.energyAvailable + '/' + Game.spawns['Home2'].room.energyCapacityAvailable + '   ' +
    '[Home3] ' + Game.spawns['Home3'].room.energyAvailable + '/' + Game.spawns['Home3'].room.energyCapacityAvailable + '   ' +
    '[Home4] ' + Game.spawns['Home4'].room.energyAvailable + '/' + Game.spawns['Home4'].room.energyCapacityAvailable + '   ' +
    '[Home5] ' + Game.spawns['Home5'].room.energyAvailable + '/' + Game.spawns['Home5'].room.energyCapacityAvailable + '   ' +
    '[Home6] ' + Game.spawns['Home6'].room.energyAvailable + '/' + Game.spawns['Home6'].room.energyCapacityAvailable + '   '
    );
     
     
     if(Game.time % 10 === 0) {for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }}
    
     const startCpu2 = Game.cpu.getUsed();
    try{ /* features: only one spawner in a room is set to spawn each tick max, prints out what each spawner is spawning, only one check for dynTrans is made each tick */
    const spawners = [['Casey Home','CH1-2'], ['Home2'], ['Home3','CH3-2'], ['Home4', 'CH4-2', 'CH4-3'], ['Home5', 'CH5-2'], ['Home6', 'CH6-2']];
    var spawnPrint = '';
    
    spawners.forEach(function(spawnRoom){
        var spawnedOne = false;
        var checkedBoxes = false;
        spawnRoom.forEach(function(spawner){
          
        spawner = Game.spawns[spawner];
          if(!(spawner == undefined)){
            if(spawner.spawning){
                spawnPrint += '  [' + spawner.name + '] Spawning: ' + spawner.spawning.name;
                spawner.room.visual.text(
            '🛠️' + spawner.spawning.name,
            spawner.pos.x + 1, 
            spawner.pos.y, 
            {align: 'left', opacity: 0.8});
            
              if(!checkedBoxes){checkedBoxes = true;  UtilityRoom.WatchBoxes(spawner.name, 0, spawner.room.name, utils.GetWatchBoxes(spawner.room.name), true);}  
            } else if(!spawnedOne && Game.time % 2 === 0){ /* not spawning atm*/
                spawnedOne = true;
                switch(spawner.room.name){
                    case 'E91N73':
                        Spawning.SpawnCaseyHome(spawner.name); /* todo, add some sort of cooldown on spawn checks */
                        break;
                    case 'E92N74':
                        Spawning.SpawnHome2();
                        break;
                    case 'E91N72':
                        Spawning.SpawnHome3(spawner.name);
                        break;
                    case 'E88N65':
                        Spawning.BasicSpawning(spawner, true);
                        /*Spawning.SpawnHome6(spawner.name)*/
                        break;
                    case 'E94N67':
                        Spawning.SpawnHome5(spawner.name);
                        break;
                    case 'E89N68':
                        Spawning.SpawnHome4(spawner.name)
                        break;
                    default:
                    break;
                }
            }
            if(spawnedOne){UtilitySpawn.RenewSurrounding(spawner.name);}
            }
        });
    });
    console.log(spawnPrint);
    }catch(err){console.log('error in new spawn loop: ' + err);}
    /*console.log( (Game.cpu.getUsed() - startCpu2) + ' :used for spawn calc');*/
     
     /*console.log('CPU After spawn loop:' + Game.cpu.getUsed());*/
    
    }catch(error){console.log('Error in spawn1: ' + error);}
    
Game.creeps.sort;
    for(var name in Game.creeps) {

        var creep = Game.creeps[name];
        try{
            if(creep.spawning){continue;}
            const startCpu = Game.cpu.getUsed();
        switch(creep.memory.role){
            case 'harvester':  roleHarvester.run(creep);
                break;
                 case 'upgrader':  roleUpgrader.run(creep);
                break;
                 case 'builder':  roleBuilder.run(creep);
                break;
                 case 'claimer':  roleClaimer.run(creep);
                break;
                 case 'raider':  roleRaider.run(creep, creep.memory.raidFlag, creep.memory.homeRoom);
                break;
                 case 'dedharvester':  roleDedHarvester.run(creep, creep.memory.sourceId, creep.memory.dropSiteId, creep.memory.workRoom);
                break;
                case 'transport':  roleTransport.run(creep, creep.memory.homeRoom);
                break;
                case 'raider2':  roleRaider.run(creep, creep.memory.raidFlag, creep.memory.homeRoom);
                break;
                case 'tanker':  roleTanker.run(creep, creep.memory.homeRoom);
                break;
                case 'thief':  roleThief.run(creep, creep.memory.homeRoom, creep.memory.thiefRoom);
                break;
                case 'flagattacker':  roleFlagAttacker.run(creep);
                break;
                case 'defender':  roleDefender.run(creep, creep.memory.raidFlag);
                break;
                case 'miner': roleMiner.run(creep);
                break;
                case 'dynTrans': roleDynTrans.run(creep);
                break;
                case 'rangedattacker': roleRangedAttacker.run(creep);
                break;
                case 'utility': roleUtility.run(creep);
                break;
                case 'igore': roleIgore.run(creep);
                break;
                default:
                console.log("No role found! " + creep.memory.role + ' ' + creep.memory.name + ' ' + creep.memory.room + ' logging creep to Memory.error');
                Memory.error = creep;
                break;
        }
        const elapsed = Game.cpu.getUsed() - startCpu;
        /*if(elapsed > 10){Game.notify('Warning, ' + creep.role + ' ' + creep.name + ' used ' + elapsed + ' CPU!', 60);}*/
        if(elapsed > 10){Memory.logs['CPU'].push('Creep '+name+' has used '+elapsed+' CPU time');}
        /*Memory.logs['CPU'].push('Creep '+name+' has used '+elapsed+' CPU time');*/
        if(elapsed > 10){console.log('Creep '+name+' has used '+elapsed+' CPU time')};
        }
        catch(error){
           /* if(creep.memory.role == 'transport'){creep.suicide();}*/
            console.log('Error in creep role: ' /*+ error.line + ' ::'*/ +error); console.log(creep.name); Memory.error = error;}
        
    }
    
    try{
        UtilitySpawn.RenewSurrounding('CH4-2');
        Memory.Labs.hasRun = false;
        /*console.log('CPU After all:' + Game.cpu.getUsed());*/
    }catch(error){console.log(error);}
    
    if(!Memory.CPUUSED){Memory.CPUUSED = 0;}
    Memory.CPUUSED = (Memory.CPUUSED + (Game.cpu.limit - Game.cpu.getUsed()))/2;
                        Memory.Globals.HasRepairer = false;
                        console.log('--------' + Game.cpu.bucket +'-------------' + Game.time + '------------FinalCPU:' + Game.cpu.getUsed() + '-----------RCPU[' +Math.round((Game.cpu.limit - Game.cpu.getUsed())*100)/100 + ']--------CPU[' + Math.round(Memory.CPUUSED*100)/100 +']------CPU Used:' + (Game.cpu.getUsed() - CPUSTART) + '----');
                        
}