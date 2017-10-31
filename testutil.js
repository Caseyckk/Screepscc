/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('testutil');
 * mod.thing == 'a thing'; // true
 */

var utils = (function(){
    function GetSource() {console.log("GotSource");}
    
    function Move(creep, target){
        creep.moveTo(target, {reusePath: 5, ignoreCreeps: true, visualizePathStyle: {stroke: '#ffffff'}});
        
        if(creep.pos.x == creep.memory.lastX && creep.pos.y == creep.memory.lastY){
            creep.moveTo(target, {reusePath: 0, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.lastX = creep.pos.x; creep.memory.lastY = creep,pos.y;
        }
        else{
            creep.memory.lastX = creep.pos.x; creep.memory.lastY = creep,pos.y;
        }
    }
    
    function MoveRepair(creep){
        var repairStructure = creep.pos.findClosestByRange(creep.room.moveRepairs);/*FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax * .85 && structure.hits < 3500000 || structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax *.85;
            } 
            });*/
            
            if(!repairStructure || creep.pos.getRangeTo(repairStructure) > 3){
                repairStructure = creep.pos.findClosestByRange(creep.room.roomStructures, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax && structure.hits < 5000000 || structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax;
            } 
            });
            }
            
            creep.repair(repairStructure);
    }
    
    function DumpExtra(creep){
        if(Object.keys(creep.carry).length > 1)
	    {
	            if(creep.transfer(Game.getObjectById(GetMainStorageId(creep.room.name)), Object.keys(creep.carry)[1])) {
                    creep.moveTo(Game.getObjectById(GetMainStorageId(creep.room.name)), {visualizePathStyle: {stroke: '#ffffff'}});
                }
	            return true;
	    }
	    else{return false};
    } /*Dump Extra*/
    function SaveAPenny(creep){
        if(creep.memory.Dtimer >0){creep.memory.Dtimer--; return false;}
        
         if(Game.cpu.bucket > 5000){
             const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
	        if(droppedResource && droppedResource.amount > 25 && creep.pos.getRangeTo(droppedResource) <= 5){
	            if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResource, {visualizePathStyle: {stroke: Memory.Colors.Harvesting}});
                    creep.pickup(droppedResource, RESOURCE_ENERGY);
                    creep.say("♻️PENNY!");
	            }
	            return true;
	        }
         }else{console.log('Low ticks, not running SaveAPenny'); creep.memory.Dtimer = 150; return false; /*Game.notify('low ticks, not running SaveAPenny', 60);*/}
        
        
	            creep.memory.Dtimer = 5;
	            return false;
	}/*SaveAPenny*/
    
    function Build(creep){
        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return structure.owner.username == 'Caseycc' ;
            } 
            });
            if(target) {
                creep.say('🚧 build');
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: Memory.Colors.Building}});
                }
                return true;
            }
            else{return false;}
    }/*Build*/
    
     function Repair(creep){
         return false;
        var Repairs = _.filter(creep.room.roomStructures, (object) => { return (object.structureType != STRUCTURE_ROAD && (object.hits < object.hitsMax * .5 && object.hits < 5000000) && object.id != '' ) 
        });
                         console.log(Repairs.length);
                /*console.log(Repairs.length > 0);*/
                if(Repairs.length > 0 ){
                    Repairs.sort;
                    /*Memory.Globals.HasRepairer = true;*/
                    creep.say('🚧 repair');
                        creep.moveTo(Repairs[0], {visualizePathStyle: {stroke: '#11ffff'}});
                        creep.repair(Repairs[0], {visualizePathStyle: {stroke: '#11ffff'}});
                        return true;
                }
                return false;
    }/*Repair*/
    
    function Flee(creep){
        /*var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile > 0){
                creep.moveTo(Game.flags[homeRoom], {visualizePathStyle: {stroke: '#555555'}});
                return true;
            }
        return false;*/
        var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(hostile){
        var direction = creep.pos.getDirectionTo(hostile);
  direction = (direction + 3) % 8 + 1;
  if (!direction || direction === null || creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
    creep.moveTo(25, 25);
    return true;
  }
  
        }
  return false;
    }/*Flee*/
    
     function RepTower(tower){ /* potentially, I find all other turrets in the room dynamically and have them fire too rather than hard coding them all */
        /*var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } 
        else{*/
        if(tower.energy < tower.energyCapacity *.5) {return;}
        
                    var closestDamagedCreep = tower.pos.findClosestByRange(FIND_CREEPS, {
                filter: (creep) => creep.hits < creep.hitsMax
            });
            if(closestDamagedCreep) {tower.heal(closestDamagedCreep)}
            else{
            
            const lowestStructure =  _.sortBy(_.filter(tower.room.roomStructures, (structure) => structure.hits < structure.hitsMax && structure.hits < 750000 /*&& structure.id != '5983d33fb9bd266e0e8918c7'*/
            ), structure => structure.hits / structure.hitsMax)[0];
            
            if(lowestStructure) {tower.repair(lowestStructure);}
            }
        /*}*/
    }/*RepTower*/
    
    
    function GetMainStorageId(roomName){
        switch(roomName)
        {
            case 'E92N74':
                return '597a5148594af22cf2e97353';
                break;
            case 'E91N73':
                return '5967b3d74255e84adb21d33b';
                break;
            case 'E91N72':
                return '598a2b507485e54974552644';
                break;
            case 'E89N68':
                return '599fc222065bbc7edb30efc3';
                break;
            case 'E94N67':
                return '59b32d2ebefddd4b380b3cc1';
                break;
            case 'E96N67':
                return '59c64199e42b4638db770c64';
                break;
            case 'E88N65':
                return '59d344f2187cac3aa41f3383';
                break;
            default:
            /*return '598a2b507485e54974552644';*/
            console.log("No MainStorage set for " + roomName);
            console.log('maybe this is it? ' + _.filter(Game.rooms[roomName].roomStructures, (structure) => structure.structureType == STRUCTURE_STORAGE)[0].id);
            return _.filter(Game.rooms[roomName].roomStructures, (structure) => structure.structureType == STRUCTURE_STORAGE)[0].id;
            return false;
        }
     
     
    }/*GetMainStorage*/
    /* utils.GetWatchBoxes(RoomName); */
    function GetWatchBoxes(roomName){
        var ThinkerBoxes = [];
        if(Memory.Thinker.SpawnRooms[roomName] && Object.keys(Memory.Thinker.SpawnRooms[roomName].Rooms.length > 0)){
            Object.keys(Memory.Thinker.SpawnRooms[roomName].Rooms).forEach(function(room){
                    room = Memory.Thinker.SpawnRooms[roomName].Rooms[room];
                    
                    room.sources.forEach(function(source){
                       ThinkerBoxes.push(source.containerId); 
                    });
                });
        }
        
        switch(roomName)
        {
            case 'E92N74':
                return ['596db14e3a9cca2df02335d8', '5983d33fb9bd266e0e8918c7'];
                break;
            case 'E91N73':
                var ManualBoxes1 = ['598202abfb76d906a37685a9','5972d28c88644b7094da7d32', '59720dd6135cf74e25128b85', '59dba24d57423a168aca4f0d'];
                return _.uniq(ManualBoxes1.concat(ThinkerBoxes)); /* todo: get rid of the uniq */
                break;
            case 'E91N72': 
                var ManualBoxes2 = ['59d9a17631ff547c7a38533d', '59d0d85b673dbd257096cea6', '5989c7d8ec2d062d878986e7', /* R3_S */ '5999106f2fdb4d412688fdc9', '5996ec80942a3d4bbdd3fe88',/*R3_SE*/ '598daf2768793357bcbc85a7', '59953d5645961a7d07216606'];
                return _.uniq(ManualBoxes2.concat(ThinkerBoxes)); /* todo: get rid of the uniq */
                return '598a2b507485e54974552644';
                break;
            case 'E89N68':
                var ManualBoxes3 = ['59a052f88137500ba744186e','59a047591405fa2de7bfe201', '59a1a2a6a1034b46ad962039', '59aff95a03a62f7614b8a76c', '59aff6dbca090736d4e7d85c', '59aed94fdc9b6d34b80294ef', '59ac9d9745e2de600ee05c87'];
                 return _.uniq(ManualBoxes3.concat(ThinkerBoxes)); /* todo: get rid of the uniq */
                /*return ['59a052f88137500ba744186e','59a047591405fa2de7bfe201', '59a1a2a6a1034b46ad962039', '59aff95a03a62f7614b8a76c', '59aff6dbca090736d4e7d85c'];*/
                break;
            case 'E94N67':
                var ManualBoxes4 = [''];
                return _.uniq(ManualBoxes4.concat(ThinkerBoxes)); /* todo: get rid of the uniq */
                break;
            default:
            /*return '598a2b507485e54974552644';*/
            console.log("No watchbox for " + roomName);
            return false;
        }
     
     
    }/*GetWatchBoxes*/
    
    function RangeAttack(creep, hostile){
            if (creep.hits < 0.5 * creep.hitsMax  || creep.pos.getRangeTo(hostile) < 3) {
                if(!(creep.rangedAttack(hostile) == OK)){if(creep.hits < creep.hitsMax){creep.heal(creep)}};
                console.log('flee!');
            return Flee(creep);
            }
            
        creep.moveTo(hostile);
        if(!(creep.rangedAttack(hostile) == OK)){if(creep.hits < creep.hitsMax){creep.heal(creep)}};
        return true;
    }/*end RangeAttack*/
    
    return {
        GetSource: GetSource, 
        MoveRepair: MoveRepair,
        Move: Move,
        DumpExtra: DumpExtra,
        SaveAPenny: SaveAPenny,
        Build: Build,
        Repair: Repair,
        Flee: Flee,
        RepTower: RepTower,
        GetMainStorageId: GetMainStorageId,
        GetWatchBoxes: GetWatchBoxes,
        RangeAttack: RangeAttack
    };
}());

module.exports = {utils
};