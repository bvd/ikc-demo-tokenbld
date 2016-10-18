## introduction to ikc-demo-tokenbld

This project demonstrates in nodeJS how an authorization token can be built. The authorization token hashes a secret and sends the hash in an object with the other values. When another party that knows the same secret performs the same trick, it can be certain that this party knows the secret.

## context of ikc-demo-tokenbld

The code is meant as an implementation example for clients of the composition environment 'ikcomponeer.nl' / 'componium.eu'.

## advised point of implementation

Maybe you should not wait calling this sort of code until the moment that the composition tool has to open in the embedding page. When you think it is important that the composition tool will open very quickly, you may already create the hash as soon as the login of the user is authenticated and authorized in your platform. You will then have it ready when the composition tool needs to open quickly.

## example implementation

In the example implementation below, the authenticate() and authorize() are your own implementations. As soon as the user is authenticated and authorized, the buildToken implementation is called. The buildToken() method will thus contain code that implements the algorithm that is demonstrated in this project.

```
if(authenticate(logindata) && authorize(logindata)){
	session.ikcomponeerAuth = buildToken(logindata.userGuid);
}
```