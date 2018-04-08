"use strict";

var Discord = require("discord.js");
var fs = require("fs");

var bot = new Discord.Client();

const PREFIX = ">";

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

var members = "";

/*
officerRoster = fs.readFileSync("./rosters/officers.txt", {"encoding": "utf-8"});
activeRoster = fs.readFileSync("./rosters/actives.txt", {"encoding": "utf-8"});
traineeRoster = fs.readFileSync("./rosters/trainees.txt", {"encoding": "utf-8"});
*/

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame("Counter March");

    //Gets the rosters from the github repository for usage in the command.

    bot.channels.get("412443638560456714").send("I am alive! Doing outstanding so far!");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) {return;}

    if (!message.content.startsWith(PREFIX)) {return;}

    var args = message.content.substring(PREFIX.length).trim().split(" ");
    var choice = Math.floor(Math.random());
    //members = message.guild.members.sort().array();
    members = Array.from(message.guild.members.values());
    switch(args[0].toLowerCase())
    {

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
                "color": 0x5D8AA8,
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

            var i = 0;
            var returnString = " ";

            message.channel.send("Generating FDE..");
            message.channel.send(" ");

            if (args[1] == "af") {
                returnString += "\nTYPE: AIR FORCE\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanCommands.length);
                    returnString = returnString + afmanCommands[choice].toString() + "\n";
                }
            }
            else if (args[1] == "full") {
                returnString += "\nTYPE: ARMED DRILL\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random();
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
            }
            else if (args[1] == "fullpro") {
                returnString += "\nTYPE: **ADVANCED** ARMED DRILL\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random();
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
            }
            else if (args[1] == "afpro") {
                returnString += "\nTYPE: **ADVANCED** AIR FORCE\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanProCommands.length);
                    returnString = returnString + afmanProCommands[choice].toString() + "\n";
                }
            }
            else if (args[1] != "full" || args[1] != "af" || args[1] != "afpro" || args[1] != "fullpro") {
                message.channel.send("ERROR: Argument 1 is invalid. Command format: '>fde [af/full] [number]'");
            }
            returnString += "=================================\n";
            message.channel.send(returnString);
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
                for (index = 0; index < usernameHolder.length; index++)
                {
                    printout = printout + usernameHolder[index] + ", ";
                }
                message.channel.send(printout);
            }
            setTimeout(printNames, 31000);
            break;

        case "resources":
            var toReturn = "";
            var topic = args[1].toLowerCase();

            function printResources()
            {
                message.channel.send(`Here's what I have about ${topic}! \n` + toReturn);
            }

            if (topic == "af-dnc")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afman36-2203/afman36-2203.pdf";
                topic = "Air Force Drill and Ceremonies Manual (AFMAN36-2203)";
                printResources();
                break;
            }
            else if (topic == "mc-dnc")
            {
                toReturn = "http://www.marines.mil/Portals/59/Publications/MCO%20P5060.20%20W%20CH%201.pdf"
                topic = "Marine Corps Orders P5060.20 Appendix A";
                printResources();
                break;
            }
            else if (topic == "af")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afi36-2903/afi36-2903.pdf";
                topic = "Air Force Dress and Appearance Standards (AFMAN36-2903)";
                printResources();
                break;
            }
            else if (topic == "af-hg")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afman34-515/afman34-515.pdf";
                topic = "Air Force Honor Guard Manual (AFMAN 34-515)";
                printResources();
                break;
            }
            else if (topic == "facebook" || topic == "fb")
            {
                toReturn = "https://www.facebook.com/NAUHonorGuard/";
                topic = "NAU Honor Guard Facebook Page";
                printResources();
                break;
            }
            else
            {
            	message.channel.send(`Sorry! I can't find anything on ${topic}. Hopefully it'll be added to my library soon!`);
            	break;
            }

        case "roster":
            var toReturn = "", toAdd = "", tempString = "";
            var tempStorage;
            if (args[1] == "officers")
            {
                var officerRole = message.guild.roles.find("name", "Officer");
                var officers = [];
                for (var index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(officerRole.id))
                    {
                        officers.push(members[index].nickname);
                    }
                }
                officers.sort();
                for (var index = 0; index < officers.length; index++)
                {
                    tempStorage = officers[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (var innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    officers[index] = tempString;
                }
                officers.sort();
                for (var index = 0; index < officers.length; index++)
                {
                    toAdd = officers[index];
                    toReturn += toAdd + "\n";
                }
                message.channel.send("Here's a list of all our officers: \n");
                message.channel.send(toReturn);
                break;
            }
            else if (args[1] == "actives")
            {
                var activeRole = message.guild.roles.find("name", "Active");
                var actives = [];
                for (var index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(activeRole.id))
                    {
                        actives.push(members[index].nickname);
                    }
                }
                actives.sort();
                for (var index = 0; index < actives.length; index++)
                {
                    tempStorage = actives[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (var innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    actives[index] = tempString;
                }
                actives.sort();
                for (var index = 0; index < actives.length; index++)
                {
                    toAdd = actives[index];
                    toReturn += toAdd + "\n";
                }
                message.channel.send("Here's a list of all our actives in Honor Guard: \n");
                message.channel.send(toReturn);
                break;
            }
            else if(args[1] == "trainees")
            {
                var traineeRole = message.guild.roles.find("name", "Trainee");
                var trainees = [];
                for (var index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(traineeRole.id))
                    {
                        trainees.push(members[index].nickname);
                    }
                }
                trainees.sort();
                for (var index = 0; index < trainees.length; index++)
                {
                    tempStorage = trainees[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (var innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    trainees[index] = tempString;
                }
                trainees.sort();
                for (var index = 0; index < trainees.length; index++)
                {
                    toAdd = officers[index];
                    toReturn += toAdd + "\n";
                }
                message.channel.send("Here's a list of all our trainees: \n");
                message.channel.send(toReturn);
                break;
            }
            else
            {
                message.channel.send("I don't have any rosters about that. Try again with some of these words: officers, actives, trainees");
                break;
            }

        default:
            message.channel.send("I don't understand what to do with that command. Please use >help to get a list of possible commands to give me!");
            break;
        }
});


bot.login(process.env.BOT_TOKEN);
