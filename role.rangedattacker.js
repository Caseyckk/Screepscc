var utils = require('testutil').utils;

var roleRangedAttacker = {
    run: function(creep) {
        
        if(!Game.flags[creep.memory.targetFlag]){console.log(creep.id + ':' + creep.name + ': has no raid flag'); return;}
        
        
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile)
        {
            console.log("Engaging hostile in " + creep.room.name);
            creep.say("fight!");
            utils.RangeAttack(creep, closestHostile);
            return;
        }
        else if(creep.room.name != Game.flags[creep.memory.targetFlag].pos.roomName)
        {
            creep.moveTo(Game.flags[creep.memory.targetFlag], {reusePath: 5, visualizePathStyle: {stroke: '#555555'}});
        }else {
            /*if(creep.memory.wait){
                creep.memory.wait++; 
                if(creep.memory.wait > 5){
                            creep.say("going home");
                            creep.moveTo(Game.flags[creep.memory.homeRoom]);
                            }
            }else {creep.memory.wait = 1;}*/
            creep.say("going home");
            creep.moveTo(Game.flags[creep.memory.homeRoom]);
        }
        if(creep.hits < creep.hitsMax){creep.heal(creep);}
    }  
};

module.exports = roleRangedAttacker;