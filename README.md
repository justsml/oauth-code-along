# OAuth Code Along

> Links provided to setup OAuth keys in Objectives Section.

### Lessons / Videos

* Part 1: https://youtu.be/uPLEy92Njhc
  * [End of lesson commit](https://github.com/justsml/oauth-code-along/commit/344a83101e2297388c886dec00c935db574d1ef3)
* Part 2: ... coming soon

### Objectives

* Define OAuth, Passport, Session
  * OAuth: Method for authenticating users w/ 3rd party providers
  * Passport: Auth for express
  * Session: Place to store user info - on the server
* Research & Draw OAuth Diagram
* Setup Keys for one of: [Twitter](https://apps.twitter.com/app/new), [Github](https://github.com/settings/applications/new), [Facebook](https://developers.facebook.com/apps/), [Google](https://console.cloud.google.com/projectcreate).
* Setup [express bits](https://github.com/justsml/guides/blob/master/express/app.js)
  * Run `npm install express express-session body-parser morgan cors passport passport-github passport-twitter`
* Setup Passport & routes
* Profit!

#### Part 2

> Review code from part 1
> Then Make it do The Thing™

* Describe at least 4 critical parts of an Express+Passport app
  * 3 minutes to review code
  * Write short notes on slates/desks.
    * serialize/deserialize
    * in memory data for `users`
    * Authorization - restricting routes
    * Passport startegy & middleware
    * Passport routes & callback

* Why is session critical?
  * Turn & talk
* Describe in own words issue w/ session (and fix it)
  * Turn & talk



### References/Resources

1. Dan's Express App Template: https://github.com/justsml/guides/blob/master/express/app.js
1. Social auth snippets: https://medium.com/@tkssharma/authentication-using-passport-js-social-auth-with-node-js-1e1ec7086ded

