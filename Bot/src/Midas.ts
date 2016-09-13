
import { LoginSkill } from './Skills/Login/Login.Skill'
import { DefaultSkill } from './Skills/Default'
import { AuthySkill } from './Skills/Authy/Authy.Skill'

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
            
            AuthySkill.register(this.bot, intents);

            DefaultSkill.register(this.bot, intents);
            
      }


}
