
var builder = require('botbuilder');


import { AuthySkill } from './Authy.Skill'
import { AuthyMessage } from './Authy.Message'

export class AuthyIntent {

    static register = function (
        bot,
        intents
    ) {

        // When I say 'Login' I want the 'AuthyDialog'
        intents.matches(AuthySkill.Intents.Login, [
            function (session) {
                session.beginDialog(AuthySkill.Dialogs.Login);
            },
            function (session, results) {
                session.send(AuthyMessage.announceSessionIdenityChanged(session));
            }
        ]);


    }

}