module.exports = function(modification, bot) {
  modification.registerCommand("shrug", function(member, command, message) {
    message.channel.send("\u00AF\\_(\u30C4)_/\u00AF");
  }, {dm: true});

  modification.registerCommand("tableflip", function(member, command, message) {
    message.channel.send("\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B");
  }, {dm: true});

  modification.registerCommand("unflip", function(member, command, message) {
    message.channel.send("\u252C\u2500\u252C\uFEFF \u30CE( \u309C-\u309C\u30CE)");
  }, {dm: true});

  modification.registerCommand("google", function(member, command, message) {
    if (command.params.length < 1) {
      message.channel.send(`\`\`\`${member.guild.prefix}google [query]\nPerforms a search on google.\nquery | search text\`\`\``);
      return;
    }
    message.channel.send("https:\/\/google.com/search?q=" + encodeURIComponent(command.params.join(" ")));
  }, {dm: true});
};
