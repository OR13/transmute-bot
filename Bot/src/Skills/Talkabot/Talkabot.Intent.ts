
var builder = require('botbuilder');


import { TalkabotSkill } from './Talkabot.Skill'
import { TalkabotMessage } from './Talkabot.Message'

export class TalkabotIntent {

    static register = function (
        bot,
        intents
    ) {

        // When I say 'Login' I want the 'LoginDialog'
        intents.matches(TalkabotSkill.Intents.Login, [
            function (session) {
                session.beginDialog(TalkabotSkill.Dialogs.Login);
            },
            function (session, results) {
                session.send(TalkabotMessage.announceSessionIdenityChanged(session));
            }
        ]);


    }

}