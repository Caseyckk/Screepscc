
var roleUtility = {
    run: function(creep) {
       switch(creep.memory.state){
           case 'recycle':
              /* Memory.temp = _.filter(Game.spawns, (spawn) => spawn.room.name ==  Game.rooms[creep.memory.homeRoom].name)[0].id;*/
               if(!creep.memory.spawnId){ creep.memory.spawnId = _.filter(Game.spawns, (spawn) => spawn.room.name ==  Game.rooms[creep.memory.homeRoom].name)[0].id}
               
               const spawn = Game.getObjectById(creep.memory.spawnId);
               
               if(creep.pos.getRangeTo(spawn) == 1){spawn.recycleCreep(creep); console.log('Recycling creep: ' + creep.name + ' [] ' + creep.id)}
               else{ creep.moveTo(spawn); }
               
               console.log("recycling creep[" + creep.room.name + ']: '  + creep.name +"[" + creep.ticksToLive + "]" + creep.id);
               
               
               break;
            default:
            console.log('invalid utility state');
            creep.memory.state = 'recycle';
           break;
       }
        
        
    }
};

module.exports = roleUtility;