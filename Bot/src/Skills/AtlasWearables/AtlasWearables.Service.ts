
var builder = require('botbuilder');

var firebase = require("firebase");

var config = {
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    serviceAccount: process.env.FIREBSAE_SERVICE_ACCOUNT_PATH,
    databaseAuthVariableOverride: {
        uid: "midas-service-account-worker"
    }
};

firebase.initializeApp(config);

export class AtlasWearablesService {

    public static setSessionJWT = (session: any, token: string) => {

        return firebase.auth().verifyIdToken(token)

            .then((decodedToken) => {
                var uid = decodedToken.sub;
                // console.log(decodedToken);
                // var t = JSON.stringify(decodedToken)
                // var k = JSON.parse(t)
                session.privateConversationData.decodedToken = decodedToken;
                // session.send('success');
                return decodedToken;
                // ...
            })

            .catch((error) => {
                // Handle error
                console.error(error);
                return null;
            });
    }

    public static verifyIdToken = (token: any) => {

        return firebase.auth().verifyIdToken(token)

            .then((decodedToken) => {
                var uid = decodedToken.sub;
                // console.log(decodedToken);
                return decodedToken;
                // ...
            })

            .catch((error) => {
                // Handle error
                console.error(error);
                return null;
            });
    }

    public static verifyIdTokenFromEnv = (token: any) => {
        return token == process.env.FIREBASE_SECRET;
    }
}




