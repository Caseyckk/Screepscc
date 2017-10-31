var roleFlagAttacker = {
    run: function(creep){
        var attackFlags = [];
        var knownRooms = [];

if(/*creep.room.name == 'E94N72' &&*/ creep.memory.state == 'healer')
{ 
   dCreeps = _.filter(Game.creeps, (creep) => creep.room.name == creep.room.name && (creep.memory.role == 'flagattacker' || creep.memory.role == 'defender') && creep.hits < creep.hitsMax - 50);
   dCreeps = creep.pos.findClosestByPath(dCreeps);
   
   if (creep.heal(dCreeps) == ERR_NOT_IN_RANGE){
       creep.moveTo(dCreeps);
       creep.heal(dCreeps);
         return;
   }


}

/*creep.moveTo(Game.flags['raidpower'], {reusePath: 0, ignoreCreeps: false , visualizePathStyle: {stroke: '#11ffff'}});
            return;*/

switch(creep.room.name)
{
    case 'E92N72':
         var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(false){
            console.log("Engaging hostile in " + creep.room.name);
            if(creep.attack(closestHostile)== ERR_NOT_IN_RANGE){ creep.moveTo(closestHostile, {reusePath: 1, visualizePathStyle: {stroke: '#555555'}}); }
            return;
        }else{
            creep.moveTo(Game.flags['E93N72'], {reusePath: 0, ignoreCreeps: false , visualizePathStyle: {stroke: '#11ffff'}});
            return;
        }
    break;
    case 'E93N72':
         var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            console.log("Engaging hostile in " + creep.room.name);
            if(creep.attack(closestHostile)== ERR_NOT_IN_RANGE){ creep.moveTo(closestHostile, {reusePath: 1, visualizePathStyle: {stroke: '#555555'}}); }
            return;
        }else{
          creep.moveTo(Game.flags['E93N72'], {reusePath: 0, ignoreCreeps: false, visualizePathStyle: {stroke: '#11ffff'}});
          return;
        }
    break;
    case 'E94N72':
    break;
    default:
     var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(false){
            console.log("Engaging hostile in " + creep.room.name);
            if(creep.attack(closestHostile)== ERR_NOT_IN_RANGE){ creep.moveTo(closestHostile, {reusePath: 1, visualizePathStyle: {stroke: '#555555'}}); }
            return;
        }else{
            creep.moveTo(Game.flags['E93N72'], {reusePath: 0, ignoreCreeps: false, visualizePathStyle: {stroke: '#11ffff'}});
            return;
        }
}

       


 /*if(creep.room.name != 'E92N72' || creep.room.name != 'E94N72' || creep.room.name != 'E93N72' ){
     console.log("here2");
        creep.moveTo(Game.flags['E92N72'], {reusePath: 1, visualizePathStyle: {stroke: '#11ffff'}});
        return;
    }*/
    
        for (const i in Game.flags){
            var newFlag = Game.flags[i];

            if (newFlag.color == COLOR_RED){
                attackFlags.push(newFlag);
                //console.log('Flag: ' + newFlag);
            }
        }

        var attackFlag = _.filter(attackFlags, (flag) => flag.secondaryColor = COLOR_RED);
        //creep.pos.findClosestByRange(.filter(attackFlags, (flag) => flag.secondaryColor = COLORRED));

        if(!attackFlag){
            attackFlag = _.filter(attackFlags, (flag) => flag.secondaryColor = COLOR_YELLOW);
        }
        if(attackFlag.length < 1){
            creep.moveTo(Game.flags[creep.memory.homeRoom], {reusePath: 0, ignoreCreeps: true, visualizePathStyle: {stroke: '#11ffff'}});
        }

        var knowRoom = false;
        for (const j in Game.rooms){
            if (attackFlag.length > 0 && attackFlag[0].pos.roomName == j){
                knowRoom = true;
            }
        }
        //console.log('KnownRoom: ' + knowRoom.toString());

        if(!knowRoom && attackFlag.length > 0){
            creep.moveTo(new RoomPosition(25,25,attackFlag[0].pos.roomName));
            creep.say("TO WAR!");
        }
        else{
            if(attackFlag.length > 0){
                var structure = attackFlag[0].pos.findInRange(FIND_STRUCTURES, 0);
                //console.log(structure.length);
                //var tryAttack = creep.rangedAttack(attackFlag[0].pos);
                //console.log(creep.rangedAttack(structure[0]));

            if(structure.length == 0){
                    console.log('Removing flag: ' + attackFlag[0].name);
                    attackFlag[0].remove();
                }
                else if(creep.attack(structure[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure[0]);
                }
            }
        }
        
    }
}

module.exports = roleFlagAttacker;