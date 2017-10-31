var Traveler = require('Traveler');
/**
 * To start using Traveler, require it in main.js:
 * Example: var Traveler = require('Traveler.js');
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Movecc {
    /**
     * move creep to destination
     * @param creep
     * @param destination
     * @param options
     * @returns {number}
     */
    static moveccTo(creep, destinationId, options = {}) {
        /*console.log(JSON.stringify(roomCallBack));*/
		if(destinationId == null){ destinationId = creep.memory.targetBoxId;}
		if(!creep.memory.movecc){creep.memory.movecc = {pos: 0}
		}else{ if(creep.memory.movecc.pos == null){creep.memory.movecc.pos = 0;} }
		
		/*Memory.Cache[creep.pos.roomname][destinationId]*/
		try{
		var destinationPaths = Memory.Cache.SpawnRooms[creep.memory.homeRoom].Objects[destinationId];
		}catch(err){
		    if(!Memory.Cache){Memory.Cache = {}; Memory.Cache.SpawnRooms = {}; Memory.Cache.SpawnRooms[creep.memory.homeRoom] = {}; Memory.Cache.SpawnRooms[creep.memory.homeRoom].Objects = {}; /*Memory.Cache.SpawnRooms.Objects = {}; /*{SpawnRooms: {Objects:{}}};*/}
		    else{ if(!Memory.Cache.SpawnRooms[creep.memory.homeRoom]){Memory.Cache.SpawnRooms[creep.memory.homeRoom] = {Objects: {}};} }
		}
		if(!destinationPaths){ 
		    /* error checking for calcPath return needed here*/
		    Memory.Cache.SpawnRooms[creep.memory.homeRoom].Objects[destinationId] = this.CalcPath(Game.rooms[creep.memory.homeRoom].MainStorage.pos, Game.getObjectById(destinationId), options); 
		    destinationPaths = Memory.Cache.SpawnRooms[creep.memory.homeRoom].Objects[destinationId];
		}
		
		if(destinationPaths.path.length < 3){return true;}
		
		switch(creep.memory.movecc.state){
		case 'moveTo':
		    /*console.log('here2');*/
		    /*const roomPos = destinationPaths.path[destinationPaths.path.length-1];
		    console.log(roomPos);
		    const newRoomPos = new RoomPosition(roomPos.x, roomPos.y, roomPos.roomName);
		    console.log(newRoomPos);*/
		    if(this.samePos(creep.pos, destinationPaths.path[destinationPaths.path.length-1])){creep.memory.movecc.pos = destinationPaths.path.length-1; return true;} /* if we have arrived, return true */
		this.moveTo(creep, destinationPaths);
		break;
		case 'moveFrom':
		    /*console.log('here2a');*/
		    if(this.samePos(creep.pos, destinationPaths.path[0])){return true;} /* if we have arrived, return true */
		this.moveFrom(creep, destinationPaths);
		break;
		
		default: 
		creep.memory.movecc.state = 'moveTo';
		this.moveTo(creep, destinationPaths);
		}
		
		/*if(JSON.Stringify(creep.pos) == destinationPaths.path[creep.memory.movecc.pos];*/
		
		
		
        /*return creep.move(nextDirection);*/
    }
	
static moveTo(creep, destinationPaths){
	if(creep.pos.roomName != destinationPaths.path[creep.memory.movecc.pos].roomName && creep.pos.roomName == destinationPaths.path[(creep.memory.movecc.pos + 1)].roomName){creep.memory.movecc.pos++;}
	/*console.log('here3');*/
	/*console.log(destinationPaths.path[creep.memory.movecc.pos]);
	console.log(this.samePos(creep.pos, destinationPaths.path[creep.memory.movecc.pos]));*/
	if(!(this.samePos(creep.pos, destinationPaths.path[creep.memory.movecc.pos]))) /* we are not on track for some reason*/
	{
	    creep.say('OffTrack');
	    /*console.log(JSON.stringify(destinationPaths.path[creep.memory.movecc.pos]));*/
	    
	    var troomPos = destinationPaths.path[creep.memory.movecc.pos];
	    troomPos = new RoomPosition(troomPos.x, troomPos.y, troomPos.roomName );
	    /*console.log(JSON.stringify(troomPos));*/
	    /*console.log(this.normalizePos(troomPos)); return;*/
	    /*console.log(creep.travelTo(troomPos)); return;*/
	    return creep.travelTo(troomPos);}
	/*we are on track, continue */
	else { creep.say('OnTrack');  return creep.move(destinationPaths.dpathTo[creep.memory.movecc.pos++]); }

	}
	
static moveFrom(creep, destinationPaths){
	if(creep.pos.roomName != destinationPaths.path[creep.memory.movecc.pos].roomName && creep.pos.roomName == destinationPaths.path[(creep.memory.movecc.pos - 1)].roomName){creep.memory.movecc.pos--;}
	
	if(!(this.samePos(creep.pos, destinationPaths.path[creep.memory.movecc.pos]))) /* we are not on track for some reason*/
	{
	    creep.say('OffTrack');
	    var troomPos = destinationPaths.path[creep.memory.movecc.pos];
	    troomPos = new RoomPosition(troomPos.x, troomPos.y, troomPos.roomName );
	    return creep.travelTo(troomPos);}
	
	/*we are on track, continue */
	else { creep.say('OnTrack'); return creep.move(destinationPaths.dpathFrom[creep.memory.movecc.pos--]); }

	}
	
	static CalcPath(startPos, destinationPos, options){
		var destinationPaths = {path: [], pathTo: [], dpathTo: [], pathFrom: [], dpathFrom: [] }

	   if(!options.minDistance){options.minDistance = 1;}/*default distance from ending point to arrive*/
	   if(!options.startDistance){options.startDistance = 3;} /*default distance from starting point to leave */
	   const searchprog = roomCallBack;
	   if(!options.searchParams){options.searchParams = {plainCost: 2, swampCost:10, maxOps: 5000, roomCallback: function(roomName){
             var room = Game.rooms[roomName];
        if(!room) return;
        var costs = new PathFinder.CostMatrix;
        room.find(FIND_STRUCTURES).forEach(function(struct){
            if(struct.structureType == STRUCTURE_ROAD){
                costs.set(struct.pos.x, struct.pos.y, 1);}
                else if (struct.structureType !== STRUCTURE_CONTAINER &&
                (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 0xff);
                }
        });
        return costs;
        }}}
	   /*add options for a pathfinder that will prefer plains over roads (empty transports dont need to abuse roads to move 1 space per tick)*/
	   Memory.temp2 = searchprog;
	   Memory.temp3 = options.searchParams;
	   var calcPath = PathFinder.search(startPos, destinationPos, options.searchParams);
	   
	   if(calcPath.path.length > 10) {calcPath = calcPath.path.slice(0, (calcPath.path.length - options.minDistance));
	   calcPath = calcPath.slice(options.startDistance, calcPath.length); /* start the path X distance from original starting destination */ 
	   }
	   else{ 
	       calcPath = calcPath.path; 
	   }
	   
		
	    /*calcPath = calcPath.path;*/
	    /*console.log(JSON.stringify(calcPath));*/
	    
		/*Memory.temp2 = calcPath;*/
		/*for(var pos = 0; pos < calcPath.length; pos++){ /* cut off the front part of the path, until the edge of the room */
			/*if(calcPath[pos].roomName != calcPath[pos+1].roomName){ 
			var start = 0;
			if(pos > 1){start = pos-2;}else{start = pos;} /* we do this to have the start of the cached path at the edge of the room*/
			/*calcPath = calcPath.slice(start, calcPath.length)  
			break; 
			}
		};*/
		
		
		/*Memory.temp3 = calcPath;*/
		destinationPaths.path = calcPath;
		
		/* forward */
		for(var pos = 0; pos < calcPath.length-1; pos++){
			const cpos = calcPath[pos];
			/*if((cpos.x == 49 || cpos.x == 0 || cpos.y == 0 || cpos.y == 49) && cpos.roomName != calcPath[pos+1].roomName ){
				continue;				
			}else{*/ destinationPaths.dpathTo.push(cpos.getDirectionTo(calcPath[pos+1])); /*}*/
		}
		
		
		/* backwards */
		for(var pos = calcPath.length-1; pos > 0 ; pos--){
			const cpos = calcPath[pos];
			/*if((cpos.x == 49 || cpos.x == 0 || cpos.y == 0 || cpos.y == 49) && cpos.roomName != calcPath[pos-1].roomName ){
				continue;				
			}else{*/ destinationPaths.dpathFrom.unshift(cpos.getDirectionTo(calcPath[pos-1])); /*}*/
		}
		
		/*Memory.temp4 = destinationPaths;*/
		
		return destinationPaths;
		
	    
	}
	
	
    /**
     * make position objects consistent so that either can be used as an argument
     * @param destination
     * @returns {any}
     */
    static normalizePos(destination) {
        if (!(destination instanceof RoomPosition)) {
            return destination.pos;
        }
        return destination;
    }
    /**
     * check if a position is an exit
     * @param pos
     * @returns {boolean}
     */
    static isExit(pos) {
        return pos.x === 0 || pos.y === 0 || pos.x === 49 || pos.y === 49;
    }
    /**
     * check two coordinates match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
    static sameCoord(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }
    /**
     * check if two positions match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
    static samePos(pos1, pos2) {
        return this.sameCoord(pos1, pos2) && pos1.roomName === pos2.roomName;
    }
   
    
    
    static isStuck(creep, state) {
        let stuck = false;
        if (state.lastCoord !== undefined) {
            if (this.sameCoord(creep.pos, state.lastCoord)) {
                // didn't move
                stuck = true;
            }
            else if (this.isExit(creep.pos) && this.isExit(state.lastCoord)) {
                // moved against exit
                stuck = true;
            }
        }
        return stuck;
    }
    
   /*static roomCallBack(){
        const searchParams =  function(roomName){
             var room = Game.rooms[roomName];
        if(!room) return;
        var costs = new Pathfinder.CostMatrix;
        room.find(FIND_STRUCTURES).forEach(function(struct){
            if(struct.structureType == STRUCTURE_ROAD){
                costs.set(struct.pos.x, struct.pos.y, 1);}
                else if (struct.structureType !== STRUCTURE_CONTAINER &&
                (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 0xff);
                }
        });
        return costs;
        };
        return searchParams;
    }*/
}

exports.Movecc = Movecc;
// this might be higher than you wish, setting it lower is a great way to diagnose creep behavior issues. When creeps
// need to repath to often or they aren't finding valid paths, it can sometimes point to problems elsewhere in your code
const DEFAULT_STUCK_VALUE = 2;
const roomCallBack = function(roomName){
             var room = Game.rooms[roomName];
        if(!room) return;
        var costs = new PathFinder.CostMatrix;
        room.find(FIND_STRUCTURES).forEach(function(struct){
            if(struct.structureType == STRUCTURE_ROAD){
                costs.set(struct.pos.x, struct.pos.y, 1);}
                else if (struct.structureType !== STRUCTURE_CONTAINER &&
                (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 0xff);
                }
        });
        return costs;
        };
// assigns a function to Creep.prototype: creep.moveccTo(destination)
/*Creep.prototype.moveccTo = function (destination, options) {
    return Movecc.moveccTo(this, destination, options);
};*/