var utils = require('testutil').utils;
var UtilitySpawn = require('utility.spawn').utilitySpawn;
var UtilityRoom = require('utility.room').utilityRoom;

var Protos = {

    /** @param {Creep} creep **/
    run: function() {
        
        const logDefines = false;
try{
        Object.defineProperty(Room.prototype, 'roomCreeps', {
            get: function(){
                if(!this._roomCreeps){
                    this._roomCreeps =  _.filter(Game.creeps, (creep) => creep.memory.homeRoom === this.name && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));
                }
                return this._roomCreeps;
            }
        } );
}catch(error){if(logDefines){console.log(error);}}
         /*console.log('after defines1:' + Game.cpu.getUsed());*/
         
try{
        Object.defineProperty(Room.prototype, 'roomStructures', {
            get: function(){
                if(!this._roomStructures){
                    this._roomStructures = this.find(FIND_STRUCTURES);
                }
                return this._roomStructures;
            }
        } );
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Object.defineProperty(Room.prototype, 'roomRepairs', {
            get: function(){
                if(!this._roomRepairs){
                    this._roomRepairs =  _.filter(this.roomStructures, (structure) => (structure.hits < structure.hitsMax * .8) && structure.hits < 50000);
                }
                return this._roomRepairs;
            }
        });
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Object.defineProperty(Room.prototype, 'moveRepairs', {
            get: function(){
                if(!this._moveRepairs){
                    this._moveRepairs =  _.filter(this.roomStructures, (structure) => structure.hits < 3500000 && structure.hits < structure.hitsMax * .85); 
                }
                return this._moveRepairs;
            }
        });
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Object.defineProperty(Room.prototype, 'roomExtensions', {
            get: function(){
                if(!this._roomExtensions){
                    this._roomExtensions =  _.filter(this.roomStructures, (structure) => 
                    (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity * .75);
                }
                return this._roomExtensions;
            }
        });
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Object.defineProperty(Room.prototype, 'MainStorage', {
            get: function(){
                if(!this._MainStorage){
                    this._MainStorage = Game.getObjectById(utils.GetMainStorageId(this.name));
                }
                return this._MainStorage;
            }
        });
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Object.defineProperty(Room.prototype, 'RoomNetwork', {
            get: function(){
                if(!this._RoomNetwork){
                    this._RoomNetwork = UtilityRoom.GetRoomNetwork(this.name);
                }
                return this._RoomNetwork;
            }
        });
}catch(error){if(logDefines){console.log(error);}}
    
try{
        Room.prototype.WatchRooms = function(SpawnName, AvailEnergy, spawn){
                
                return UtilityRoom.WatchRooms(SpawnName, AvailEnergy, this.name, this.RoomNetwork, spawn);
            }
}catch(error){if(logDefines){console.log(error);}}


try{
        Room.prototype.RunTowers = function(hostileCreep){
            const firstHostile = this.find(FIND_HOSTILE_CREEPS)[0]; /*replace this if there's another way you want to target creeps*/
            if(firstHostile) {
                this.FireTowers(firstHostile);
                }else{ /*going to manually code which tower does repairs to save time on looking up towers every turn */
                    var tower;
                
                    switch(this.name){
                        case 'E91N73':
                            tower = Game.getObjectById('596a73300d6e9566facf534e');
                            break;
                        case 'E92N74':
                            tower = Game.getObjectById('597f636d907dcd29a2b86621');
                            break;
                        case 'E91N72':
                            tower = Game.getObjectById('598801cacb82200bbe0e7436');
                            break;
                        case 'E89N68':
                            tower = Game.getObjectById('59e70e69426bbc56a15fb34a');
                            break;
                        case 'E94N67':
                            tower = Game.getObjectById('59b17c08da035c0b0499ebfa');
                            break;
                        case 'E88N65':
                            tower = Game.getObjectById('59d18ab54dd7a63d2359220b');
                            break;
                        default:
                            tower = _.first(this.roomStructures, (structure) => structure.structureType == STRUCTURE_TOWER);
                            console.log('** there is no first tower for: ' + this.name);
                            break;
                    }
                    
                    if(tower && tower.energy > 500) { /* only repair if tower has above 50% energy */
                        const closestDamagedCreep = tower.pos.findClosestByRange(FIND_CREEPS, {
                            filter: (creep) => creep.hits < creep.hitsMax
                            });
                            
                            if(closestDamagedCreep) {tower.heal(closestDamagedCreep)}
                            else{
                                const lowestStructure =  _.sortBy(_.filter(tower.room.roomStructures, (structure) => structure.hits < structure.hitsMax && structure.hits < 750000 && structure.id != '58e027aa679dec6747efed47'
                                ), structure => structure.hits / structure.hitsMax)[0];
                                
                                if(lowestStructure) {tower.repair(lowestStructure);}
                                }
                    }/*end tower repair*/
                }/*end no hostile code*/
        }
}catch(error){if(logDefines){console.log("*** error in RunTowers: " + error);}}

try{
        Room.prototype.FireTowers = function(hostileCreep){
                
            const towers = _.filter(this.roomStructures, (structure) => structure.structureType == STRUCTURE_TOWER);
            towers.forEach(function(tower){
                 tower.attack(hostileCreep);
             });
            }
}catch(error){if(logDefines){console.log("*** error in FireTowers: " + error);}}
    
        
        /*room.prototype.roomCreeps = function(){
            
        } _.filter(Game.creeps, (creep) => creep.memory.homeRoom === room.name && (creep.ticksToLive > 100 || creep.ticksToLive == undefined));
    }*/
        
    }
}

module.exports = {Protos};