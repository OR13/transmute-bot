
var builder = require('botbuilder');

export class AuthyMessage {

    public static promptForPhoneNumber = (session: any) => {
        return 'What is your phone number?';
    }

    public static announceTokenIsValid = (session: any) => {
        return 'Your token is valid.';
    }

    public static announceTokenInvalid = (session: any) => {
        return 'That token is valid.';
    }

    public static announceTokenChallengeFailed = (session: any) => {
        return 'A valid token is required to proceed.';
    }

    public static announceSessionIdenity = (session: any) => {

        var name = 'unknown (tracked)';
        if (session.privateConversationData.decodedToken) {
            name = session.privateConversationData.decodedToken['name'];
        }
        return `You are logged in as ${name}`;
    }

    public static announceSessionIdenityChanged = (session: any) => {

        var name = 'unknown (tracked)';
        if (session.privateConversationData.decodedToken) {
            name = session.privateConversationData.decodedToken['name'];
        }

        return `Ok... You are now logged in as ${name}`;
    }

}




