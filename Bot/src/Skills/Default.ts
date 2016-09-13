

import { LoginSkill } from './Login/Login.Skill'
import { LoginService } from './Login/Login.Service'
import { LoginMessage } from './Login/Login.Message'

export class DefaultSkill {

    static register = function (
        bot,
        intents
    ) {


        intents.onDefault([
            function (session, args, next) {

                // console.log('onDefault: ', session.privateConversationData)

                if (!session.privateConversationData.token) {
                    session.beginDialog(LoginSkill.Dialogs.Login);
                } else {
                    next();
                }
            },
            function (session, results) {
                session.send(LoginMessage.announceSessionIdenity(session));
            }
        ]);
    }

}




