const Discord = require("discord.js");

const PREFIX = ">";


var bot = new Discord.Client();

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame('Counter March')
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX))return;

    var args = message.content.substring(PREFIX.length).split(" ");
    var author = message.author;

    switch(args[0].toLowerCase()) {

        case "door":
            
            message.delete(1000);
            //IF THE NEXT ARGUMENT INCLUDES VULGAR
            if (args[1] === "vulgar") {

                var choice = Math.floor(Math.random() * 3 + 1);
                
                // CHOOSING WHICH VULGARITY TO USE
                if (choice === 1) {
                    message.channel.sendMessage("Holy fuck open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.channel.sendMessage("Can someone open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.channel.sendMessage("HEY FUCKHEAD. DOOR. NOW. @everyone");
                }
                break;
            }
            //Otherwise, default behavior is as follows
            message.channel.sendMessage("Can someone please open the door? @everyone");
            break;
            
        case "help":
            message.delete(1000);
            
            message.author.sendMessage({embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "HGBot Help Menu",
                description: "Here is a list of commands for the Honor Guard bot. Note that all commands begin with the prefix '>'.",
                fields: [{ 
                    name: ">door",
                    value: "Lets the channel know you need the door open."
                    },
                    {
                    name: ">door vulgar",
                    value: "Verbally abuses the chat on the fact you need the door open."
                    },
                    {
                        name: ">help",
                        value: "Displays the help Menu, which is what you're looking at right now."
                    }],
                timestamp: new Date(),
            }
            
            });
            break;

bot.login(process.env.BOT_TOKEN);
