var utils = require('testutil').utils;

var utilitySpawn = (function(){
    

    
     function RenewSurrounding(spawnerName) {
            const spawner = Game.spawns[spawnerName];
            
            const creepsToRenew = spawner.room.lookForAtArea(LOOK_CREEPS, spawner.pos.y-1, spawner.pos.x-1, spawner.pos.y+1,  spawner.pos.x+1,  true);
            if(creepsToRenew.length > 0){
                creepsToRenew.some(function(creep){
                   if(creep.creep.ticksToLive < 1400){
                       /*console.log('going to renew creep '+ creep.creep.name);*/
                       spawner.renewCreep(creep.creep);
                       return true;
                   }
                });
            }
        }
        
        function SpawnCreep(spawnerName, Parts, creepName, options) {
            var newName = Game.spawns[spawnerName].createCreep(Parts, creepName, options);
            console.log('Spawning new: ' + creepName + ':' + newName + ' at ::' + spawnerName);
        }
        
        function SpawnHarvester(spawnerName, AvailEnergy, HomeRoom, DropSiteId) {
            
                    if(AvailEnergy >= 600)
                    {
                        var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Harvester2_5-' + Math.floor(Math.random()*10000)+1, {role: 'harvester', homeRoom: HomeRoom, dropSiteId: DropSiteId});
                        console.log('Spawning new harvester: ' + newName + ' at ::' + spawnerName);
                        }else if(AvailEnergy >= 400)
                        {
                            var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'Harvester2-' + Math.floor(Math.random()*10000)+1, {role: 'harvester', homeRoom: HomeRoom, dropSiteId: DropSiteId});
                            console.log('Spawning new harvester: ' + newName + ' at ::' + spawnerName);
                            }else
                            {
                                var newName = Game.spawns[spawnerName].createCreep([WORK,CARRY,MOVE], 'Harvester0-' + Math.floor(Math.random()*10000)+1, {role: 'harvester', homeRoom: HomeRoom, dropSiteId: DropSiteId});
                                console.log('Spawning new harvester: ' + newName + ' at ::' + spawnerName);
                                }
        }/*SpawnHarvester*/
        
        function SpawnUpgrader(spawnerName, AvailEnergy, HomeRoom, TargetBoxId) {
            if(Game.getObjectById(utils.GetMainStorageId(HomeRoom)).store.energy > 40000 &&  AvailEnergy >= 1500 ){
                
                 /*const uParts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];*/
                        
                if(Game.rooms[HomeRoom].controller.level != 8 && AvailEnergy >= 3500){
                    /*if(Game.rooms['E88N65'].MainStorage.store[RESOURCE_ENERGY] > 500000){
                        var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader25-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                    }else{*/
                    var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader25-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                /*}*/
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
                }else if(AvailEnergy >= 2500 ){
                    var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader15-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
                }else if(AvailEnergy >= 1500 ){
                var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'Upgrader4-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
                }
            
            }else if(AvailEnergy >= 850){
                var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 'Upgrader3-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
            }else if(AvailEnergy >= 400){
                var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'Upgrader2-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
            }else{
                var newName = Game.spawns[spawnerName].createCreep([WORK,CARRY,MOVE], 'Upgrader0-' + Math.floor(Math.random()*10000)+1, {role: 'upgrader', homeRoom: HomeRoom, targetBoxId: TargetBoxId});
                console.log('Spawning new upgrader: ' + newName + ' at ::' + spawnerName);
            }
        }/*SpawnUpgrader*/
        
        function SpawnBuilder(spawnerName, AvailEnergy, HomeRoom) {
            if(AvailEnergy >= 600)
            {
                var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Builder2_5-' + Math.floor(Math.random()*10000)+1, {role: 'builder', homeRoom: HomeRoom});
                console.log('Spawning new builder: ' + newName + ' at ::' + spawnerName);
            }else if(AvailEnergy >= 400)
            {
                    var newName = Game.spawns[spawnerName].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'Builder2-' + Math.floor(Math.random()*10000)+1, {role: 'builder', homeRoom: HomeRoom});
                    console.log('Spawning new builder: ' + newName + ' at ::' + spawnerName);
                    }else
                    {
                        var newName = Game.spawns[spawnerName].createCreep([WORK,CARRY,MOVE], 'Builder0-' + Math.floor(Math.random()*10000)+1, {role: 'builder', homeRoom: HomeRoom});
                        console.log('Spawning new builder: ' + newName + ' at ::' + spawnerName);
                    }
        }/*SpawnUpgrader*/
        
        function SpawnDynTransport(spawnerName, AvailEnergy, HomeRoom) {
            /* 1350 cap, 2150 cost*/
            
            
           
            if(AvailEnergy >= 2150){
                const parts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,
                    MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
                const newName = Game.spawns[spawnerName].createCreep(parts, 'dynTrans-' + Math.floor(Math.random()*10000)+1, {role: 'dynTrans', homeRoom: HomeRoom, state: 'NoJob'});
               console.log(`Spawning new dyntrans: ${newName} at :: ${spawnerName}`);
                return true;
            }else if (AvailEnergy >= 800){
                const newName = Game.spawns[spawnerName].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'dynTrans-' + Math.floor(Math.random()*10000)+1, {role: 'dynTrans', homeRoom: HomeRoom, state: 'NoJob'});
                console.log(`Spawning new dyntrans: ${newName} at :: ${spawnerName}`);
                return true;
            }
            
        }/*SpawnDynTransport*/
        
        function GetSpawner(spawners){
            var freeSpawner;
            spawners.forEach(function (spawner){
                if(Game.spawns[spawner].spawning == null){freeSpawner = spawner; return;}
                console.log( 'logging: ' +  Game.spawns[spawner].spawning);
            });
            return freeSpawner;
        }/*end GetSpawner*/
        
        function SpawnFighter(spawnerName, FighterType, targetFlag, HomeRoom){
            /*SpawnCreep(spawnerName, Parts, creepName, options) */
            switch(FighterType)
            {
                case 'Defender':
                    break;
                case 'PatrollerR':
                    SpawnCreep(spawnerName, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,RANGED_ATTACK], 'PatrollerR_' + Math.floor(Math.random()*10000)+1, {role: 'rangedattacker', homeRoom: HomeRoom, targetFlag: targetFlag} );
                    break;
                    case 'PatrollerM':
                    SpawnCreep(spawnerName, [TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL], 'PatrollerM_' + Math.floor(Math.random()*10000)+1, {role: 'meleeattacker', homeRoom: HomeRoom, targetFlag: targetFlag} );
                    break;
                default:
                console.log("No fighter of the type: " + FighterType);
                    break;
            }
            
            
        }/*end SpawnFighter*/
        
        
        
    return {
        SpawnCreep: SpawnCreep, 
        SpawnHarvester: SpawnHarvester,
        SpawnUpgrader: SpawnUpgrader,
        SpawnBuilder: SpawnBuilder,
        SpawnDynTransport: SpawnDynTransport,
        GetSpawner: GetSpawner,
        SpawnFighter: SpawnFighter,
        RenewSurrounding: RenewSurrounding
    };
}());

module.exports = {utilitySpawn
};