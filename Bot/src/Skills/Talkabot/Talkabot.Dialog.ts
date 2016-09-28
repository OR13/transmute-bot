
var builder = require('botbuilder');

import { TalkabotService } from './Talkabot.Service'
import { TalkabotSkill } from './Talkabot.Skill'
import { TalkabotMessage } from './Talkabot.Message'

export class TalkabotDialog {

    static register = function (
        bot,
        intents
    ) {
        bot.dialog(TalkabotSkill.Dialogs.Login, [
            function (session) {
                // call custom prompt
                session.beginDialog(TalkabotSkill.Dialogs.Authenticate, {
                    prompt: TalkabotMessage.promptForName(session),
                    retryPrompt: TalkabotMessage.announceNameIsInvalid()
                });
            },
            function (session, results) {
                // Check their name
                if (results.response) {
                    // console.log('got valid name: ', results.response)

                    var name = results.response;

                    // TalkabotService.saveName(session, name);

                    session.privateConversationData.name = name;

                    session.send(TalkabotMessage.welcomeByName(name));


                } else {
                    // session.send(TalkabotMessage.announceNameIsInvalid());
                }
                session.endDialog();
            }
        ]);

        bot.dialog(TalkabotSkill.Dialogs.Authenticate, builder.DialogAction.validatedPrompt(
            builder.PromptType.text, (name: string) => {
                return name === 'orie';
            }))

    }

}


