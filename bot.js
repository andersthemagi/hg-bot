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
    "Left Step, March",
    "Right Step, March",
    "Left Face",
    "Right Face",
    "About Face",
    "Dress Right, Dress",
    "Cover",
    "Ready Front"
];

var afmanProCommands = [
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
                    "name": ">door [vulgar]",
                    "value": "Sends a message to the channel that you would like the door to be open. If the command is given as '>door vulgar', the bot will verbally abuse the chat while asking for the door to be open."
                },
                {
                    "name": ">fde [af/afpro/full/fullpro] [number of commands]",
                    "value": "Auto Generates an FDE. 'af' and 'afpro' generate commands in AFMAN36-2203. 'full' and 'fullpro' generate commands with AF and the MCO P5060.20 Appendix A"
                },
                {
                    "name": ">help",
                    "value": "Displays this list. List is sent through Direct Message to the user who requests it."
                },
                {
                    "name": ">report",
                    "value": "Sends a message for everyone to report accountability. Every person that says the word 'here' in the chat is counted, not counting duplicates. After 30 seconds, the bot will tally up and send out how many people are here. It will also specify who said they were here."
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
            if(commands > 25) {
                message.channel.send("ERROR: TOO MANY COMMANDS");
            }
            
            var suggestedTime = 0.5 * commands;
            

            //AF drill and ceremonies only
            var i = 0;
            var returnString = " ";
            if (args[1] == "af") {
                message.channel.send("Generating Air Force FDE..");
                message.channel.send(" ");
                message.channel.send(`Suggested Time for FDE: ${suggestedTime} minutes`);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanCommands.length);
                    returnString = returnString + afmanCommands[choice].toString() + "\n";
                }
                message.channel.send(returnString);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                message.channel.send(`Commands Generated: ${i}`);
            }
            else if (args[1] == "full") {
                message.channel.send("Generating Armed Drill FDE..");
                message.channel.send(" ");
                message.channel.send(`Suggested Time for FDE: ${suggestedTime} minutes`);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random()
                    //50/50 chance of choosing AFMAN or MCO commands
                    //If it passes this check, choose an air force command
                    if (choice >= 0.3) {
                        choice = Math.floor(Math.random() * afmanCommands.length);
                        returnString = returnString + afmanCommands[choice].toString() + "\n";
                    }
                    else if (choice < 0.3) {
                        choice = Math.floor(Math.random() * mcoCommands.length);
                        returnString = returnString + mcoCommands[choice].toString() + "\n";
                    }
                }
                message.channel.send(returnString);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                message.channel.send(`Commands Generated: ${i}`);
            }
            else if (args[1] == "fullpro") {
                message.channel.send("Generating Armed Drill FDE..");
                message.channel.send(" ");
                message.channel.send(`Suggested Time for FDE: ${suggestedTime} minutes`);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random()
                    //50/50 chance of choosing AFMAN or MCO commands
                    //If it passes this check, choose an air force command
                    if (choice >= 0.3) {
                        choice = Math.floor(Math.random() * afmanProCommands.length);
                        returnString = returnString + afmanProCommands[choice].toString() + "\n";
                    }
                    else if (choice < 0.3) {
                        choice = Math.floor(Math.random() * mcoCommands.length);
                        returnString = returnString + mcoCommands[choice].toString() + "\n";
                    }
                }
                message.channel.send(returnString);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                message.channel.send(`Commands Generated: ${i}`);
            }
            else if (args[1] == "afpro") {
                message.channel.send("Generating ADVANCED Air Force FDE..");
                message.channel.send(" ");
                message.channel.send(`Suggested Time for FDE: ${suggestedTime} minutes`);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanProCommands.length);
                    returnString = returnString + afmanProCommands[choice].toString() + "\n";
                }
                message.channel.send(returnString);
                message.channel.send(" ");
                message.channel.send("==================================");
                message.channel.send(" ");
                message.channel.send(`Commands Generated: ${i}`);
            }
            else if (args[1] != "full" || args[1] != "af" || args[1] != "afpro" || args[1] != "fullpro") {
                message.channel.send("ERROR: Argument 1 is invalid. Command format: '>fde [af/full] [number]'");
            }
            break;

        /*
        >report
        - Gets accountability based off of who says they're here in the chat within 30 seconds of the report message being sent in the chat.
        */
        case "report":
            var index = 0;
            let uidHolder = [];
            let usernameHolder = [];
            const filter = m => {
                let id = m.author.id;
                if (uidHolder.includes(id) || !m.content.startsWith('here')) {
                    return false;
                }
                else {
                    uidHolder.push(id);
                    usernameHolder.push(m.member.nickname);
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
            function printNames() {
                var printout = " ";
                message.channel.send(`Members who are present:`);
                /*for (index = 0; index < uidHolder.length; index++) {
                    user = bot.fetchUser(uidHolder[index]);
                    message.channel.send(user.username);
                }*/
                for (index = 0; index < usernameHolder.length; index++)
                {
                    printout = printout + usernameHolder[index] + ", ";
                }
                message.channel.send(printout);
            }
            setTimeout(printNames, 31000); 
            break;
        }
});
bot.login(process.env.BOT_TOKEN);
