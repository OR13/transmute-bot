
import { LoginSkill } from './Skills/Login/Login.Skill'
import { DefaultSkill } from './Skills/Default'
import { AuthySkill } from './Skills/Authy/Authy.Skill'

import { TalkabotSkill } from './Skills/Talkabot/Talkabot.Skill'

import { MonarchSkill } from './Skills/Monarch/Monarch.Skill'

var builder = require('botbuilder');

export class Bot {

      public bot: any;

      constructor(
            public connector: any
      ) {
            this.bot = new builder.UniversalBot(connector);

            var intents = new builder.IntentDialog();

            this.bot.dialog('/', intents);

            // A Skill is a mapping of Intentions to Dialogs

            // LoginSkill.register(this.bot, intents);

            // AuthySkill.register(this.bot, intents);

            // TalkabotSkill.register(this.bot, intents);

            MonarchSkill.register(this.bot, intents);


      }


}
