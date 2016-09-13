
var builder = require('botbuilder');

import { AtlasWearablesIntent } from './AtlasWearables.Intent'
import { AtlasWearablesDialog } from './AtlasWearables.Dialog'
import { AtlasWearablesService } from './AtlasWearables.Service'

export class AtlasWearablesSkill {

    static Dialogs = {
        Login: '/Login',
        Authenticate: '/Authenticate'
    };

    static Intents = {
        Login: /^Login/i,
    };

    static register = function (
        bot,
        intents
    ) {
        // A Skill is a mapping of Intents to Dialogs
        // When I say 'Login' I want the 'LoginDialog'
        AtlasWearablesIntent.register(bot, intents);
        AtlasWearablesDialog.register(bot, intents);
       
    }

}




