"use strict";
var Login_Skill_1 = require('./Login/Login.Skill');
var Login_Message_1 = require('./Login/Login.Message');
var DefaultSkill = (function () {
    function DefaultSkill() {
    }
    DefaultSkill.register = function (bot, intents) {
        intents.onDefault([
            function (session, args, next) {
                // console.log('onDefault: ', session.privateConversationData)
                if (!session.privateConversationData.token) {
                    session.beginDialog(Login_Skill_1.LoginSkill.Dialogs.Login);
                }
                else {
                    next();
                }
            },
            function (session, results) {
                session.send(Login_Message_1.LoginMessage.announceSessionIdenity(session));
            }
        ]);
    };
    return DefaultSkill;
}());
exports.DefaultSkill = DefaultSkill;
//# sourceMappingURL=Default.js.map