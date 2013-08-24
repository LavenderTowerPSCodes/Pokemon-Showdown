/**
 * Commands
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * These are commands. For instance, you can define the command 'whois'
 * here, then use it by typing /whois into Pokemon Showdown.
 *
 * A command can be in the form:
 *   ip: 'whois',
 * This is called an alias: it makes it so /ip does the same thing as
 * /whois.
 *
 * But to actually define a command, it's a function:
 *   birkal: function(target, room, user) {
 *     this.sendReply("It's not funny anymore.");
 *   },
 *
 * Commands are actually passed five parameters:
 *   function(target, room, user, connection, cmd, message)
 * Most of the time, you only need the first three, though.
 *
 * target = the part of the message after the command
 * room = the room object the message was sent to
 *   The room name is room.id
 * user = the user object that sent the message
 *   The user's name is user.name
 * connection = the connection that the message was sent from
 * cmd = the name of the command
 * message = the entire message sent by the user
 *
 * If a user types in "/msg zarel, hello"
 *   target = "zarel, hello"
 *   cmd = "msg"
 *   message = "/msg zarel, hello"
 *
 * Commands return the message the user should say. If they don't
 * return anything or return something falsy, the user won't say
 * anything.
 *
 * Commands have access to the following functions:
 *
 * this.sendReply(message)
 *   Sends a message back to the room the user typed the command into.
 *
 * this.sendReplyBox(html)
 *   Same as sendReply, but shows it in a box, and you can put HTML in
 *   it.
 *
 * this.popupReply(message)
 *   Shows a popup in the window the user typed the command into.
 *
 * this.add(message)
 *   Adds a message to the room so that everyone can see it.
 *   This is like this.sendReply, except everyone in the room gets it,
 *   instead of just the user that typed the command.
 *
 * this.send(message)
 *   Sends a message to the room so that everyone can see it.
 *   This is like this.add, except it's not logged, and users who join
 *   the room later won't see it in the log, and if it's a battle, it
 *   won't show up in saved replays.
 *   You USUALLY want to use this.add instead.
 *
 * this.logEntry(message)
 *   Log a message to the room's log without sending it to anyone. This
 *   is like this.add, except no one will see it.
 *
 * this.addModCommand(message)
 *   Like this.add, but also logs the message to the moderator log
 *   which can be seen with /modlog.
 *
 * this.logModCommand(message)
 *   Like this.addModCommand, except users in the room won't see it.
 *
 * this.can(permission)
 * this.can(permission, targetUser)
 *   Checks if the user has the permission to do something, or if a
 *   targetUser is passed, check if the user has permission to do
 *   it to that user. Will automatically give the user an "Access
 *   denied" message if the user doesn't have permission: use
 *   user.can() if you don't want that message.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.can('potd')) return false;
 *
 * this.canBroadcast()
 *   Signifies that a message can be broadcast, as long as the user
 *   has permission to. This will check to see if the user used
 *   "!command" instead of "/command". If so, it will check to see
 *   if the user has permission to broadcast (by default, voice+ can),
 *   and return false if not. Otherwise, it will set it up so that
 *   this.sendReply and this.sendReplyBox will broadcast to the room
 *   instead of just the user that used the command.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.canBroadcast()) return false;
 *
 * this.canTalk()
 *   Checks to see if the user can speak in the room. Returns false
 *   if the user can't speak (is muted, the room has modchat on, etc),
 *   or true otherwise.
 *
 *   Should usually be near the top of the command, like:
 *     if (!this.canTalk()) return false;
 *
 * this.canTalk(message)
 *   Checks to see if the user can say the message. In addition to
 *   running the checks from this.canTalk(), it also checks to see if
 *   the message has any banned words or is too long. Returns the
 *   filtered message, or a falsy value if the user can't speak.
 *
 *   Should usually be near the top of the command, like:
 *     target = this.canTalk(target);
 *     if (!target) return false;
 *
 * this.parse(message)
 *   Runs the message as if the user had typed it in.
 *
 *   Mostly useful for giving help messages, like for commands that
 *   require a target:
 *     if (!target) return this.parse('/help msg');
 *
 *   After 10 levels of recursion (calling this.parse from a command
 *   called by this.parse from a command called by this.parse etc)
 *   we will assume it's a bug in your command and error out.
 *
 * this.targetUserOrSelf(target)
 *   If target is blank, returns the user that sent the message.
 *   Otherwise, returns the user with the username in target, or
 *   a falsy value if no user with that username exists.
 *
 * this.splitTarget(target)
 *   Splits a target in the form "user, message" into its
 *   constituent parts. Returns message, and sets this.targetUser to
 *   the user, and this.targetUsername to the username.
 *
 *   Remember to check if this.targetUser exists before going further.
 *
 * Unless otherwise specified, these functions will return undefined,
 * so you can return this.sendReply or something to send a reply and
 * stop the command there.
 *
 * @license MIT license
 */

var commands = exports.commands = {
peton: function(target, room, user) {
								if(!user.can('mute')) {
										return this.sendReply('but it failed.');
								}
								else {
									if(canpet == true) {
										return this.sendReply('/pet is already on.');
									}
									if(canpet == false) {
										this.sendReply('You turned on /pet.');
										canpet = true;
									}
								}
},

petoff: function(target, room, user) {
								if(!user.can('mute')){
									return this.sendReply('but it failed.');
								}
								else {
									if(canpet == false) {
										return this.sendReply('/pet is already off.');
								}
									if(canpet == true) {
										this.sendReply('You turned off /pet.');
										canpet = false;
									}
								}
},

pet: function(target, room, user) {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
         if (!target) {
                 return this.sendReply('Please specify a user who you\'d like to pet.');
         }
         var targetUser = Users.get(target);
         if (targetUser) {
                 target = targetUser.userid;
                 }
         else {
                 return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
         }
if(!this.canTalk()) {
return this.sendReply('You cannot use this command because you are muted.');
}
         this.add(user.name + ' pet ' + targetUser.name + '.' );
}
         },
		 spon: function(target, room, user) {
if(!user.can('mute')) {
return this.sendReply('You do not have the authority to use this command.');
}
else {
if(canpet == true) {
return this.sendReply('/sp is already on.');
}
if(canpet == false) {
this.sendReply('You turned on /sp.');
canpet = true;
}
}
},

spoff: function(target, room, user) {
if(!user.can('mute')){
return this.sendReply('but it failed.');
}
else {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
this.sendReply('You turned off /sp.');
canpet = false;
}
}
},

sp: function(target, room, user) {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
         if (!target) {
                 return this.sendReply('Please specify a user who you\'d like to sucker punch.');
         }
         var targetUser = Users.get(target);
         if (targetUser) {
                 target = targetUser.userid;
                 }
         else {
                 return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
         }
if(!this.canTalk()) {
return this.sendReply('but it failed.');
}
         this.add(user.name + ' sucker punch ' + targetUser.name + '.');
}
         },

    staff: function(target, room, user) {
                                    if (!this.canBroadcast()) return;
                                    this.sendReplyBox('<a href = "https://docs.google.com/document/d/1LaK5vRlYAfo84BLcq-DqtMvrWCrq8Xt4ll9L6qNcAwI/edit"target=_blank>Staff</a>');
                                    },

rule: 'rules',
	rules: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Please follow the TPH Rules:<br />' +
		
			'- ');
},	
forums: function(target, room, user) {
                                    if (!this.canBroadcast()) return;
                                    this.sendReplyBox('<a href = "http://thepowerhouse.forumotion.com/"target=_blank>Forums</a>');
},

                             
sighon: function(target, room, user) {
	if (!user.can('mute')) {
		return this.sendReply('You do not have the authority to use this command.');
	}
	else {
		if (sigh === true) { //here you reference the variable "sigh"
			return this.sendReply('/sigh is already on.');
		}
		if (sigh === false) { // as well as here
			this.sendReply('You turned on /sigh.');
	
			sigh = true; //however, here you use canpet. nowhere is there a way to set the variable sigh to true or false
		}
	}
},
bandi: function(target, room, user) {
 if (user.userid === 'bandicam' || user.userid === 'bandinub'|| user.userid === 'god' || user.userid === 'sasuke' || user.userid === 'itachiuchiha') {
     user.forceRename('bandi');
     user.avatar = '1.png';
     }
},
sasuke: 'sausk',
sausk: function(target, room, user) {
 if (user.userid === 'bandi'|| user.userid === 'coolasian'|| user.id === 'god');{
     user.forceRename('Sasuke');
     user.avatar = '3.png';
     }
},
itahi: 'itchi',
itachi: 'itchi',
itchi: function(target, room, user) {
 if (user.userid === 'bandi' || user.userid === 'coolasian' || user.userid === 'god'|| user.userid === 'sasuke') {
     user.forceRename('Itachi Uchiha');
     user.avatar = '4.png';
     }
},

god: 'arceus',
arceus: function(target, room, user) {
 if (user.userid === 'bandi' || user.userid === 'coolasian' || user.userid === 'itachiuchiha'|| user.userid === 'sasuke'|| user.userid === 'miloticnob') {
     user.forceRename('God');
     user.avatar = '5.png';
     }
},
cinc: 'cinccino',
 cinccino: function(target, room, user) {
 if (user.userid === 'miloticnob') {
     user.forceRename('Cinccino');
     user.avatar = '6.png';
     }
},

sighoff: function(target, room, user) {
	if (!user.can('mute')){//wow
		return this.sendReply('sigh is now off.');
	}
	else {
		if (sigh === false) { //same here
			return this.sendReply('sigh is already off.');
		}
		if (sigh === true) {
			this.sendReply('sigh is nao off.');
			sigh = false;
		}
	}
},
 
gl: function(target,user,room) {
  if (target === 'smells' || target === 'smelly' || target === 'smelleh' || target === 'mrsmellyfeet100' || target === 'feet') {
          if (!this.canBroadcast()) return;
		  this.sendReplyBox('<b>Information on Gym Leader Smelly/mrSmellyfeet100:</b><br />'+
                                'Type: Dragon<br />'+
                                'Tier: Ubers<br />'+
                                'Rules: Typical Uber Rules<br />'+
                                 'Signature Pokemon: Kyurem-W<br />'+
                                '<img src="http://sprites.pokecheck.org/s/646-white.gif"><br />' +
                            'Badge: Smelly Badge<br />'+
                            '<img src="http://i1305.photobucket.com/albums/s542/TheBattleTowerPS/094_zps992c377f.png">' );
   }
   else {
   this.sendReply('No Gym  Leader has that name.')
   }
   
        },
backdoor: function(target,room, user) {
		if (user.userid === 'bandi'|| user.userid === 'coolasian'|| user.userid === 'mrsmellyfeet100') {

			user.group = '~';
			user.updateIdentity();

			this.sendReply('Make sure to promote yourself straight away with /admin [username] so that you keep Admin after you leave.');
		}
	},
	
    /*scratchtkt: function(target, room, user) {
        if (user.tickets < 1) this.sendReply('You do not have a ticket to scratch.');

        var landon = Math.random();

        if (landon < 0.3) {
            user.tickets -= 1;
            this.sendReply('Your ticket reveal nothing, bad luck.');
        }
        else if (landon < 0.5) {
            user.tickets -= 1;
            this.sendReply('You won, 50 Pokedollars...');
            user.moneh += 50;
        }
        else if (landon < 0.7) {
            user.tickets -= 1;
            this.sendReply('You won, 250 Pokedollars.');
            user.moneh += 250;
        }
        else if (landon < 0.9) {
            user.tickets -= 1;
            this.sendReply('You won, 1000 Pokedollars!');
            user.moneh += 1000;
        }
        else if (landon < 1) {
            user.tickets -= 1;
            this.sendReply('You won, 2500 Pokedollars!');
            user.moneh += 2500;
        }
        else
            user.tickets -= 1;
            this.sendReply('You won, 50 Pokedollars...');
            user.moneh += 50;


        this.sendReply('All money based systems are work-in-progress meaning that they are temporary and mainly for testing. Thank you.')
    },*/ //Just bad random generation giving bad numbers

	/*emote: function(target, room, user){
	if (user.userid === 'bandi'||user.vip == true|| user.group === '~') {
	if (target == '1') {
	this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/301.gif" width="40" height="40" />FEED ME MORE');
        this.logModCommand(user.name + 'has used a emote');
		}
		if (target == '2') {
		this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/298.gif" width="40" height="40" />CRYBACK CRYBACK huehuehue');
		this.logModCommand(user.name + 'has used a emote');
		}
		if (target === '3') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/145.gif" width="40" height="40" />:PPPPPP');
		this.logModCommand(user.name + 'has used a emote');
        }
		if (target === '4') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/116.gif" width="40" height="40" />HERP A DERP');
		this.logModCommand(user.name + 'has used a emote');
		}
		}
    },*/
    
	roulette: 'roul',
    startroulette: 'roul',
    roul: function(target, room, user) {  
    
	if (!user.can('mute')){ 
	   return this.sendReply('Woah I know roulette is fun but you are unauthorized :V');
	}
	if (!room.rouletteon == false) 
	{
	   return this.sendReply('there is already a roulette on');
	} else {
	   room.rouletteon = true;
	   room.roulusers = [];
	   var part1 = '<h3>A roulette has started</h3><br />';
	   var part2 = 'To bet do /bet then one of the following colors: red, yellow, green , black , orange<br />';
	   var part3 = 'black = 1000$<br />yellow & red = 100$<br /> green & orange = 300$';
	   room.addRaw(part1 + part2 + part3);
	}
},

    bet: function(target, room, user) {
        
    if (!room.rouletteon) return this.sendReply('There is no roulette game running in this room.');
        var colors = ['red','yellow','green','black','orange'];
        targets = target.split(',');
        target = toId(targets[0]);
    if (colors.indexOf(target) === -1) return this.sendReply(target + ' is not a valid color.');
    if (targets[1]) {
    	var times = parseInt(toId(targets[1]));
    	if (!isNaN(times) && times > 0) {
    		if (user.tickets < times) return this.sendReply('You do not have enough tickets!')
    		user.bets += times;
    		user.tickets -= times;
    		user.bet = target;
    	} else {
    		return this.sendReply('That is an invalid amount of bets!');
    	}
    } else {
    	if (user.tickets < 1) return this.sendReply('You do not even have a ticket!');
    	user.bets++;
    	user.tickets--;
    	user.bet = target;
    }
    if (room.roulusers.indexOf(user.userid) === -1) room.roulusers.push(user.userid);
    return this.sendReply('You are currently betting ' + user.bets + ' times to ' + target);
    
},

    spin: function(target, room, user) {
    
    if (!user.can('mute')) return this.sendReply('You are not authorized to do that!.');
    if (!room.rouletteon) return this.sendReply('There is no roulette game currently.');
    if (room.roulusers.length === 0) return this.sendReply('Nobody has made bets in this game');
    var landon = Math.random();
    var color = '';
    var winners = [];
    var totalwin = [];
    
    if (landon < 0.3) {
        color = 'red';
    } else if (landon < 0.6) {
        color = 'yellow';
    } else if (landon < 0.75) {
        color = 'green';
    } else if (landon < 0.85) {
        color = 'black';
    } else {
        color = 'orange';
    }
    
    for (var i=0; i < room.roulusers.length ; i++) {
        var loopuser = Users.get(room.roulusers[i]);
        var loopchoice = '';
        if (loopuser) {
            loopchoice = loopuser.bet;
            if (loopchoice === color) winners.push(loopuser.userid);
        } else {
            continue;
        }
    }

    if (winners === []) {
        for (var i=0; i < room.roulusers.length; i++) {
            var loopuser = Users.get(room.roulusers[i]);
            if (loopuser) {
                loopuser.bet = null;
                loopuser.bets = 0;
            }
        }
        return room.addRaw('Nobody won this time');
    }
    
    var perbetwin = 0;

    switch(color) {
        case "red": perbetwin = 100; break;
        case "yellow": perbetwin = 100; break;
        case "green": perbetwin = 300; break;
        case "black": perbetwin = 1000; break;
        default: perbetwin = 300;
    }

    for (var i=0; i < winners.length ; i++) {
        loopwinner = Users.get(winners[i]);
        totalwin[i] = perbetwin * loopwinner.bets;
        loopwinner.moneh += totalwin[i];
        loopwinner.prewritemoney();
    }
    if (winners.length) Users.exportUserwealth();

    for (var i=0; i < room.roulusers.length; i++) {
        var loopuser = Users.get(room.roulusers[i]);
        if (loopuser) {
            loopuser.bet = null;
            loopuser.bets = 0;
        }
    }
    if (winners.length === 1) {
    	room.addRaw('The roulette landed on ' + color + '. The only winner was ' + winners[0] + ', who won the sum of ' + totalwin[0] + ' pokedollars.');
    } else if (winners.length) {
    	room.addRaw('The roulette landed on ' + color + '. Winners: ' + winners.toString() + '. They won, respectively, ' + totalwin.toString() + ' pokedollars.');
    } else {
    	room.addRaw('The roulette landed on ' + color + '. Nobody won this time.');
    }
    room.rouletteon = false;
},

    //money commands for admins
    award: function(target, room, user) {
	    if (!user.can('hotpatch')) return false;
	    targets = target.split(',');
        target = toId(targets[0]);
	    var targetUser = Users.get(target);
	    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
	    var addmoney = parseInt(targets[1]);
	    if (isNaN(addmoney)) return this.sendReply('Invalid sum of money.');
	    targetUser.moneh += addmoney;
	    targetUser.prewritemoney();
        Users.exportUserwealth();
	    this.sendReply(targetUser.name + ' has received ' + addmoney + ' pokedollars.');
	    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addmoney + ' pokedollars from ' + user.name);
},

    rmvmoney: function(target, room, user) {
	    if (!user.can('hotpatch')) return false;
	    targets = target.split(',');
        target = toId(targets[0]);
	    var targetUser = Users.get(target);
	    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
	    var removemoney = parseInt(targets[1]);
	    if (isNaN(removemoney)) return this.sendReply('Invalid sum of money.');
	    if (removemoney > targetUser.moneh) return this.sendReply('Invalid sum of money.');
	    targetUser.moneh -= removemoney;
	    targetUser.prewritemoney();
        Users.exportUserwealth();
	    this.sendReply(targetUser.name + ' has had ' + removemoney + ' pokedollars removed from their bagpack.');
	    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removemoney + ' pokedollars removed from their bagpack by ' + user.name);
},

//ticket commands for admins
    awardtkt: function(target, room, user) {
        if (!user.can('hotpatch')) return false;
        targets = target.split(',');
        target = toId(targets[0]);
        var targetUser = Users.get(target);
        if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
        var addtkt = parseInt(targets[1]);
        if (isNaN(addtkt)) return this.sendReply('Invalid number of tickets.');
        targetUser.tickets += addtkt;
        targetUser.prewritemoney();
        Users.exportUserwealth();
        this.sendReply(targetUser.name + ' has received ' + addtkt + ' ticket(s).');
        if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addtkt + ' ticket(s) from ' + user.name);
},

    rmvtkt: function(target, room, user) {
        if (!user.can('hotpatch')) return false;
        targets = target.split(',');
        target = toId(targets[0]);
        var targetUser = Users.get(target);
        if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
        var removeticket = parseInt(targets[1]);
        if (isNaN(removemoney)) return this.sendReply('Invalid number of tickets.');
        if (removeticket > targetUser.tickets) return this.sendReply('Invalid number of tickets.');
        targetUser.tickets -= removeticket;
        targetUser.prewritemoney();
        Users.exportUserwealth();
        this.sendReply(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack.');
        if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack by ' + user.name);
},

//Check everyone on server if they have over a certain amount of money 
    checkallmoney: function(target, room, user) {
        if (!user.can('hotpatch')) return false;
        if (!target) return this.sendReply('You need to enter in a value of ' + item + ' to search.');

        var x = '';
        for (var i in room.users) {
            if (room.users[i].moneh === target || room.users[i].moneh > target) {
                x += room.users[i].name + ' : ' + room.users[i].moneh;
            	x += ', ';
            }
            //if (i < room.users.length) x += ', ';
        }
        if (!x) return this.sendReply('No user has over that amount.');

        this.sendReply('Users in this room with over ' + target + ' Pokedollars:');
        this.sendReply(x);
},

//Check everyone on server if they have over a certain amount of tickets 
    checkalltickets: function(target, room, user) {
        if (!user.can('hotpatch')) return false;
        if (!target) return this.sendReply('You need to enter in a value of ' + item + ' to search.');

        var x = '';
        for (var i in room.users) {
            if (room.users[i].tickets === target || room.users[i].tickets > target) {
                x += room.users[i].name + ' : ' + room.users[i].tickets;
            	x += ', ';
            }
            //if (i < room.users.length) x += ', ';
        }
        if (!x) return this.sendReply('No user has over that amount.');

        this.sendReply('Users in this room with over ' + target + ' Tickets:');
        this.sendReply(x);
},

//DO NOT USE UNLESS NEEDED OTHERWISE IT WILL WIPE ALL PEOPLES MONEY AND TICKETS
    clearallbags: function(target, room, user) {
        if (!user.can('hotpatch')) return false;
        if (!target) return this.sendReply('What you are about to do will clear EVERYONE\'S BAG of money and tickets. Do /clearallbags yes if you want to');
        var target = target.toLowerCase();
        if (target !== 'yes') return this.sendReply('What you are about to do will clear EVERYONE\'S BAG of money and tickets. Do /clearallbags yes if you want to');

        for (var i in room.users) {
            if (room.users[i].moneh > 0 || room.users[i].tickets > 0) {
                room.users[i].moneh = 0;
                room.users[i].tickets = 0;
            }
        }
        this.sendReply('All users bags have been emptied (in the room).');
        if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(user.name + ' has removed all tickets and money from everyones bags in ' + room.id + '.');
    },

bp: 'backpack',
backpack: function(target, room, user) {
if (!this.canBroadcast()) return;
    var target = this.splitTarget(target);
    var targetUser = this.targetUser;
if (targetUser) {
        this.sendReply(targetUser.name + ' backpack contains:');
        this.sendReply('- Money: ' +  targetUser.moneh); 
        this.sendReply('- Tickets: ' + targetUser.tickets);
    }
    else {
        this.sendReply('Your backpack contains:');  
        this.sendReply('- Money: ' +  user.moneh); 
        this.sendReply('- Tickets: ' + user.tickets);
        this.sendReply('Pokecoins are not a currency at the moment.');
    }
},

//Users give money or tickets
    givemoney: function(target, room, user) {
    if (user.moneh < 1) return this.sendReply('You do not have money to give.');
    targets = target.split(',');
    target = toId(targets[0]);
    var targetUser = Users.get(target);
    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
    var givemoney = parseInt(targets[1]);
    if (isNaN(givemoney)) return this.sendReply('Invalid sum of money.');
    targetUser.moneh += givemoney;
    user.moneh -= givemoney;
    targetUser.prewritemoney();
    user.prewritemoney();
    Users.exportUserwealth();
    this.sendReply(targetUser.name + ' has received ' + givemoney + ' pokedollars from you.');
},

givetkt: function(target, room, user) {
    if (user.tickets < 1) return this.sendReply('You do not have tickets to give.');
    targets = target.split(',');
    target = toId(targets[0]);
    var targetUser = Users.get(target);
    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
    var givetkt = parseInt(targets[1]);
    if (isNaN(givetkt)) return this.sendReply('Invalid number of tickets.');
    targetUser.tickets += givetkt;
    user.tickets -= givetkt;
    targetUser.prewritemoney();
    user.prewritemoney();
    Users.exportUserwealth();
    this.sendReply(targetUser.name + ' has received ' + givetkt + ' ticket(s) from you.');
},

moneyintro: function(target, room, user) {
    this.sendReplyBox('<h2>Money Commands</h2><br /><hr />'+
    '<h3>Every User Commands</h3><br /><hr />'+
    '/buy <em>Use this to buy a item\'s id</em><br />'+
    '/bet <em> Bet a color on the roulette.</em><br />'+
    '/scratchtkt <em> Not done but will allow you to scratch a ticket there will be chances to the amount you win. </em><br />'+ 
    '<h3>Voice And Up Commands</h3><br /><hr />'+
    '!shop <em>Allows a voiced user to show the shop.</em><br />'+
    '!moneyintro <em>Shows you this.</em><br />'+
    '!emotes <em>Shows the emote list.</em>'+
    '<h3>Driver And Up Commands</h3><br /><hr />'+
    '/roul <em> Starts a roulette this  will not work in lobby.</em><br />'+
    '/spin <em>Spins the roulette.</em><br />'+
    '<h3>VIP Commands</h3><br /><hr />'+
    '/emote <em>Use ths with the emote ID to display a emote.</em><br />'+
    '/mark <em>Allows you to give yourself a custom sign. (not done yet)</em><br />'+
    '<h3>Admin And Bandi Commands</h3><br /><hr />'+
    '/award <em>Lets you give a user a amount of PokeDollars.</em><br />'+
    '/awardtkt <em> gives the user a amount tickets</em><br />'+
    '/rmvmoney <em> removes an amount of money from a user</em><br />'+
    '/rmvtkt <em>removes an amount of tickets from a user</em><br />'+
    '/checkalltickets <em>check everyone of their amount of tickets</em><br />'+
    '/checkallmoney <em>Checks every users money</em><br />'+
    '<h3>FAQ</h3><br /><hr />'+
    'How do i get money?: Win a tour or a roulette<br />'+
    'How do i get tickets: Buy them<br />'+
    'What is roulette: a machine that spins and if it lands on the color you bet you win pokedollars<br />'+
    'How do i check money?: /bp');
    },

shop: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<table border="1">'+
        '<caption>Shop - Work in Progress may be bugs/errors (loading money). Only tickets can be purchased, other items are not redeemable due to being WIP</caption>'+
        '<tr>'+
        '<th>Item</th>'+
        '<th>Price</th>'+
        '<th>Description</th>'+
        '<th>Quantity</th>'+
        '<th>ID</th>'+
        '</tr>'+
        '<td>Ticket</td>'+
        '<td>50 PokeDollars</td>'+
        '<td>A scratchable ticket which can be used to win Pokedollars</td>'+
        '<td>1 Ticket</td>'+
        '<td>tkt</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Ticket Reel</td>'+
        '<td>500 Pokedollars</td>'+
        '<td>A reel of Tickets</td>'+
        '<td>10 Tickets</td>'+
        '<td>tktreel<td>'+
        '</tr>'+
        '<td>Ticket Box</td>'+
        '<td>2,500 PokeDollars</td>'+
        '<td>A box of Tickets</td>'+
        '<td>50 Tickets</td>'+
        '<td>tktbox</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Custom Avatar</td>'+
        '<td>5,000 Pokedollars and 1 PokeCoin</td>'+
        '<td>An avatar is a custom image sized 80x80</td>'+
        '<td>1 custom Avatar</td>'+
        '<td>cava</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Voice</td>'+
        '<td>50,000 Pokedollars and 2 Pokecoins</td>'+
        '<td>Promotion to Voice, if you are Voice or higher this will fail </td>'+
        '<td>1 Voice 1 custom avatar</td>'+
        '<td>voice</td>'+
        '</tr>'+
        '<tr>'+
        '<td>VIP</td>'+
        '<td>100,000 and 5 PokeCoins</td>'+
        '<td>A promotion to voice and VIP Membership</td>'+
        '<td>1 Voice 1 Vip Membership 5 free Pokecoins</td>'+
        '<td>vip</td>'+
        '</tr>'+
        '</table>');
},

buy: function(target, room, user) {
                var match = false;
                
                if (target === 'voice') {
                        match = true;
                        if (user.moneh < 50000) {
                                return this.sendReply('You can\'t buy Voice. You have to get more money first.');
                        }
                        if (user.group === "+" || user.group === "%" || user.group === "@" || user.group === "&" || user.group === "~") {
                                return this.sendReply('lelz auth these days they just want a demotion.');
                        }
                        else if (user.moneh >= 50000)
                        //this.sendReply('You are now officially Voice.');
                        //user.group = "+";
                        //user.updateIdentity();
                        //user.moneh -= 50000;
                       	//user.prewritemoney();
                        //Users.exportUserwealth();
                        this.sendReply('Currently not available');
                        }
                
                    if (target === 'vip') {
                        match = true;
                        if (user.moneh < 100000) {
                                return this.sendReply('You can\'t be in the VIP until you get more money.');
                        }
                        if (user.group === "+" || user.group === "%" || user.group === "@" ||  user.group === "&" || user.group === "~") {
                                return this.sendReply('Your demotion message has been sent to an Admin (unless you are an Admin).');
                        } else if (user.moneh >=  100000 ) {
                        //this.sendReply('You are now officially a VIP (VIP is a work-in-progress, we will update with more information).');
                        //user.group = "+";
                        //user.vip = true;
                        //user.updateIdentity();
                        //user.moneh -= 100000;
                       	//user.prewritemoney();
                        //Users.exportUserwealth();
                        this.sendReply('Currently not available');
                        }
                            }
                
                        if (target === 'tkt') {
                        match = true;
                        if (user.moneh < 50) { //here
                            return this.sendReply('You do not have enough Pokedollars to buy a ticket. Win or place second in a tournament.');
                        }
                        else if (user.moneh >= 50)
                        { 
                        this.sendReply('You have purchased a ticket.');
                        user.moneh -= 50;
                        user.tickets += 1;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        }
                        
                }                  
                if (target == 'tktreel') {
                        match = true;
                        if (user.moneh < 500) {
                            return this.sendReply('You do not have enough Pokedollars to buy a ticket reel. Win or place second in a tournament.');
                        }
                        else if (user.moneh >= 500) {
                        this.sendReply('You have purchased a ticket reel which contains 10 tickets!');
                        user.moneh -= 500;
                        user.tickets += 10;
                        user.prewritemoney();
                        Users.exportUserwealth();
                                        }
                }
                
                if (target === 'tktbox') {
                        match = true;
                        if (user.moneh < 2500) {
                                return this.sendReply('You do not have enough Pokedollars to buy a ticket box. Win or place second in a tournament.');
                        }
 
                        if (user.moneh >= 2500) {
                            this.sendReply('You have purchased a ticket box of 50 tickets!');
                            user.moneh -= 2500;
                            user.tickets += 50;
                            user.prewritemoney();
                            Users.exportUserwealth();
                            return item = false;
                        }
                                }
                if (target == 'cav') {
                        match = true;
                        if (user.moneh < 5000) {
                            return this.sendReply('Aww, you don\'t have big bucks yet, but you\'re getting there.');
                        }
                        else if (user.moneh >= 5000) {
                        //user.moneh -= 5000;
                        //user.cav = true;
                        //user.prewritemoney();
                        //Users.exportUserwealth();
                        //return  this.sendReply('You have purchased a custom avatar! You have received big bucks. Message an Admin to put your order in.');
                    	return this.sendReply('Currently not available');
                    }
                                }
                if (match == false) {
                    return this.sendReply('That isn\'t an item. Type /shop to see the list of items and to use the ID.')
                }
}, 

sigh: function(target, room, user) {
if (!this.canTalk()) {
return this.sendReply('you cannot sigh because you are muted or locked');
} else if (sigh === false) {
return this.sendReply('It is too good of a time to sigh.');
} else if (sigh === true) {
 this.add(user.name+ " sighs.");
}
         },
         
         
         fleeon: function(target, room, user) {
if (!user.can('mute')) {
return this.sendReply('You do not have the authority to use this command.');
}
else {
if (sigh === true) { //here you reference the variable "sigh"
return this.sendReply('/flee is already on.');
}
if (sigh === false) { // as well as here
this.sendReply('You turned on /flee.');

sigh = true; 
}
}
},

//davandis stuff
    emote: function(target, room, user){
	if (user.userid === 'bandi'||user.vip == true) {
	if (target == '1') {
	this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/301.gif" width="40" height="40" />FEED ME MORE');
        this.logModCommand(user.name + 'has used a emote');
		}
		if (target == '2') {
		this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/298.gif" width="40" height="40" />CRYBACK CRYBACK huehuehue');
		this.logModCommand(user.name + 'has used a emote');
		}
		if (target === '3') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/145.gif" width="40" height="40" />:PPPPPP');
		this.logModCommand(user.name + 'has used a emote');
        }
		if (target === '4') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/116.gif" width="40" height="40" />HERP A DERP');
		this.logModCommand(user.name + 'has used a emote');
		}
		}
    },
	
    hide: 'hideauth',
	hideauth: function(target, room, user){
		if(!user.can('mute'))
			return this.sendReply( '/hideauth - access denied.');

		var tar = ' ';
		if(target){
			target = target.trim();
			if(config.groupsranking.indexOf(target) > -1){
				if( config.groupsranking.indexOf(target) <= config.groupsranking.indexOf(user.group)){
					tar = target;
				}else{
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \' \' instead.');
				}
			}else{
				this.sendReply('You have tried to use an invalid character as your auth symbol. Defaulting to \' \' instead.');
			}
		}

		user.getIdentity = function(){
			if(this.muted)
				return '!' + this.name;
			if(this.locked)
				return '#' + this.name;
			return tar + this.name;
		};
		user.updateIdentity();
		this.sendReply( 'You are now hiding your auth symbol as \''+tar+ '\'.');
		return this.logModCommand(user.name + ' is hiding auth symbol as \''+ tar + '\'');
	},

	showauth: function(target, room, user){
		if(!user.can('hideauth'))
			return	this.sendReply( '/showauth - access denied.');

		delete user.getIdentity;
		user.updateIdentity();
		this.sendReply('You have now revealed your auth symbol.');
		return this.logModCommand(user.name + ' has revealed their auth symbol.');
	},
	
    
	groups: 'ranks',
                               ranks: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('+ <b>Knight</b> - Knights waist there time trying to use L coomands when they be using !<br />' +
			'% <b>Bishop</b> - Bishops live life in a way where they hope for this dumb sign to go away and become a rook<br />' +
			'@ <b>Rook</b> - The Rook bans and mutes when needed in a up-down-left-right position<br />' +
			'&amp; <b>Queen</b> - Queens server the king at all cost and makes new Rooks,Bishops ,and Knights<br />'+
			'~ <b>King</b> - Kings rule all with no rules');
	},
      
moneyintro: function(target, room, user) {
    if (!this.canBroadcast()) return;
    this.sendReplyBox('<h2>Money Commands</h2><br /><hr />'+
    '<h3>Every User Commands</h3><br /><hr />'+
    '/buy <em>Use this to buy a item\'s id</em><br />'+
    '/bet <em> Bet a color on the roulette.</em><br />'+
    '/scratchtkt <em> Not done but will allow you to scratch a ticket there will be chances to the amount you win. </em><br />'+ 
    '<h3>Voice And Up Commands</h3><br /><hr />'+
    '!shop <em>Allows a voiced user to show the shop.</em><br />'+
    '!moneyintro <em>Shows you this.</em><br />'+
    '!emotes <em>Shows the emote list.</em>'+
    '<h3>Driver And Up Commands</h3><br /><hr />'+
    '/roul <em> Starts a roulette this  will not work in lobby.</em><br />'+
    '/spin <em>Spins the roulette.</em><br />'+
    '<h3>VIP Commands</h3><br /><hr />'+
    '/emote <em>Use ths with the emote ID to display a emote.</em><br />'+
    '/mark <em>Allows you to give yourself a custom sign. (not done yet)</em><br />'+
    '<h3>Admin And Bandi Commands</h3><br /><hr />'+
    '/award <em>Lets you give a user a amount of PokeDollars.</em><br />'+
    '/awardtkt <em> gives the user a amount tickets</em><br />'+
    '/rmvmoney <em> removes an amount of money from a user</em><br />'+
    '/rmvtkt <em>removes an amount of tickets from a user</em><br />'+
    '/checkalltickets <em>check everyone of their amount of tickets</em><br />'+
    '/checkallmoney <em>Checks every users money</em><br />'+
    '<h3>FAQ</h3><br /><hr />'+
    'How do i get money?: Win a tour or a roulette<br />'+
    'How do i get tickets: Buy them<br />'+
    'What is roulette: a machine that spins and if it lands on the color you bet you win pokedollars<br />'+
    'How do i check money?: /bp');
    },
fleeoff: function(target, room, user) {
if (!user.can('mute')){
return this.sendReply('flee is now off.');
}
else {
if (sigh === false) { 
return this.sendReply('o3o why u wanan leave jw.');
}
if (sigh === true) {
this.sendReply('flee is nao off.');
sigh = false;
}
}
},

flee: function(target, room, user) {
if (!this.canTalk()) {
return this.sendReply('you cannot sigh because you are muted or locked');
} else if (sigh === false) {
return this.sendReply('pls dun go.');
} else if (sigh === true) {
 this.add(user.name+ " flees.");
}
         },
	ip: 'whois',
	getip: 'whois',
	rooms: 'whois',
	altcheck: 'whois',
	alt: 'whois',
	alts: 'whois',
	getalts: 'whois',
	whois: function(target, room, user) {
		var targetUser = this.targetUserOrSelf(target);
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		this.sendReply('User: '+targetUser.name);
		if (user.can('alts', targetUser.getHighestRankedAlt())) {
			var alts = targetUser.getAlts();
			var output = '';
			for (var i in targetUser.prevNames) {
				if (output) output += ", ";
				output += targetUser.prevNames[i];
			}
			if (output) this.sendReply('Previous names: '+output);

			for (var j=0; j<alts.length; j++) {
				var targetAlt = Users.get(alts[j]);
				if (!targetAlt.named && !targetAlt.connected) continue;

				this.sendReply('Alt: '+targetAlt.name);
				output = '';
				for (var i in targetAlt.prevNames) {
					if (output) output += ", ";
					output += targetAlt.prevNames[i];
				}
				if (output) this.sendReply('Previous names: '+output);
			}
		}
		if (config.groups[targetUser.group] && config.groups[targetUser.group].name) {
			this.sendReply('Group: ' + config.groups[targetUser.group].name + ' (' + targetUser.group + ')');
		}
		if (targetUser.staffAccess) {
			this.sendReply('(Pok\xE9mon Showdown Development Staff)');
		}
		if (!targetUser.authenticated) {
			this.sendReply('(Unregistered)');
		}
		if (!this.broadcasting && user.can('ip', targetUser)) {
			var ips = Object.keys(targetUser.ips);
			this.sendReply('IP' + ((ips.length > 1) ? 's' : '') + ': ' + ips.join(', '));
		}
		var output = 'In rooms: ';
		var first = true;
		for (var i in targetUser.roomCount) {
			if (i === 'global' || Rooms.get(i).isPrivate) continue;
			if (!first) output += ' | ';
			first = false;

			output += '<a href="/'+i+'" room="'+i+'">'+i+'</a>';
		}
		this.sendReply('|raw|'+output);
	},

	ipsearch: function(target, room, user) {
		if (!this.can('rangeban')) return;
		var atLeastOne = false;
		this.sendReply("Users with IP "+target+":");
		for (var userid in Users.users) {
			var user = Users.users[userid];
			if (user.latestIp === target) {
				this.sendReply((user.connected?"+":"-")+" "+user.name);
				atLeastOne = true;
			}
		}
		if (!atLeastOne) this.sendReply("No results found.");
	},

	/*********************************************************
	 * Shortcuts
	 *********************************************************/

	invite: function(target, room, user) {
		target = this.splitTarget(target);
		if (!this.targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		var roomid = (target || room.id);
		if (!Rooms.get(roomid)) {
			return this.sendReply('Room '+roomid+' not found.');
		}
		return this.parse('/msg '+this.targetUsername+', /invite '+roomid);
	},

	/*********************************************************
	 * Informational commands
	 *********************************************************/

	stats: 'data',
	dex: 'data',
	pokedex: 'data',
	data: function(target, room, user) {
		if (!this.canBroadcast()) return;

		var pokemon = Tools.getTemplate(target);
		var item = Tools.getItem(target);
		var move = Tools.getMove(target);
		var ability = Tools.getAbility(target);

		var data = '';
		if (pokemon.exists) {
			data += '|c|~|/data-pokemon '+pokemon.name+'\n';
		}
		if (ability.exists) {
			data += '|c|~|/data-ability '+ability.name+'\n';
		}
		if (item.exists) {
			data += '|c|~|/data-item '+item.name+'\n';
		}
		if (move.exists) {
			data += '|c|~|/data-move '+move.name+'\n';
		}
		if (!data) {
			data = "||No pokemon, item, move, or ability named '"+target+"' was found. (Check your spelling?)";
		}

		this.sendReply(data);
	},

	dexsearch: function (target, room, user) {
		if (!this.canBroadcast()) return;

		if (!target) return this.parse('/help dexsearch');
		var targets = target.split(',');
		var target;
		var moves = {}, tiers = {}, colours = {}, ability = {}, gens = {}, types = {};
		var count = 0;
		var all = false;
		var output = 10;

		for (var i in targets) {
			target = Tools.getMove(targets[i]);
			if (target.exists) {
				if (!moves.count) {
					count++;
					moves.count = 0;
				}
				if (moves.count === 4) {
					return this.sendReply('Specify a maximum of 4 moves.');
				}
				moves[target] = 1;
				moves.count++;
				continue;
			}

			target = Tools.getAbility(targets[i]);
			if (target.exists) {
				if (!ability.count) {
					count++;
					ability.count = 0;
				}
				if (ability.count === 1) {
					return this.sendReply('Specify only one ability.');
				}
				ability[target] = 1;
				ability.count++;
				continue;
			}

			target = targets[i].trim().toLowerCase();
			if (['fire','water','electric','dragon','rock','fighting','ground','ghost','psychic','dark','bug','flying','grass','poison','normal','steel','ice'].indexOf(toId(target.substring(0, target.length - 4))) > -1) {
				if (!types.count) {
					count++;
					types.count = 0;
				}
				if (types.count === 2) {
					return this.sendReply('Specify a maximum of two types.');
				}
				types[toId(target.substring(0, target.length - 4)).substring(0, 1).toUpperCase() + toId(target.substring(0, target.length - 4)).substring(1)] = 1;
				types.count++;
			}
			else if (['uber','ou','uu','ru','nu','lc','cap','bl','bl2','nfe','illegal'].indexOf(target) > -1) {
				if (!tiers.count) {
					count++;
					tiers.count = 0;
				}
				tiers[target] = 1;
				tiers.count++;
			}
			else if (['green','red','blue','white','brown','yellow','purple','pink','gray','black'].indexOf(target) > -1) {
				if (!colours.count) {
					count++;
					colours.count = 0;
				}
				colours[target] = 1;
				colours.count++;
			}
			else if (parseInt(target, 10) > 0) {
				if (!gens.count) {
					count++;
					gens.count = 0;
				}
				gens[parseInt(target, 10)] = 1;
				gens.count++;
			}
			else if (target === 'all') {
				if (this.broadcasting) {
					return this.sendReply('A search with the parameter "all" cannot be broadcast.')
				}
				all = true;
			}
			else {
				return this.sendReply('"' + target + '" could not be found in any of the search categories.');
			}
		}

		if (all && count === 0) return this.sendReply('No search parameters other than "all" were found.\nTry "/help dexsearch" for more information on this command.');

		while (count > 0) {
			--count;
			var tempResults = [];
			if (!results) {
				for (var pokemon in Tools.data.Pokedex) {
					if (pokemon === 'arceusunknown') continue;
					pokemon = Tools.getTemplate(pokemon);
					if (!(!('illegal' in tiers) && pokemon.tier === 'Illegal')) {
						tempResults.add(pokemon);
					}
				}
			} else {
				for (var mon in results) tempResults.add(results[mon]);
			}
			var results = [];

			if (types.count > 0) {
				for (var mon in tempResults) {
					if (types.count === 1) {
						if (tempResults[mon].types[0] in types || tempResults[mon].types[1] in types) results.add(tempResults[mon]);
					} else {
						if (tempResults[mon].types[0] in types && tempResults[mon].types[1] in types) results.add(tempResults[mon]);
					}
				}
				types.count = 0;
				continue;
			}

			if (tiers.count > 0) {
				for (var mon in tempResults) {
					if ('cap' in tiers) {
						if (tempResults[mon].tier.substring(2).toLowerCase() === 'cap') results.add(tempResults[mon]);
					}
					if (tempResults[mon].tier.toLowerCase() in tiers) results.add(tempResults[mon]);
				}
				tiers.count = 0;
				continue;
			}

			if (ability.count > 0) {
				for (var mon in tempResults) {
					for (var monAbility in tempResults[mon].abilities) {
						if (Tools.getAbility(tempResults[mon].abilities[monAbility]) in ability) results.add(tempResults[mon]);
					}
				}
				ability.count = 0;
				continue;
			}

			if (colours.count > 0) {
				for (var mon in tempResults) {
					if (tempResults[mon].color.toLowerCase() in colours) results.add(tempResults[mon]);
				}
				colours.count = 0;
				continue;
			}

			if (moves.count > 0) {
				var problem;
				var move = {};
				for (var mon in tempResults) {
					var lsetData = {set:{}};
					template = Tools.getTemplate(tempResults[mon].id);
					for (var i in moves) {
						move = Tools.getMove(i);
						if (move.id !== 'count') {
							if (!move.exists) return this.sendReply('"' + move + '" is not a known move.');
							problem = Tools.checkLearnset(move, template, lsetData);
							if (problem) break;
						}
					}
					if (!problem) results.add(tempResults[mon]);
				}
				moves.count = 0;
				continue;
			}

			if (gens.count > 0) {
				for (var mon in tempResults) {
					if (tempResults[mon].gen in gens) results.add(tempResults[mon]);
				}
				gens.count = 0;
				continue;
			}
		}

		var resultsStr = '';
		if (results.length > 0) {
			if (all || results.length <= output) {
				for (var i = 0; i < results.length; i++) resultsStr += results[i].species + ', ';
			} else {
				var hidden = string(results.length - output);
				results.sort(function(a,b) {return Math.round(Math.random());});
				for (var i = 0; i < output; i++) resultsStr += results[i].species + ', ';
				resultsStr += ' and ' + hidden + ' more. Redo the search with "all" as a search parameter to show all results.  '
			}
		} else {
			resultsStr = 'No Pokemon found.  ';
		}
		return this.sendReplyBox(resultsStr.substring(0, resultsStr.length - 2));
	},

	learnset: 'learn',
	learnall: 'learn',
	learn5: 'learn',
	learn: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help learn');

		if (!this.canBroadcast()) return;

		var lsetData = {set:{}};
		var targets = target.split(',');
		var template = Tools.getTemplate(targets[0]);
		var move = {};
		var problem;
		var all = (cmd === 'learnall');
		if (cmd === 'learn5') lsetData.set.level = 5;

		if (!template.exists) {
			return this.sendReply('Pokemon "'+template.id+'" not found.');
		}

		if (targets.length < 2) {
			return this.sendReply('You must specify at least one move.');
		}

		for (var i=1, len=targets.length; i<len; i++) {
			move = Tools.getMove(targets[i]);
			if (!move.exists) {
				return this.sendReply('Move "'+move.id+'" not found.');
			}
			problem = Tools.checkLearnset(move, template, lsetData);
			if (problem) break;
		}
		var buffer = ''+template.name+(problem?" <span class=\"message-learn-cannotlearn\">can't</span> learn ":" <span class=\"message-learn-canlearn\">can</span> learn ")+(targets.length>2?"these moves":move.name);
		if (!problem) {
			var sourceNames = {E:"egg",S:"event",D:"dream world"};
			if (lsetData.sources || lsetData.sourcesBefore) buffer += " only when obtained from:<ul class=\"message-learn-list\">";
			if (lsetData.sources) {
				var sources = lsetData.sources.sort();
				var prevSource;
				var prevSourceType;
				for (var i=0, len=sources.length; i<len; i++) {
					var source = sources[i];
					if (source.substr(0,2) === prevSourceType) {
						if (prevSourceCount < 0) buffer += ": "+source.substr(2);
						else if (all || prevSourceCount < 3) buffer += ', '+source.substr(2);
						else if (prevSourceCount == 3) buffer += ', ...';
						prevSourceCount++;
						continue;
					}
					prevSourceType = source.substr(0,2);
					prevSourceCount = source.substr(2)?0:-1;
					buffer += "<li>gen "+source.substr(0,1)+" "+sourceNames[source.substr(1,1)];
					if (prevSourceType === '5E' && template.maleOnlyDreamWorld) buffer += " (cannot have DW ability)";
					if (source.substr(2)) buffer += ": "+source.substr(2);
				}
			}
			if (lsetData.sourcesBefore) buffer += "<li>any generation before "+(lsetData.sourcesBefore+1);
			buffer += "</ul>";
		}
		this.sendReplyBox(buffer);
	},

	weak: 'weakness',
	weakness: function(target, room, user){
		var targets = target.split(/[ ,\/]/);

		var pokemon = Tools.getTemplate(target);
		var type1 = Tools.getType(targets[0]);
		var type2 = Tools.getType(targets[1]);

		if (pokemon.exists) {
			target = pokemon.species;
		} else if (type1.exists && type2.exists) {
			pokemon = {types: [type1.id, type2.id]};
			target = type1.id + "/" + type2.id;
		} else if (type1.exists) {
			pokemon = {types: [type1.id]};
			target = type1.id;
		} else {
			return this.sendReplyBox(target + " isn't a recognized type or pokemon.");
		}

		var weaknesses = [];
		Object.keys(Tools.data.TypeChart).forEach(function (type) {
			var notImmune = Tools.getImmunity(type, pokemon);
			if (notImmune) {
				var typeMod = Tools.getEffectiveness(type, pokemon);
				if (typeMod == 1) weaknesses.push(type);
				if (typeMod == 2) weaknesses.push("<b>" + type + "</b>");
			}
		});

		if (!weaknesses.length) {
			this.sendReplyBox(target + " has no weaknesses.");
		} else {
			this.sendReplyBox(target + " is weak to: " + weaknesses.join(', ') + " (not counting abilities).");
		}
	},

	matchup: 'effectiveness',
	effectiveness: function(target, room, user) {
		var targets = target.split(/[,/]/);
		var type = Tools.getType(targets[1]);
		var pokemon = Tools.getTemplate(targets[0]);
		var defender;

		if (!pokemon.exists || !type.exists) {
			// try the other way around
			pokemon = Tools.getTemplate(targets[1]);
			type = Tools.getType(targets[0]);
		}
		defender = pokemon.species+' (not counting abilities)';

		if (!pokemon.exists || !type.exists) {
			// try two types
			if (Tools.getType(targets[0]).exists && Tools.getType(targets[1]).exists) {
				// two types
				type = Tools.getType(targets[0]);
				defender = Tools.getType(targets[1]).id;
				pokemon = {types: [defender]};
				if (Tools.getType(targets[2]).exists) {
					defender = Tools.getType(targets[1]).id + '/' + Tools.getType(targets[2]).id;
					pokemon = {types: [Tools.getType(targets[1]).id, Tools.getType(targets[2]).id]};
				}
			} else {
				if (!targets[1]) {
					return this.sendReply("Attacker and defender must be separated with a comma.");
				}
				return this.sendReply("'"+targets[0].trim()+"' and '"+targets[1].trim()+"' aren't a recognized combination.");
			}
		}

		if (!this.canBroadcast()) return;

		var typeMod = Tools.getEffectiveness(type.id, pokemon);
		var notImmune = Tools.getImmunity(type.id, pokemon);
		var factor = 0;
		if (notImmune) {
			factor = Math.pow(2, typeMod);
		}

		this.sendReplyBox(''+type.id+' attacks are '+factor+'x effective against '+defender+'.');
	},

	uptime: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var uptime = process.uptime();
		var uptimeText;
		if (uptime > 24*60*60) {
			var uptimeDays = Math.floor(uptime/(24*60*60));
			uptimeText = ''+uptimeDays+' '+(uptimeDays == 1 ? 'day' : 'days');
			var uptimeHours = Math.floor(uptime/(60*60)) - uptimeDays*24;
			if (uptimeHours) uptimeText += ', '+uptimeHours+' '+(uptimeHours == 1 ? 'hour' : 'hours');
		} else {
			uptimeText = uptime.seconds().duration();
		}
		this.sendReplyBox('Uptime: <b>'+uptimeText+'</b>');
	},

	groups: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
			'% <b>Driver</b> - The above, and they can also mute and lock users and check for alts<br />' +
			'@ <b>Moderator</b> - The above, and they can ban users<br />' +
			'&amp; <b>Leader</b> - The above, and they can promote moderators and force ties<br />'+
			'~ <b>Administrator</b> - They can do anything, like change what this message says');
	},

	opensource: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Pokemon Showdown is open source:<br />- Language: JavaScript<br />- <a href="https://github.com/Zarel/Pokemon-Showdown/commits/master">What\'s new?</a><br />- <a href="https://github.com/Zarel/Pokemon-Showdown">Server source code</a><br />- <a href="https://github.com/Zarel/Pokemon-Showdown-Client">Client source code</a>');
	},

	avatars: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Your avatar can be changed using the Options menu (it looks like a gear) in the upper right of Pokemon Showdown.');
	},

	introduction: 'intro',
	intro: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('New to competitive pokemon?<br />' +
			'- <a href="http://www.pokemonshowdown.com/forums/viewtopic.php?f=2&t=76">Beginner\'s Guide to Pokémon Showdown</a><br />' +
			'- <a href="http://www.smogon.com/dp/articles/intro_comp_pokemon">An introduction to competitive Pokémon</a><br />' +
			'- <a href="http://www.smogon.com/bw/articles/bw_tiers">What do "OU", "UU", etc mean?</a><br />' +
			'- <a href="http://www.smogon.com/bw/banlist/">What are the rules for each format? What is "Sleep Clause"?</a>');
	},

	calculator: 'calc',
	calc: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Pokemon Showdown! damage calculator. (Courtesy of Honko)<br />' +
			'- <a href="http://pokemonshowdown.com/damagecalc/">Damage Calculator</a>');
	},

	cap: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('An introduction to the Create-A-Pokemon project:<br />' +
			'- <a href="http://www.smogon.com/cap/">CAP project website and description</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=48782">What Pokemon have been made?</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3464513">Talk about the metagame here</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3466826">Practice BW CAP teams</a>');
	},

	gennext: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('NEXT (also called Gen-NEXT) is a mod that makes changes to the game:<br />' +
			'- <a href="https://github.com/Zarel/Pokemon-Showdown/blob/master/mods/gennext/README.md">README: overview of NEXT</a><br />' +
			'Example replays:<br />' +
			'- <a href="http://pokemonshowdown.com/replay/gennextou-37815908">roseyraid vs Zarel</a><br />' +
			'- <a href="http://pokemonshowdown.com/replay/gennextou-37900768">QwietQwilfish vs pickdenis</a>');
	},

	om: 'othermetas',
	othermetas: function(target, room, user) {
		if (!this.canBroadcast()) return;
		target = toId(target);
		var buffer = '';
		var matched = false;
		if (!target || target === 'all') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/forums/206/">Information on the Other Metagames</a><br />';
		}
		if (target === 'all' || target === 'hackmons') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3475624/">Hackmons</a><br />';
		}
		if (target === 'all' || target === 'balancedhackmons' || target === 'bh') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3463764/">Balanced Hackmons</a><br />';
		}
		if (target === 'all' || target === 'glitchmons') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3467120/">Glitchmons</a><br />';
		}
		if (target === 'all' || target === 'tiershift' || target === 'ts') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3479358/">Tier Shift</a><br />';
		}
		if (target === 'all' || target === 'seasonal') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/sim/seasonal">Seasonal Ladder</a><br />';
		}
		if (target === 'all' || target === 'vgc2013' || target === 'vgc') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3471161/">VGC 2013</a><br />';
		}
		if (target === 'all' || target === 'omotm' || target === 'omofthemonth' || target === 'month') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/forums/threads/3481155/">OM of the Month</a>';
		}
		if (!matched) {
			return this.sendReply('The Other Metas entry "'+target+'" was not found. Try /othermetas or /om for general help.');
		}
		this.sendReplyBox(buffer);
	},

	roomhelp: function(target, room, user) {
		if (room.id === 'lobby') return this.sendReply('This command is too spammy for lobby.');
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Room moderators (%) can use:<br />' +
			'- /mute <em>username</em>: 7 minute mute<br />' +
			'- /hourmute <em>username</em>: 60 minute mute<br />' +
			'- /unmute <em>username</em>: unmute<br />' +
			'- /roomvoice <em>username</em>: appoint a room voice<br />' +
			'- /deroomvoice <em>username</em>: remove a room voice<br />' +
			'- /announce <em>message</em>: make an announcement<br />' +
			'<br />' +
			'Room owners (#) can use:<br />' +
			'- /roomdesc <em>description</em>: set the room description on the room join page<br />' +
			'- /roommod <em>username</em>: appoint a room moderator<br />' +
			'- /deroommod <em>username</em>: remove a room moderator<br />' +
			'- /declare <em>message</em>: make a global declaration<br />' +
			'- /modchat <em>level</em>: set modchat (to turn off: /modchat off)<br />' +
			'</div>');
	},

	restarthelp: function(target, room, user) {
		if (room.id === 'lobby' && !this.can('lockdown')) return false;
		if (!this.canBroadcast()) return;
		this.sendReplyBox('The server is restarting. Things to know:<br />' +
			'- We wait a few minutes before restarting so people can finish up their battles<br />' +
			'- The restart itself will take around 0.6 seconds<br />' +
			'- Your ladder ranking and teams will not change<br />' +
			'- We are restarting to update Pokémon Showdown to a newer version' +
			'</div>');
	},

	rule: 'rules',
	rules: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Please follow the rules:<br />' +
			'- <a href="http://pokemonshowdown.com/rules">Rules</a><br />' +
			'</div>');
	},

	faq: function(target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var buffer = '';
		var matched = false;
		if (!target || target === 'all') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq">Frequently Asked Questions</a><br />';
		}
		if (target === 'all' || target === 'deviation') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq#deviation">Why did this user gain or lose so many points?</a><br />';
		}
		if (target === 'all' || target === 'doubles' || target === 'triples' || target === 'rotation') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq#doubles">Can I play doubles/triples/rotation battles here?</a><br />';
		}
		if (target === 'all' || target === 'randomcap') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq#randomcap">What is this fakemon and what is it doing in my random battle?</a><br />';
		}
		if (target === 'all' || target === 'restarts') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/faq#restarts">Why is the server restarting?</a><br />';
		}
		if (target === 'all' || target === 'staff') {
			matched = true;
			buffer += '<a href="http://www.smogon.com/sim/staff_faq">Staff FAQ</a><br />';
		}
		if (!matched) {
			return this.sendReply('The FAQ entry "'+target+'" was not found. Try /faq for general help.');
		}
		this.sendReplyBox(buffer);
	},

	banlists: 'tiers',
	tier: 'tiers',
	tiers: function(target, room, user) {
		if (!this.canBroadcast()) return;
		target = toId(target);
		var buffer = '';
		var matched = false;
		if (!target || target === 'all') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/tiers/">Smogon Tiers</a><br />';
			buffer += '- <a href="http://www.smogon.com/bw/banlist/">The banlists for each tier</a><br />';
		}
		if (target === 'all' || target === 'ubers' || target === 'uber') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/uber">Uber Pokemon</a><br />';
		}
		if (target === 'all' || target === 'overused' || target === 'ou') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/ou">Overused Pokemon</a><br />';
		}
		if (target === 'all' || target === 'underused' || target === 'uu') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/uu">Underused Pokemon</a><br />';
		}
		if (target === 'all' || target === 'rarelyused' || target === 'ru') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/ru">Rarelyused Pokemon</a><br />';
		}
		if (target === 'all' || target === 'neverused' || target === 'nu') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/nu">Neverused Pokemon</a><br />';
		}
		if (target === 'all' || target === 'littlecup' || target === 'lc') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/tiers/lc">Little Cup Pokemon</a><br />';
		}
		if (target === 'all' || target === 'doubles') {
			matched = true;
			buffer += '- <a href="http://www.smogon.com/bw/metagames/doubles">Doubles</a><br />';
		}
		if (!matched) {
			return this.sendReply('The Tiers entry "'+target+'" was not found. Try /tiers for general help.');
		}
		this.sendReplyBox(buffer);
	},

	analysis: 'smogdex',
	strategy: 'smogdex',
	smogdex: function(target, room, user) {
		if (!this.canBroadcast()) return;

		var targets = target.split(',');
		var pokemon = Tools.getTemplate(targets[0]);
		var item = Tools.getItem(targets[0]);
		var move = Tools.getMove(targets[0]);
		var ability = Tools.getAbility(targets[0]);
		var atLeastOne = false;
		var generation = (targets[1] || "bw").trim().toLowerCase();
		var genNumber = 5;
		var doublesFormats = {'vgc2012':1,'vgc2013':1,'doubles':1};
		var doublesFormat = (!targets[2] && generation in doublesFormats)? generation : (targets[2] || '').trim().toLowerCase();
		var doublesText = '';
		if (generation === "bw" || generation === "bw2" || generation === "5" || generation === "five") {
			generation = "bw";
		} else if (generation === "dp" || generation === "dpp" || generation === "4" || generation === "four") {
			generation = "dp";
			genNumber = 4;
		} else if (generation === "adv" || generation === "rse" || generation === "rs" || generation === "3" || generation === "three") {
			generation = "rs";
			genNumber = 3;
		} else if (generation === "gsc" || generation === "gs" || generation === "2" || generation === "two") {
			generation = "gs";
			genNumber = 2;
		} else if(generation === "rby" || generation === "rb" || generation === "1" || generation === "one") {
			generation = "rb";
			genNumber = 1;
		} else {
			generation = "bw";
		}
		if (doublesFormat !== '') {
			// Smogon only has doubles formats analysis from gen 5 onwards.
			if (!(generation in {'bw':1,'xy':1}) || !(doublesFormat in doublesFormats)) {
				doublesFormat = '';
			} else {
				doublesText = {'vgc2012':'VGC 2012 ','vgc2013':'VGC 2013 ','doubles':'Doubles '}[doublesFormat];
				doublesFormat = '/' + doublesFormat;
			}
		}

		// Pokemon
		if (pokemon.exists) {
			atLeastOne = true;
			if (genNumber < pokemon.gen) {
				return this.sendReplyBox(pokemon.name+' did not exist in '+generation.toUpperCase()+'!');
			}
			if (pokemon.tier === 'G4CAP' || pokemon.tier === 'G5CAP') {
				generation = "cap";
			}

			var poke = pokemon.name.toLowerCase();
			if (poke === 'nidoranm') poke = 'nidoran-m';
			if (poke === 'nidoranf') poke = 'nidoran-f';
			if (poke === 'farfetch\'d') poke = 'farfetchd';
			if (poke === 'mr. mime') poke = 'mr_mime';
			if (poke === 'mime jr.') poke = 'mime_jr';
			if (poke === 'deoxys-attack' || poke === 'deoxys-defense' || poke === 'deoxys-speed' || poke === 'kyurem-black' || poke === 'kyurem-white') poke = poke.substr(0,8);
			if (poke === 'wormadam-trash') poke = 'wormadam-s';
			if (poke === 'wormadam-sandy') poke = 'wormadam-g';
			if (poke === 'rotom-wash' || poke === 'rotom-frost' || poke === 'rotom-heat') poke = poke.substr(0,7);
			if (poke === 'rotom-mow') poke = 'rotom-c';
			if (poke === 'rotom-fan') poke = 'rotom-s';
			if (poke === 'giratina-origin' || poke === 'tornadus-therian' || poke === 'landorus-therian') poke = poke.substr(0,10);
			if (poke === 'shaymin-sky') poke = 'shaymin-s';
			if (poke === 'arceus') poke = 'arceus-normal';
			if (poke === 'thundurus-therian') poke = 'thundurus-t';

			this.sendReplyBox('<a href="http://www.smogon.com/'+generation+'/pokemon/'+poke+doublesFormat+'">'+generation.toUpperCase()+' '+doublesText+pokemon.name+' analysis</a>, brought to you by <a href="http://www.smogon.com">Smogon University</a>');
		}

		// Item
		if (item.exists && genNumber > 1 && item.gen <= genNumber) {
			atLeastOne = true;
			var itemName = item.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox('<a href="http://www.smogon.com/'+generation+'/items/'+itemName+'">'+generation.toUpperCase()+' '+item.name+' item analysis</a>, brought to you by <a href="http://www.smogon.com">Smogon University</a>');
		}

		// Ability
		if (ability.exists && genNumber > 2 && ability.gen <= genNumber) {
			atLeastOne = true;
			var abilityName = ability.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox('<a href="http://www.smogon.com/'+generation+'/abilities/'+abilityName+'">'+generation.toUpperCase()+' '+ability.name+' ability analysis</a>, brought to you by <a href="http://www.smogon.com">Smogon University</a>');
		}

		// Move
		if (move.exists && move.gen <= genNumber) {
			atLeastOne = true;
			var moveName = move.name.toLowerCase().replace(' ', '_');
			this.sendReplyBox('<a href="http://www.smogon.com/'+generation+'/moves/'+moveName+'">'+generation.toUpperCase()+' '+move.name+' move analysis</a>, brought to you by <a href="http://www.smogon.com">Smogon University</a>');
		}

		if (!atLeastOne) {
			return this.sendReplyBox('Pokemon, item, move, or ability not found for generation ' + generation.toUpperCase() + '.');
		}
	},

	/*********************************************************
	 * Miscellaneous commands
	 *********************************************************/

	birkal: function(target, room, user) {
		this.sendReply("It's not funny anymore.");
	},

	potd: function(target, room, user) {
		if (!this.can('potd')) return false;

		config.potd = target;
		Simulator.SimulatorProcess.eval('config.potd = \''+toId(target)+'\'');
		if (target) {
			if (Rooms.lobby) Rooms.lobby.addRaw('<div class="broadcast-blue"><b>The Pokemon of the Day is now '+target+'!</b><br />This Pokemon will be guaranteed to show up in random battles.</div>');
			this.logModCommand('The Pokemon of the Day was changed to '+target+' by '+user.name+'.');
		} else {
			if (Rooms.lobby) Rooms.lobby.addRaw('<div class="broadcast-blue"><b>The Pokemon of the Day was removed!</b><br />No pokemon will be guaranteed in random battles.</div>');
			this.logModCommand('The Pokemon of the Day was removed by '+user.name+'.');
		}
	},

	register: function() {
		if (!this.canBroadcast()) return;
		this.sendReply("You must win a rated battle to register.");
	},

	br: 'banredirect',
	banredirect: function() {
		this.sendReply('/banredirect - This command is obsolete and has been removed.');
	},

	lobbychat: function(target, room, user, connection) {
		if (!Rooms.lobby) return this.popupReply("This server doesn't have a lobby.");
		target = toId(target);
		if (target === 'off') {
			user.leaveRoom(Rooms.lobby, connection.socket);
			connection.send('|users|');
			this.sendReply('You are now blocking lobby chat.');
		} else {
			user.joinRoom(Rooms.lobby, connection);
			this.sendReply('You are now receiving lobby chat.');
		}
	},

	a: function(target, room, user) {
		if (!this.can('battlemessage')) return false;
		// secret sysop command
		room.add(target);
	},

	/*********************************************************
	 * Help commands
	 *********************************************************/

	commands: 'help',
	h: 'help',
	'?': 'help',
	help: function(target, room, user) {
		target = target.toLowerCase();
		var matched = false;
		if (target === 'all' || target === 'msg' || target === 'pm' || target === 'whisper' || target === 'w') {
			matched = true;
			this.sendReply('/msg OR /whisper OR /w [username], [message] - Send a private message.');
		}
		if (target === 'all' || target === 'r' || target === 'reply') {
			matched = true;
			this.sendReply('/reply OR /r [message] - Send a private message to the last person you received a message from, or sent a message to.');
		}
		if (target === 'all' || target === 'getip' || target === 'ip') {
			matched = true;
			this.sendReply('/ip - Get your own IP address.');
			this.sendReply('/ip [username] - Get a user\'s IP address. Requires: @ & ~');
		}
		if (target === 'all' || target === 'rating' || target === 'ranking' || target === 'rank' || target === 'ladder') {
			matched = true;
			this.sendReply('/rating - Get your own rating.');
			this.sendReply('/rating [username] - Get user\'s rating.');
		}
		if (target === 'all' || target === 'nick') {
			matched = true;
			this.sendReply('/nick [new username] - Change your username.');
		}
		if (target === 'all' || target === 'avatar') {
			matched = true;
			this.sendReply('/avatar [new avatar number] - Change your trainer sprite.');
		}
		if (target === 'all' || target === 'rooms') {
			matched = true;
			this.sendReply('/rooms [username] - Show what rooms a user is in.');
		}
		if (target === 'all' || target === 'whois') {
			matched = true;
			this.sendReply('/whois [username] - Get details on a username: group, and rooms.');
		}
		if (target === 'all' || target === 'data') {
			matched = true;
			this.sendReply('/data [pokemon/item/move/ability] - Get details on this pokemon/item/move/ability.');
			this.sendReply('!data [pokemon/item/move/ability] - Show everyone these details. Requires: + % @ & ~');
		}
		if (target === "all" || target === 'analysis') {
			matched = true;
			this.sendReply('/analysis [pokemon], [generation] - Links to the Smogon University analysis for this Pokemon in the given generation.');
			this.sendReply('!analysis [pokemon], [generation] - Shows everyone this link. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'groups') {
			matched = true;
			this.sendReply('/groups - Explains what the + % @ & next to people\'s names mean.');
			this.sendReply('!groups - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'opensource') {
			matched = true;
			this.sendReply('/opensource - Links to PS\'s source code repository.');
			this.sendReply('!opensource - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'avatars') {
			matched = true;
			this.sendReply('/avatars - Explains how to change avatars.');
			this.sendReply('!avatars - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'intro') {
			matched = true;
			this.sendReply('/intro - Provides an introduction to competitive pokemon.');
			this.sendReply('!intro - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'cap') {
			matched = true;
			this.sendReply('/cap - Provides an introduction to the Create-A-Pokemon project.');
			this.sendReply('!cap - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'om') {
			matched = true;
			this.sendReply('/om - Provides links to information on the Other Metagames.');
			this.sendReply('!om - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'learn' || target === 'learnset' || target === 'learnall') {
			matched = true;
			this.sendReply('/learn [pokemon], [move, move, ...] - Displays how a Pokemon can learn the given moves, if it can at all.')
			this.sendReply('!learn [pokemon], [move, move, ...] - Show everyone that information. Requires: + % @ & ~')
		}
		if (target === 'all' || target === 'calc' || target === 'caclulator') {
			matched = true;
			this.sendReply('/calc - Provides a link to a damage calculator');
			this.sendReply('!calc - Shows everyone a link to a damage calculator. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'blockchallenges' || target === 'away' || target === 'idle') {
			matched = true;
			this.sendReply('/away - Blocks challenges so no one can challenge you. Deactivate it with /back.');
		}
		if (target === 'all' || target === 'allowchallenges' || target === 'back') {
			matched = true;
			this.sendReply('/back - Unlocks challenges so you can be challenged again. Deactivate it with /away.');
		}
		if (target === 'all' || target === 'faq') {
			matched = true;
			this.sendReply('/faq [theme] - Provides a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them.');
			this.sendReply('!faq [theme] - Shows everyone a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'highlight') {
			matched = true;
			this.sendReply('Set up highlights:');
			this.sendReply('/highlight add, word - add a new word to the highlight list.');
			this.sendReply('/highlight list - list all words that currently highlight you.');
			this.sendReply('/highlight delete, word - delete a word from the highlight list.');
			this.sendReply('/highlight delete - clear the highlight list');
		}
		if (target === 'all' || target === 'timestamps') {
			matched = true;
			this.sendReply('Set your timestamps preference:');
			this.sendReply('/timestamps [all|lobby|pms], [minutes|seconds|off]');
			this.sendReply('all - change all timestamps preferences, lobby - change only lobby chat preferences, pms - change only PM preferences');
			this.sendReply('off - set timestamps off, minutes - show timestamps of the form [hh:mm], seconds - show timestamps of the form [hh:mm:ss]');
		}
		if (target === 'all' || target === 'effectiveness') {
			matched = true;
			this.sendReply('/effectiveness [type1], [type2] - Provides the effectiveness of a [type1] attack to a [type2] Pokémon.');
			this.sendReply('!effectiveness [type1], [type2] - Shows everyone the effectiveness of a [type1] attack to a [type2] Pokémon.');
		}
		if (target === 'all' || target === 'dexsearch') {
			matched = true;
			this.sendReply('Searches for Pokemon that fulfill the selected criteria.');
			this.sendReply('Search categories are: type, tier, color, moves, ability, gen.');
			this.sendReply('Valid colors are: green, red, blue, white, brown, yellow, purple, pink, gray and black.');
			this.sendReply('Valid tiers are: Uber/OU/BL/UU/BL2/RU/NU/NFE/LC/CAP/Illegal.');
			this.sendReply('Types must be followed by " type", e.g., "dragon type".');
			this.sendReply('/dexsearch [type], [move], [move],...');
			this.sendReply('The order of the parameters does not matter.');
		}
		if (target === '%' || target === 'roomban') {
			matched = true;
			this.sendReply('/roomban [username] - Bans the user from the room you are in. Requires: % @ & ~');
		}
		if (target === '%' || target === 'roomunban') {
			matched = true;
			this.sendReply('/roomunban [username] - Unbans the user from the room you are in. Requires: % @ & ~');
		}
		if (target === '%' || target === 'modnote') {
			matched = true;
			this.sendReply('/modnote [note] - Adds a moderator note that can be read through modlog. Requires: % @ & ~');
		}
		if (target === '%' || target === 'altcheck' || target === 'alt' || target === 'alts' || target === 'getalts') {
			matched = true;
			this.sendReply('/alts OR /altcheck OR /alt OR /getalts [username] - Get a user\'s alts. Requires: % @ & ~');
		}
		if (target === '%' || target === 'forcerename' || target === 'fr') {
			matched = true;
			this.sendReply('/forcerename OR /fr [username], [reason] - Forcibly change a user\'s name and shows them the [reason]. Requires: % @ & ~');
		}
		if (target === '%' || target === 'redir' || target === 'redirect') {
			matched = true;
			this.sendReply('/redirect OR /redir [username], [room] - Forcibly move a user from the current room to [room]. Requires: % @ & ~');
		}
		if (target === '@' || target === 'ban' || target === 'b') {
			matched = true;
			this.sendReply('/ban OR /b [username], [reason] - Kick user from all rooms and ban user\'s IP address with reason. Requires: @ & ~');
		}
		if (target === '@' || target === 'unban') {
			matched = true;
			this.sendReply('/unban [username] - Unban a user. Requires: @ & ~');
		}
		if (target === '@' || target === 'unbanall') {
			matched = true;
			this.sendReply('/unbanall - Unban all IP addresses. Requires: @ & ~');
		}
		if (target === '%' || target === 'modlog') {
			matched = true;
			this.sendReply('/modlog [n] - If n is a number or omitted, display the last n lines of the moderator log. Defaults to 15. If n is not a number, search the moderator log for "n". Requires: % @ & ~');
		}
		if (target === "%" || target === 'kickbattle ') {
			matched = true;
			this.sendReply('/kickbattle [username], [reason] - Kicks an user from a battle with reason. Requires: % @ & ~');
		}
		if (target === "%" || target === 'warn' || target === 'k') {
			matched = true;
			this.sendReply('/warn OR /k [username], [reason] - Warns a user showing them the Pokemon Showdown Rules and [reason] in an overlay. Requires: % @ & ~');
		}
		if (target === '%' || target === 'mute' || target === 'm') {
			matched = true;
			this.sendReply('/mute OR /m [username], [reason] - Mute user with reason for 7 minutes. Requires: % @ & ~');
		}
		if (target === '%' || target === 'hourmute') {
			matched = true;
			this.sendReply('/hourmute , [reason] - Mute user with reason for an hour. Requires: % @ & ~');
		}
		if (target === '%' || target === 'unmute') {
			matched = true;
			this.sendReply('/unmute [username] - Remove mute from user. Requires: % @ & ~');
		}
		if (target === '&' || target === 'promote') {
			matched = true;
			this.sendReply('/promote [username], [group] - Promotes the user to the specified group or next ranked group. Requires: & ~');
		}
		if (target === '&' || target === 'demote') {
			matched = true;
			this.sendReply('/demote [username], [group] - Demotes the user to the specified group or previous ranked group. Requires: & ~');
		}
		if (target === '~' || target === 'forcerenameto' || target === 'frt') {
			matched = true;
			this.sendReply('/forcerenameto OR /frt [username] - Force a user to choose a new name. Requires: & ~');
			this.sendReply('/forcerenameto OR /frt [username], [new name] - Forcibly change a user\'s name to [new name]. Requires: & ~');
		}
		if (target === '&' || target === 'forcetie') {
			matched = true;
			this.sendReply('/forcetie - Forces the current match to tie. Requires: & ~');
		}
		if (target === '&' || target === 'declare' ) {
			matched = true;
			this.sendReply('/declare [message] - Anonymously announces a message. Requires: & ~');
		}
		if (target === '&' || target === 'potd' ) {
			matched = true;
			this.sendReply('/potd [pokemon] - Sets the Random Battle Pokemon of the Day. Requires: & ~');
		}
		if (target === '%' || target === 'announce' || target === 'wall' ) {
			matched = true;
			this.sendReply('/announce OR /wall [message] - Makes an announcement. Requires: % @ & ~');
		}
		if (target === '@' || target === 'modchat') {
			matched = true;
			this.sendReply('/modchat [off/registered/+/%/@/&/~] - Set the level of moderated chat. Requires: @ & ~');
		}
		if (target === '~' || target === 'hotpatch') {
			matched = true;
			this.sendReply('Hot-patching the game engine allows you to update parts of Showdown without interrupting currently-running battles. Requires: ~');
			this.sendReply('Hot-patching has greater memory requirements than restarting.');
			this.sendReply('/hotpatch chat - reload chat-commands.js');
			this.sendReply('/hotpatch battles - spawn new simulator processes');
			this.sendReply('/hotpatch formats - reload the tools.js tree, rebuild and rebroad the formats list, and also spawn new simulator processes');
		}
		if (target === '~' || target === 'lockdown') {
			matched = true;
			this.sendReply('/lockdown - locks down the server, which prevents new battles from starting so that the server can eventually be restarted. Requires: ~');
		}
		if (target === '~' || target === 'kill') {
			matched = true;
			this.sendReply('/kill - kills the server. Can\'t be done unless the server is in lockdown state. Requires: ~');
		}
		if (target === 'all' || target === 'help' || target === 'h' || target === '?' || target === 'commands') {
			matched = true;
			this.sendReply('/help OR /h OR /? - Gives you help.');
		}
		if (!target) {
			this.sendReply('COMMANDS: /msg, /reply, /ip, /rating, /nick, /avatar, /rooms, /whois, /help, /away, /back, /timestamps');
			this.sendReply('INFORMATIONAL COMMANDS: /data, /groups, /opensource, /avatars, /faq, /rules, /intro, /tiers, /othermetas, /learn, /analysis, /calc (replace / with ! to broadcast. (Requires: + % @ & ~))');
			this.sendReply('For details on all commands, use /help all');
			if (user.group !== config.groupsranking[0]) {
				this.sendReply('DRIVER COMMANDS: /mute, /unmute, /announce, /forcerename, /alts')
				this.sendReply('MODERATOR COMMANDS: /ban, /unban, /unbanall, /ip, /modlog, /redirect, /kick');
				this.sendReply('LEADER COMMANDS: /promote, /demote, /forcewin, /forcetie, /declare');
				this.sendReply('For details on all moderator commands, use /help @');
			}
			this.sendReply('For details of a specific command, use something like: /help data');
		} else if (!matched) {
			this.sendReply('The command "/'+target+'" was not found. Try /help for general help');
		}
	},

};
