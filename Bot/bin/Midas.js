"use strict";
var Default_1 = require('./Skills/Default');
var Authy_Skill_1 = require('./Skills/Authy/Authy.Skill');
var builder = require('botbuilder');
var Bot = (function () {
    function Bot(connector) {
        this.connector = connector;
        this.bot = new builder.UniversalBot(connector);
        var intents = new builder.IntentDialog();
        this.bot.dialog('/', intents);
        // A Skill is a mapping of Intentions to Dialogs
        // LoginSkill.register(this.bot, intents);
        Authy_Skill_1.AuthySkill.register(this.bot, intents);
        Default_1.DefaultSkill.register(this.bot, intents);
    }
    return Bot;
}());
exports.Bot = Bot;
//# sourceMappingURL=Midas.js.map