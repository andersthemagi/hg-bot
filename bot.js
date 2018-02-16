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
                message.channel.sendMessage("WE MADE IT PAST THE ARGUMENT CHECKER");
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
            message.author.sendMessage("Help isn't really working right now. Ask Sepulveda.");
            break;
            
        case "say":
            message.edit("I'm saying things through your mouth now. It's like you're my puppet!");
            break;
    }
})

bot.login(process.env.BOT_TOKEN);
