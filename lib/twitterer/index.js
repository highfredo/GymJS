var Twit = require('twit');


class Twitterer {
    constructor(consumer_key, consumer_secret, access_token, access_token_secret) {
        this.T = new Twit({
            consumer_key:         consumer_key,
            consumer_secret:      consumer_secret,
            access_token:         access_token,
            access_token_secret:  access_token_secret,
            timeout_ms:           60*1000
        })
    }

    send(body, to) {

        var path, options;

        if(to) {
            path = 'direct_messages/new'
            options = {
                text: body
            }
            if(to.startsWith("@")) {
                options.screen_name = to.replace('@', '');
            } else {
                options.user_id = to;
            }
        } else {
            path = 'statuses/update'
            options = {
                status: body
            }
        }

        return new Promise((resolve, reject) => {
            this.T.post(path, options, function(error, data, response) {
                error ? reject(error) : resolve({data: data, response: response});
            })
        })
    }
}

module.exports = Twitterer
