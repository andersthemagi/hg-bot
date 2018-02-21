"use strict";

const Discord = require("discord.js");

const PREFIX = ">";


var bot = new Discord.Client();

var vulgarResponses = [
    "Holy fuck open the fucking door? @everyone",
    "HEY FUCKHEAD. DOOR. NOW. @everyone",
    "Can someone open the fucking door? @everyone",
    "COME HERE SHITBAG. SOMEONE NEEDS A DOOR OPENING @everyone",
    "I CHIMED IN WITH A 'HAVEN'T YOU PEOPLE EVER HEARD OF, OPEN THE GODDAMN DOOR, NO?' @everyone",
    "Fuck. Shit. Ass. Shit. Fuck. Door. @everyone"
];

var afmanCommands = [
    "Column Left March",
    "Present Arms",
    "Forward March",
    "Order Arms",
    "Eyes Right",
    "Ready Front",
    "Column Right March",
    "Parade Rest",
    "Flight, Attention",
    "Left Flank March",
    "Right Flank March",
    "To The Rear March",
    "Column Half Left March",
    "Column Half Right March",
    "Incline 90 degrees, to the Right",
    "Incline 90 degrees, to the Left",
    "Incline 45 degrees, to the Left",
    "Incline 45 degrees, to the Right",
    "Incline 180 degrees, to the Left",
    "Incline 20 degrees, to the Left",
    "Incline 44 degrees, to the Right",
    "Open Ranks, March",
    "Close Ranks, March",
    "Left Step, March",
    "Right Step, March",
    "Close, March",
    "Extend, March",
    "Route Step, March",
    "Dress Right, Dress",
    "Cover",
    "Column of Files, from the Right",
    "Column of Files, from the Left",
    "Column of Threes",
    "Ready Front",
    "Dress Left, Dress",
    "Eyes, Left",
    "At Ease, March",
    "Left Face",
    "Right Face",
    "About Face"
];

var mcoCommands = [
    "Right Shoulder Arms",
    "Trail Arms",
    "Port Arms",
    "Left Shoulder Arms",
    "Order Arms",
    "15 Count Manual of Arms",
    "Inspection Arms"
];

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame("Counter March");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) {return;}

    if (!message.content.startsWith(PREFIX)) {return;}

    var args = message.content.substring(PREFIX.length).split(" ");
    var choice = Math.floor(Math.random());
    switch(args[0].toLowerCase()) {

        case "door":
        message.delete(1000);
        if (args[1] === "vulgar") {

            choice = Math.floor(Math.random() * 6);
            message.channel.send(vulgarResponses[choice]);
            break;
        }
        message.channel.send("Can someone please open the door? @everyone");
        break;

        case "help":
        message.delete(1000);
        var embed = {
            "title": "Honor Guard Bot Help ",
            "description": "Here is a list of commands and pertinent information regarding the Honor Guard Bot.",
            "color": 12345,
            "timestamp": "2018-02-17T03:54:36.645Z",
            "fields": [
                {
                    "name": ">command",
                    "value": "Tells the bot to send out a random command from either the AFMAN33-2203 or the MCO P5060.20 Appendix A. There are 16 possible commands it can send."
                },
                {
                    "name": ">door",
                    "value": "Sends a message to the channel that you would like the door to be open. If the command is given as '>door vulgar', the bot will verbally abuse the chat while asking for the door to be open."
                },
                {
                    "name": ">help",
                    "value": "Displays this list. List is sent through Direct Message to the user who requests it."
                },
                {
                    "name": ">report",
                    "value": "Sends a message for everyone to report accountability. Every person that says the word 'here' in the chat is counted, even if they are duplicates. After 30 seconds, the bot will tally up and send out how many people are here."
                }
            ]
        };
        message.author.send({ embed });
        break;

        /*
        >fde [af/full] [# of commands]
        */
        case "fde":
            var commands = 0;
            choice = 0;
            try {
                commands = parseInt(args[2]);
            }catch(ParseException) {
                message.channel.send("ERROR, NOT A NUMBER");
                break;
            }
            message.channel.send("Generating FDE..");
            message.channel.send(" ");
            var suggestedTime = 0.5 * commands;
            
            var embed = {
                "title": "Auto Generated FDE",
                "author": "Honor Guard Bot",
              	"description": `Suggested Time: ${suggestedTime} minutes`,
                "color": "#5D8AA8",
                "fields": []
            };

            //AF drill and ceremonies only
        		var i = 0;
            if (args[1] == "af") {
                for (i = 0; i <= commands; i++) {
                    choice = Math.floor(Math.random() * afmanCommands.length);
                    embed.fields.push({"name": afmanCommands[choice], "value": " ", "inline": false});
                }
                message.channel.send({embed});
            }
            else if (args[1] == "full") {
                break;
            }
            else if (args[1] != "full" || args[1] != "af") {
                message.channel.send("ERROR: Argument 1 is invalid. Command format: '>fde [af/full] [number]'");
                break;
            }
            break;

        /*
        >report
        - Gets accountability based off of who says they're here in the chat within 30 seconds of the report message being sent in the chat.
        */
        case "report":
        var index = 0;
        let uidHolder = [];
        const filter = m => {
            let id = m.author.id;
            if (uidHolder.includes(id) || !m.content.startsWith('here')) {
                return false;
            }
            else {
                uidHolder.push(id);
                return true;
            }

        };

        message.channel.send("@everyone Report your accountability! Type 'here' to be counted!");

        message.channel.awaitMessages(filter, {
            max: 200,
            time: 30000,
            errors: ['time']
        })
        .then(collected => {
            console.log("Recieved Message!");
        })
        .catch(collected => {
            message.channel.send(`Accountability is ${collected.size} present and ready for practice.`);
        });
            
        var user = null;
            
        setTimeout(function() {
            message.channel.send(`Members who are present:`);
            for (index = 0; index < uidHolder.length; index++) {
                user = client.fetchUser(uidHolder[index]);
                message.channel.send(user.username);
            }
        }, 31000);
            
        break;
        }
});
bot.login(process.env.BOT_TOKEN);
