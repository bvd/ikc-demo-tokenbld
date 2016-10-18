module.exports = function(context, req) {
	
	// say hello to the logger
	context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);
    
	/***********\
	|
	| constants
	|
	\***********/
	// this key identifies an embedding platform to the composition platform
    var KEY_NAME = "starship enterprise";
	
	// this is a secret key that is never sent over the internet
	// it is configured at the embedding platform server
    var SECRET_KEY_VALUE = "qwerertrertyuytrtyuiuytrtyuiuytrtyuytrertyuiytrertyui"
    
	/***********\
	|
	| variables
	|
	\***********/
	// the composition platform will not accept an expiry above 48 hours
	var keyExpiryTimeSpan = 60 * 60 * 48;
	var expiryUnixTimeSeconds = Math.floor(Date.now() / 1000) + keyExpiryTimeSpan;
	
	// a random text is generated to salt the algorithm
	var randomtext = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        randomtext += possible.charAt(Math.floor(Math.random() * possible.length));
	
    /***********\
	|
	| parameters
	|
	\***********/
	var userGuid = "";
    userGuid = req.query.userGuid || req.body.userGuid;
    if(!userGuid)
	{
        context.res = {
            status: 400,
            body: "Please pass a userGuid on the query string or in the request body"
        };
        context.done();
        return;
    }

    /***********\
	|
	| 3. 2. 1. go
	|
	\***********/
    var stringToSign = expiryUnixTimeSeconds + userGuid + randomtext + KEY_NAME;
	var crypto = require('crypto'); 
    hash = crypto.createHmac('sha256', SECRET_KEY_VALUE).update(stringToSign).digest('hex');
    
	/*************\
	|
	| return value
	|
	\*************/
    context.res = {
        body: {
            expiry: expiryUnixTimeSeconds,
            userGuid: userGuid,
            challenge: randomtext,
            keyName: KEY_NAME,
            token: hash
        }
    };

	/***********\
	|
	| we're done
	|
	\***********/
    context.done();
};