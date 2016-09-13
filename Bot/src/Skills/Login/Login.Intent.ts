
var builder = require('botbuilder');


import { LoginSkill } from './Login.Skill'
import { LoginMessage } from './Login.Message'

export class LoginIntent {

    static register = function (
        bot,
        intents
    ) {

        // When I say 'Login' I want the 'LoginDialog'
        intents.matches(LoginSkill.Intents.Login, [
            function (session) {
                session.beginDialog(LoginSkill.Dialogs.Login);
            },
            function (session, results) {
                session.send(LoginMessage.announceSessionIdenityChanged(session));
            }
        ]);


    }

}