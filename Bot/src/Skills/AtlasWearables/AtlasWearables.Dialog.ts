
var builder = require('botbuilder');

import { AtlasWearablesService } from './AtlasWearables.Service'
import { AtlasWearablesSkill } from './AtlasWearables.Skill'
import { AtlasWearablesMessage } from './AtlasWearables.Message'

export class AtlasWearablesDialog {

    static register = function (
        bot,
        intents
    ) {
        bot.dialog(AtlasWearablesSkill.Dialogs.Login, [
            function (session) {
                // call custom prompt
                session.beginDialog(AtlasWearablesSkill.Dialogs.Authenticate, {
                    prompt: AtlasWearablesMessage.promptForJWT(session),
                    retryPrompt: AtlasWearablesMessage.announceTokenInvalid(session)
                });
            },
            function (session, results) {
                // Check their answer
                if (results.response) {
                    // console.log('got valid token: ', results.response)
                    session.privateConversationData.token = results.response;

                    session.send(AtlasWearablesMessage.announceTokenIsValid(session));

                    AtlasWearablesService.setSessionJWT(session, session.privateConversationData.token);

                } else {
                    session.send(AtlasWearablesMessage.announceTokenChallengeFailed(session));
                }
                session.endDialog();
            }
        ]);

        bot.dialog(AtlasWearablesSkill.Dialogs.Authenticate, builder.DialogAction.validatedPrompt(
            builder.PromptType.text, (tokenCandidate) => {
                return AtlasWearablesService.verifyIdToken(tokenCandidate)
            }))

    }

}


