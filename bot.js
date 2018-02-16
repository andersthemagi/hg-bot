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

    switch(args[0].toLowerCase()) {

        case "door":
            message.delete();
            
            if (args[1] == "vulgar") {
                message.channel.sendMessage("Yo bitch open the fucking door");
                break;
            }
            
            message.channel.sendMessage("Can someone please open the door?");
            break;
            
        case "help":
            message.channel.sendMessage("Help isn't really working right now. Ask Sepulveda.");
            break;
            
        
    }
})

bot.login(process.env.BOT_TOKEN);
