
var builder = require('botbuilder');

import { AuthyService } from './Authy.Service'
import { AuthySkill } from './Authy.Skill'
import { AuthyMessage } from './Authy.Message'

export class AuthyDialog {

    static register = function (
        bot,
        intents
    ) {
        bot.dialog(AuthySkill.Dialogs.Login, [
            function (session) {
                // call custom prompt

                AuthyService.user = <any>{
                    email: 'orie@transmute.industries',
                    phone: '4847987015',
                    countryCode: '1',
                    authyId: '24301002'
                };


                session.privateConversationData.user = AuthyService.user;
                // assume we have a user with a phone number

                AuthyService.sendAuthyToken(session);

                session.beginDialog(AuthySkill.Dialogs.Authenticate, {
                    prompt: AuthyMessage.promptForPhoneNumber(session),
                    retryPrompt: AuthyMessage.announceTokenInvalid(session)
                });
            },
            function (session, results) {
                // Check their answer
                if (results.response) {
                    // console.log('got valid token: ', results.response)
                    session.privateConversationData.token = results.response;

                    session.send(AuthyMessage.announceTokenIsValid(session));

                    // AuthyService.setSessionJWT(session, session.privateConversationData.token);

                } else {
                    session.send(AuthyMessage.announceTokenChallengeFailed(session));
                }
                session.endDialog();
            }
        ]);

        bot.dialog(AuthySkill.Dialogs.Authenticate, builder.DialogAction.validatedPrompt(
            builder.PromptType.text, (tokenCandidate) => {

                // AuthyService.sendMessage(user, 'test!')

                return AuthyService.verifyAuthyToken(tokenCandidate);
            }))

    }

}


