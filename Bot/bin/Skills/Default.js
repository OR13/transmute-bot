"use strict";
var Login_Skill_1 = require('./Login/Login.Skill');
var Talkabot_Message_1 = require('./Talkabot/Talkabot.Message');
var DefaultSkill = (function () {
    function DefaultSkill() {
    }
    DefaultSkill.register = function (bot, intents) {
        intents.onDefault([
            function (session, args, next) {
                // console.log('onDefault: ', session.privateConversationData)
                if (!session.privateConversationData.name) {
                    session.beginDialog(Login_Skill_1.LoginSkill.Dialogs.Login);
                }
                else {
                    next();
                }
            },
            function (session, results) {
                session.send(Talkabot_Message_1.TalkabotMessage.announceSessionIdenity(session));
            }
        ]);
    };
    return DefaultSkill;
}());
exports.DefaultSkill = DefaultSkill;
//# sourceMappingURL=Default.js.map