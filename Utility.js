

var GetSource = {

    /** @param {Creep} creep **/
    run: function(creep) {

/**console.log("In the utility!");**/
    var sources = creep.room.find(FIND_SOURCES);
    if(sources.length < 1){creep.moveTo(Game.flags[creep.memory.homeRoom]); return;};
    
    sources.sort;
    if(creep.room.name == 'E92N74'){
        if(creep.memory.role == 'raider'){
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }else if(creep.room.name == 'E91N72'){
            if(creep.memory.role == 'upgrader' || creep.memory.role == 'harvester'){
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
    else{
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
        
    }else if(creep.room.name == 'E89N68'){
        if(creep.memory.role == 'upgrader' || creep.memory.role == 'builder' ){
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }else if(creep.room.name == 'E96N67'){
        if(creep.memory.type == 'Cons' || creep.memory.role == 'upgrader' || creep.memory.role == 'builder' ){
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }else if(creep.room.name == 'E88N65'){
        /*if(creep.memory.role == 'builder' ){
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{*/
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        /*}*/
    }else{
    
    if(creep.memory.role == 'builder'){
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
    else{
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
    
    }}
	
}

module.exports = GetSource;
