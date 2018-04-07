"use strict";

var Discord = require("discord.js");
var GitHub = require("github-client");
var fs = require("fs");

var bot = new Discord.Client();
var gh = GitHub.new({
    username: process.env.GIT_USER,
    password: process.env.GIT_PASSWORD
});
var repo = gh.getRepo(process.env.GIT_USER, "hg-bot");
var branch = repo.getDefaultBranch();

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
var isBinary = false;
var officerRoster = "";
var activeRoster = "";
var traineeRoster = "";

/*
var officerRoster = fs.readFileSync("./rosters/officers.txt", {"encoding": "utf-8"});
var activeRoster = fs.readFileSync("./rosters/actives.txt", {"encoding": "utf-8"});
var traineeRoster = fs.readFileSync("./rosters/trainees.txt", {"encoding": "utf-8"});
*/

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame("Counter March");

    //Gets the rosters from the github repository for usage in the command.
    branch.read("./rosters/officers.txt" , isBinary)
    .done(function(contents) {
        officerRoster = contents;
    }).fail(function(err) {});
    branch.read("./rosters/actives.txt", isBinary)
    .done(function(contents) {
        activeRoster = contents;
    }).fail(function(err) {});
    branch.read("./rosters/trainees.txt", isBinary)
    .done(function(contents) {
        traineeRoster = contents;
    }).fail(function(err) {});

    bot.channels.get("412443638560456714").send("I am alive! Doing outstanding so far!");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) {return;}

    if (!message.content.startsWith(PREFIX)) {return;}

    var args = message.content.substring(PREFIX.length).split(" ");
    var choice = Math.floor(Math.random());
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
            if (args[1] == "all")
            {
                message.channel.send("Here's a list of all the members of Honor Guard by classification: ");
                var toReturn = "Officers:\n";
                toReturn += officerRoster;
                toReturn += "\nActives:\n";
                toReturn += activeRoster;
                toReturn += "\nTrainees:\n";
                toReturn += traineeRoster;
                message.channel.send(toReturn);
                break;
            }
            else if (args[1] == "officers")
            {
                if (officerRoster == "")
                {
                    message.channel.send("No officers on the roster. Weird as shit.");
                    break;
                }
                message.channel.send("Here is a list of our officers and their positions: ")
                message.channel.send(officerRoster);
                break;
            }
            else if (args[1] == "actives")
            {
                if (activeRoster == "")
                {
                    message.channel.send("No actives on the roster! That's weird.");
                    break;
                }
                message.channel.send("Here is a roster of all our current actives: ");
                message.channel.send(activeRoster);
                break;
            }
            else if (args[1] == "trainees")
            {
                if (traineeRoster == "")
                {
                    message.channel.send("No Trainees on the roster!")
                    break;
                }
                message.channel.send("Here is a roster of all our current trainees: ");
                message.channel.send(traineeRoster);
                break;
            }
            else if (args[1] == "add")
            {
                var toAdd = "";
                var content = "";
                var message = "";
                for (var index = 3; index < args.length; index++)
                {
                    toAdd += args[index];
                }
                toAdd += "\n";

                if (args[2] == "officers")
                {
                    content = officerRoster + toAdd;
                    message = "";
                    branch.write("./rosters/officers.txt", content, message, isBinary)
                    .done(function() {});
                    /*
                    fs.appendFileSync("./rosters/officers.txt", toAdd, "utf8");
                    officerRoster = fs.readFileSync("./rosters/officers.txt", {"encoding" : "utf-8"});
                    */
                    message.channel.send(`Added ${toAdd} to the officers roster!`);
                    break;
                }
                /*
                else if (args[2] == "actives")
                {
                    fs.appendFileSync("./rosters/actives.txt", toAdd, "utf8");
                    activeRoster = fs.readFileSync("./rosters/actives.txt", {"encoding" : "utf-8"});
                    message.channel.send(`Added ${toAdd} to the actives roster!`);
                    break;
                }
                else if (args[2] == "trainees")
                {
                    fs.appendFileSync("./rosters/trainees.txt", toAdd, "utf8");
                    traineeRoster = fs.readFileSync("./rosters/trainees.txt", {"encoding" : "utf-8"});
                    message.channel.send(`Added ${toAdd} to the trainee roster!`);
                    break;
                }
                */
                else
                {
                    message.channel.send("I can't add to a list that ain't there. Try again with an actual roster. ");
                    break;
                }
            }

        default:
            message.channel.send("I don't understand what to do with that command. Please use >help to get a list of possible commands to give me!");
            break;
        }
});


bot.login(process.env.BOT_TOKEN);
