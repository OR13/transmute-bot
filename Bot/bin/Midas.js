"use strict";
var Monarch_Skill_1 = require('./Skills/Monarch/Monarch.Skill');
var builder = require('botbuilder');
var Bot = (function () {
    function Bot(connector) {
        this.connector = connector;
        this.bot = new builder.UniversalBot(connector);
        var intents = new builder.IntentDialog();
        this.bot.dialog('/', intents);
        // A Skill is a mapping of Intentions to Dialogs
        // LoginSkill.register(this.bot, intents);
        // AuthySkill.register(this.bot, intents);
        // TalkabotSkill.register(this.bot, intents);
        Monarch_Skill_1.MonarchSkill.register(this.bot, intents);
    }
    return Bot;
}());
exports.Bot = Bot;
//# sourceMappingURL=Midas.js.map