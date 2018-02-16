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
            
            //IF THE NEXT ARGUMENT INCLUDES VULGAR
            if (args[1] === "vulgar") {
                var choice = Math.floor(Math.random() * 3 + 1);
                // CHOOSING WHICH VULGARITY TO USE
                if (choice === 1) {
                    message.edit("Holy fuck open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.edit("Can someone open the fucking door? @everyone");
                }
                else if (choice === 2) {
                    message.edit("HEY FUCKHEAD. DOOR. NOW. @everyone");
                }
                break;
            }
            //Otherwise, default behavior is as follows
            message.edit("@everyone Can someone please open the door?");
            break;
            
        case "help":
            message.delete(1000);
            message.author.sendMessage("Help isn't really working right now. Ask Sepulveda.");
            break;
            
        
    }
})

bot.login(process.env.BOT_TOKEN);
