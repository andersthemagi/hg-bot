const Discord = require("discord.js");

const PREFIX = ">";


var bot = new Discord.Client();

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame("Counter March")
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) {return;}

    if (!message.content.startsWith(PREFIX)) {return;}

    var args = message.content.substring(PREFIX.length).split(" ");
    var author = message.author;

    switch(args[0].toLowerCase()) {
        
        /*
            >door [argument]
            - Lets the channel know that someone needs the door open
            - Arguments:
                - vulgar = Verbally abuses the channel and let's them know the door needs opening.
        */
        case "door":
            message.delete(1000);
            //IF THE NEXT ARGUMENT INCLUDES VULGAR
            if (args[1] === "vulgar") {

                var choice = Math.floor(Math.random() * 6 + 1);
                // CHOOSING WHICH VULGARITY TO USE
                if (choice === 1) {
                    message.channel.sendMessage("Holy fuck open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.channel.sendMessage("Can someone open the fucking door? @everyone");
                }
                else if (choice === 3) {
                    message.channel.sendMessage("HEY FUCKHEAD. DOOR. NOW. @everyone");
                }
                else if (choice === 4) {
                    message.channel.sendMessage("COME HERE SHITBAG. SOMEONE NEEDS A DOOR OPENING @everyone");
                }
                else if (choice === 5) {
                    message.channel.sendMessage("I CHIMED IN WITH A 'HAVEN'T YOU PEOPLE EVER HEARD OF, OPEN THE GODDAMN DOOR, NO?' @everyone");
                }
                else if (choice === 6) {
                    message.channel.sendMessage("Fuck. Shit. Ass. Shit. Fuck. Door. @everyone");
                }
                break;
            }
            //Otherwise, default behavior is as follows
            message.channel.sendMessage("Can someone please open the door? @everyone");
            break;
            
            
        /*
            >help
            - Displays a list of commands and pertinent information regarding the Honor Guard bot.
                Information is sent through direct message.
        */
        case "help":
            message.delete(1000);
            message.author.sendMessage("Help is currently not working. Ask Sepulveda.");
            break;
        
        /*
            >command
            - Displays a random command from the AFMAN 33-2203 and the MCO P5060.20 Appendix A
        */
        case "command":
            var choice = Math.floor(Math.random() * 16 + 1);
            //Chooses which command to say based off the 
            if (choice === 1) {
                message.channel.sendMessage("Column Left, March!");
            }
            if (choice === 2) {
                message.channel.sendMessage("Present, Arms!");
            }
            if (choice === 3) {
                message.channel.sendMessage("Right Flank, March!");
            }
            if (choice === 4) {
                message.channel.sendMessage("About, Face!");
            }
            if (choice === 5) {
                message.channel.sendMessage("Parade, Rest!");
            }
            if (choice === 6) {
                message.channel.sendMessage("Flight, 'Tench Hut!");
            }
            if (choice === 7) {
                message.channel.sendMessage("Forward, March!");
            }
            if (choice === 8) {
                message.channel.sendMessage("To the Rear, March!");
            }
            if (choice === 9) {
                message.channel.sendMessage("Counter, March!");
            }
            if (choice === 10) {
                message.channel.sendMessage("Incline 12 degrees, to the Left!");
            }
            if (choice === 11) {
                message.channel.sendMessage("Right Shoulder, Arms!");
            }
            if (choice === 12) {
                message.channel.sendMessage("Port, Arms!");
            }
            if (choice === 13) {
                message.channel.sendMessage("Order, Arms!");
            }
            if (choice === 14) {
                message.channel.sendMessage("Column of Files from the Right, Column Right, March!");
            }
            if (choice === 15) {
                message.channel.sendMessage("Trail, Arms!");
            }
            if (choice === 16) {
                message.channel.sendMessage("Flight, Halt!");
            }
            break;
    }
});
bot.login(process.env.BOT_TOKEN);
