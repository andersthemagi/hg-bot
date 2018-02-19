const Discord = require("discord.js");

const PREFIX = ">";


var bot = new Discord.Client();

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

                choice = Math.floor(Math.random() * 6 + 1);
                // CHOOSING WHICH VULGARITY TO USE
                if (choice === 1) {
                    message.channel.send("Holy fuck open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.channel.send("Can someone open the fucking door? @everyone");
                }
                else if (choice === 3) {
                    message.channel.send("HEY FUCKHEAD. DOOR. NOW. @everyone");
                }
                else if (choice === 4) {
                    message.channel.send("COME HERE SHITBAG. SOMEONE NEEDS A DOOR OPENING @everyone");
                }
                else if (choice === 5) {
                    message.channel.send("I CHIMED IN WITH A 'HAVEN'T YOU PEOPLE EVER HEARD OF, OPEN THE GODDAMN DOOR, NO?' @everyone");
                }
                else if (choice === 6) {
                    message.channel.send("Fuck. Shit. Ass. Shit. Fuck. Door. @everyone");
                }
                break;
            }
            //Otherwise, default behavior is as follows
            message.channel.send("Can someone please open the door? @everyone");
            break;
            
            
        /*
            >help
            - Displays a list of commands and pertinent information regarding the Honor Guard bot.
                Information is sent through direct message.
        */
        case "help":
            message.delete(1000);
            
            const embed = {
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
            >command
            - Displays a random command from the AFMAN 33-2203 and the MCO P5060.20 Appendix A
        */
        case "command":
            choice = Math.floor(Math.random() * 16 + 1);
            //Chooses which command to say based off the 
            if (choice === 1) {
                message.channel.send("Column Left, March!");
            }
            if (choice === 2) {
                message.channel.send("Present, Arms!");
            }
            if (choice === 3) {
                message.channel.send("Right Flank, March!");
            }
            if (choice === 4) {
                message.channel.send("About, Face!");
            }
            if (choice === 5) {
                message.channel.send("Parade, Rest!");
            }
            if (choice === 6) {
                message.channel.send("Flight, 'Tench Hut!");
            }
            if (choice === 7) {
                message.channel.send("Forward, March!");
            }
            if (choice === 8) {
                message.channel.send("To the Rear, March!");
            }
            if (choice === 9) {
                message.channel.send("Counter, March!");
            }
            if (choice === 10) {
                message.channel.send("Incline 12 degrees, to the Left!");
            }
            if (choice === 11) {
                message.channel.send("Right Shoulder, Arms!");
            }
            if (choice === 12) {
                message.channel.send("Port, Arms!");
            }
            if (choice === 13) {
                message.channel.send("Order, Arms!");
            }
            if (choice === 14) {
                message.channel.send("Column of Files from the Right, Column Right, March!");
            }
            if (choice === 15) {
                message.channel.send("Trail, Arms!");
            }
            if (choice === 16) {
                message.channel.send("Flight, Halt!");
            }
            break;
		    
	    /*
	    	>report
	    	- Gets accountability based off of who says they're here in the chat within 30 seconds of the report message being sent in the chat. 
	    */
	    case "report":
		    var index = 0;
		    const filter = m => m.content.toLowerCase().startsWith('>here');

		    message.channel.send("@everyone Report your accountability! Type '>here' to be counted!");
		    
		    message.channel.awaitMessages(filter, {
			    max: 200,
			    time: 45000,
			    errors: ['time']
		    })
		    .then(collected => {
			    console.log("Recieved Message!");
		    })
		    .catch(collected => {
			    message.channel.send(`Accountability is ${collected.size} present and ready for practice.`);
		    });
		    
		    break;
	}
});
bot.login(process.env.BOT_TOKEN);
