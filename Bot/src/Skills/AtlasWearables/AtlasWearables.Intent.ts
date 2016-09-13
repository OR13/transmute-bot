
var builder = require('botbuilder');


import { AtlasWearablesSkill } from './AtlasWearables.Skill'
import { AtlasWearablesMessage } from './AtlasWearables.Message'

export class AtlasWearablesIntent {

    static register = function (
        bot,
        intents
    ) {

        // When I say 'Login' I want the 'LoginDialog'
        intents.matches(AtlasWearablesSkill.Intents.Login, [
            function (session) {
                session.beginDialog(AtlasWearablesSkill.Dialogs.Login);
            },
            function (session, results) {
                session.send(AtlasWearablesMessage.announceSessionIdenityChanged(session));
            }
        ]);


    }

}