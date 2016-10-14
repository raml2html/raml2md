# Example RAML 1.0 API documentation version 1
http://example.com/{version}

### Welcome
Welcome to the Example Documentation. The Example API allows you
to do stuff. See also [example.com](https://www.example.com).

```javascript
var raml2html = require('raml2html');

// Using the default templates:
// source can either be a filename, file contents (string) or parsed RAML object
raml2html.parse(source, onSuccess, onError);

// Using your own templates:
// - config should be an object with at least an `template` property
// - config can also include `helpers` and `partials`
// - the config object will be accessible from your handlebars templates
raml2html.parseWithConfig(source, config, onSuccess, onError);
```

### Chapter two
More content here. Including **bold** text!

Small table:

| A | B | C |
|---|---|---|
| 1 | 2 | 3 |

Done

---

## ACCOUNT
This is the top level description for /account.
* One
* Two
* Three

### /account

* **post**: Creates a new account. Some **bold** text here. More text. Need to fill the line, so make it longer still. Hooray!
Line two

Paragraph two

### /account/find

* **get**: find an account

### /account/{id}

* **get**: 
* **put**: Update the account
* **delete**: Delete the account

### /account/login

* **post**: Login with email and password

### /account/forgot

* **post**: Sends an email to the user with a link to set a new password

### /account/session

* **get**: Gets the sessions
* **delete**: Deletes the session, logging out the user

### /account/admin

* **post**: Creates a new administrator account.

### /account/user

* **post**: Test for multiple inheritence.

## ACCOUNTS

### /accounts

* **post**: Creates multiple accounts.

## Forecasts
The very top resource - displays OK

### /forecasts/{geoposition}
Overview endpoint to assemble and access forecast data in various timely resolutions - THIS IS NOT DISPLAYED ANYWHERE WITH RAML2HTML :/

* **get**: Provides an overview of the available data - display OK

### /forecasts/test
No methods here, but it does have a description

## /conversations
This is the top level description for /conversations.

### /conversations

* **get** *(secured)*: Get a list of conversation for the current user
* **post** *(secured)*: Create a new conversions. The currently logged in user doesn't need to be supplied in the members list, it's implied.

### /conversations/{convId}

* **get**: Get a single conversation including its messages
* **put**: Update a conversation (change members)

### /conversations/{convId}/messages

* **get**: Get the messages for the conversation
* **post**: Add a new message to a conversation

### /conversations/{convId}/messages/{messageId}

* **put**: Update the message
* **delete**: Delete the message

## /users

### /users

* **get**: Get a list of all users
* **post**: Creates a new user

### /users/{userId}

* **get**: Get the details of a user including a list of groups he belongs to
* **put**: Update a user
* **delete**: Deletes a user

### /users/name_{userName}_{account}

* **get**: Get all the users with a specific name

## /groups

### /groups

* **get**: Get a list of all the groups
* **post**: Create a new group

### /groups/{groupId}

* **get**: Get the details of a group, including the member list
* **put**: Update the group, **optionally** supplying the new list of members (overwrites current list)
* **delete**: Removes the group

### /groups/{groupId}/users

* **post**: Adds a user to a group

### /groups/{groupId}/users/{userId}

* **delete**: Removes a user from a group

