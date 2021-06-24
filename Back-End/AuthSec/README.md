# Authentication and Security

In this module, i've learned a few things about authentication and security. I've implemented some steps for the authentication and security by levels, ascending order.
Each level represents a higher method/level of authentication and security.

Level 1 - Basic Registration Using Username and Password

In this step, i basically just created a login page, a secret page, and a database. The secret page can be accessed by logging in to the website. In this step, i only provided registration and data insertion, and also login with data validation (checking if the credentials that the user input is valid based on all records in the database)

Level 2 - Database Encryption

In this step, i use the mongoose-encryption package to help me encrypt some data in my MongoDB database. The data that i'm encrypting is the password data for each document (which represents each user registrated). The encryption is done using a certain "secret key".

Level 3 - Password Hashing

At this point, i try to hash the password directly after the user input the password in the registration page, instead of encrypting it in the database. The password stored inside the database will be in a form of hash (jumbled up characters). The login validation method used here is by directly hashing the password that the user input and try to find the same hash result in the database. If there's a match, then the user will be directed to the secret page. Hashing was done by the md5 function.

Level 4 - Password Hashing with Salt and Salt Rounds

This level is a bit similar with the previous level, just a step more complicated. The hashing function used is the bcrypt hash. Salt here basically is just a string that will be added to the property to be hashed, to increase the complexity of the hashing. Salt Rounds, in the other hand, is the amount of how many times a string will be hashed. I'll give you an example down below.

Imagine that the string that we will be hashing is "pensil" and the salt is "penggaris". Given that the salt rounds is 5, we will hash "pensilpenggaris" -> hash(result + salt) -> hash(result + salt) -> ....

The validation method here is pretty simple actually, using the built in function that bcrypt has, which is bcrypt.compare(INPUTEDFIELD, FIELDFROMDATABASE, CALLBACK).

Level 5 - Sessions and Cookies

This level is basically to make user do the login phase not too many times. Using cookies, the session of an user will be saved to a cookie, that will be saved in the user's browser. This way, the user doesn't have to do repeating login/register activity when accessing contents that need user credentials (login/register). (Using PassportJS)

Level 6 - OAuth 2.0 via Google(Success) and Facebook(this one doesn't work yet)

By implementing OAuth 2.0 via PassportJS, any user can easily login/register to the website via their Google/ Facebook account. This can be set in the Google Cloud Platform (for Google) or the Facebook Developer (for Facebook) and a few app.get() in the server, and voila, you're all set to login/register to the website using your credentials from those apps. One more neat thing here, is that in the database you create, if a user log in via Google/ Facebook, their credentials that will be recorded is only a GoogleID/ FacebookID, which is an unique identifier of each account (easily prevents database from creating duplicate documents). This automatically means that we don't have to really hussle a lot to secure the personal data from Google/ Facebook Accounts that logged in to our Website.