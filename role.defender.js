
var roleDefender = {
    run: function(creep, raidFlag, homeRoom) {
        /* Game.spawns['Casey Home'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], 'Defender-' + Math.floor(Math.random()*10000)+1, {role: 'defender', raidFlag: 'raid1', homeRoom: 'E91N73'}) 
        */
        if(!Game.flags[raidFlag]){console.log(creep.id + ': has no raid flag'); return;}
        
        
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

/** if(typeof Game.getObjectById(box) === 'null' ){return;}
 **/
 /*console.log(closestHostile);
 console.log(typeof  closestHostile != 'null' );*/
        if(closestHostile)
        {
            console.log("Engaging hostile in " + creep.room.name);
            if(creep.attack(closestHostile)== ERR_NOT_IN_RANGE)
            {
              creep.moveTo(closestHostile, {reusePath: 1, visualizePathStyle: {stroke: '#555555'}});  
            }
        }
        else if(creep.room.name != raidFlag)
        {
            creep.moveTo(Game.flags[raidFlag], {visualizePathStyle: {stroke: '#555555'}});
        }else {creep.memory.role = 'utility'}
        
        
    }
};

module.exports = roleDefender;