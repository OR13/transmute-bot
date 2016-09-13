
var builder = require('botbuilder');

var bcrypt = require('bcrypt');

// Create authenticated Authy and Twilio API clients
var authy = require('authy')(process.env.AUTHY_API_KEY);
var twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Used to generate password hash
var SALT_WORK_FACTOR = 10;

export interface AuthyUser {
    fullName: string;
    countryCode: string;
    phone: string;
    verified: string;
    authyId: string;
    email: string;
    password: string;
}

export class AuthyService {

    public static user: AuthyUser;

    public static isModified = (user: AuthyUser, field: string) => {
        return user[field] !== user[field];
    }

    public static comparePassword = (user: AuthyUser, candidatePassword: string, cb: any) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }

    public static onBeforeSave = (user: AuthyUser) => {

        // only hash the password if it has been modified (or is new)
        if (!AuthyService.isModified(user, 'password')) {
            return;
        }

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return console.error('error: ', err)

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return console.error(err);
                }
                // override the cleartext password with the hashed one
                user.password = hash;
                return;
            });
        });
    }

    public static sendAuthyToken = (session: any) => {

        var user = session.privateConversationData.user;

        // With a valid Authy ID, send the 2FA token for this user
        function sendToken() {

            console.log('request_sms. .. ');

            authy.request_sms(user.authyId, true, (err, response) => {
                return console.error(err);
            });
        }

        if (!user.authyId) {
            // Register this user if it's a new user
            console.log('time to register!');

            authy.register_user(user.email, user.phone, user.countryCode,
                function (err, response) {

                    if (err || !response.user) {
                        return console.error(err);
                    }
                    user.authyId = response.user.id;

                    // save to database
                    // self.save(function (err, doc) {
                    //     if (err || !doc) return cb.call(self, err);
                    //     self = doc;
                    //     sendToken();
                    // });

                });
        } else {
            // Otherwise send token to a known user
            sendToken();
        }


    };

    public static verifyAuthyToken = (otp) => {
        console.log('authy.verify...');

        authy.verify(AuthyService.user.authyId, otp, (err, response) => {
            console.log(" verifyAuthyToken response:", response)
            if (response.success === 'true'){
                
            }
        });

        return true;
    };

    public static sendMessage = (user, message) => {

        twilioClient.sendMessage({
            to: user.countryCode + user.phone,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: message
        }, (err, response) => {
            return console.error(err);
        });

    };

}




