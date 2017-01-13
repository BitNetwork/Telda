const lib_discord = require("discord.js");
const lib_ytdl = require("ytdl-core");

function botInit() {
  var me = this;
  
  this.token = "token";
  
  this.prefix = "~";
  this.seperator = " ";
  
  function processCommand(commandText) {
    var command = commandText.substring(me.prefix.length).split(me.seperator)[0];
    var params = commandText.split(me.seperator).slice(1);
    return {command: command, params: params};
  }
  
  this.commands = {
    debug: {
      name: "debug",
      runtime: function(message, client) {
        message.reply("???");
      }
    },
    echo: {
      name: "echo",
      runtime: function(message, client) {
        console.log(processCommand(message.content));
        message.channel.send(processCommand(message.content).params.join(me.seperator));
      }
    },
    ping: {
      name: "ping",
      runtime: function(message, client) {
        message.channel.sendMessage("Pong!");
      }
    },
    play: {
      name: "play",
      runtime: function(message, client) {
        // This crash when user not in voice channel (member.voiceChannel = null)
        message.member.voiceChannel.join().then(function(connection) {
          //Get info with http://stackoverflow.com/q/38810536/3434588
          //connection.playFile("./test.mp3", {});
          var stream = lib_ytdl(processCommand(message.content).params[0] || "https://www.youtube.com/watch?v=92f3RRkakO8", {filter: "audioonly"});
          setTimeout(function(stream) {
            connection.playStream(stream, {seek: 0, volume: 1});
          }, 2500, stream);
        });
      }
    }
  };
}

var bot = new botInit();
var client = new lib_discord.Client();

client.on("ready", function() {
  console.log("Server ready!");
  client.user.setGame("Discord");
});


client.on("message", function(message) {
  
  // Logging messages for debugging
  var header = message.channel.guild.name + "/" + message.channel.name + ", " + message.author.username + "#" + message.author.discriminator + ": ";
  console.log(header + message.content.replace(/\n/g, "\n" + " ".repeat(header.length)));
  
  if (message.content.substring(0, bot.prefix.length) !== bot.prefix || message.author.id === client.user.id) {
    return;
  }
  
  var command = message.content.substring(bot.prefix.length).split(bot.seperator)[0];
  var params = message.content.split(bot.seperator).slice(1);
    
  for (var key in bot.commands) {
    if (bot.commands[key].name === command && typeof bot.commands[key].runtime === "function") {
      bot.commands[command].runtime(message, client);
    }
  }

});

client.login(bot.token); // Bot token. No stealies
