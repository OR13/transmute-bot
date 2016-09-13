
var builder = require('botbuilder');

import { AuthyIntent } from './Authy.Intent'
import { AuthyDialog } from './Authy.Dialog'
import { AuthyService } from './Authy.Service'

/*

Lots to do here.

Add some promise library.

Formalize user registration.

Provide REST interface for Authy.Service

*/

export class AuthySkill {

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
        // When I say 'Login' I want the 'AuthyDialog'
        AuthyIntent.register(bot, intents);
        AuthyDialog.register(bot, intents);
       
    }

}




