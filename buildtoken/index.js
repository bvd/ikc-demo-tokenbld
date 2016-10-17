module.exports = function(context, req) {
    
    var KEY_NAME = "customerCode";
    var SECRET_KEY_VALUE = "qwertyuiop"
    
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    if (req.query.userGuid || (req.body && req.body.userGuid)) {
        var userGuid = req.query.userGuid || req.body.userGuid;
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userGuid on the query string or in the request body"
        };
        context.done();
        return;
    }

    var secondsValidityTimeSpan = 60 * 60 * 48;
    var expiryUnixTimeSeconds = Math.floor(Date.now() / 1000) + secondsValidityTimeSpan;

    var randomtext = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        randomtext += possible.charAt(Math.floor(Math.random() * possible.length));

    var crypto = require('crypto'); 
    var stringToSign = expiryUnixTimeSeconds + userGuid + randomtext + KEY_NAME;

    hash = crypto.createHmac('sha256', SECRET_KEY_VALUE).update(stringToSign).digest('hex');
    
    context.res = {
        body: {
            expiry: expiryUnixTimeSeconds,
            userGuid: userGuid,
            challenge: randomtext,
            keyName: KEY_NAME,
            token: hash
        }
    };

    context.done();
};