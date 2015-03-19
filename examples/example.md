# Example API documentation version 1
http://example.com/1

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

---

## ACCOUNTS
This is the top level description for /account.
* One
* Two
* Three

### /account

* Methods
    
    * **post**: Creates a new account. Some **bold** text here. More text. Need to fill the line, so make it longer still. Hooray!
Line two

Paragraph two

    
### /account/find

* Methods
    
    * **get**: find an account
    
        * Query Parameters
        
            * name - required - string
        
            * gender - required - one of male,female
        
            * number - integer - default: 42
        
### /account/{id}

* URI Parameters

    * id - required - string - minLength: 1 - maxLength: 10

* Methods
    
    * **get**: 
    
    * **put**: Update the account
    
    * **delete**: Delete the account
    
### /account/login

* Methods
    
    * **post**: Login with email and password
    
### /account/forgot

* Methods
    
    * **post**: Sends an email to the user with a link to set a new password
    
### /account/session

* Methods
    
    * **get**: Gets the sessions
    
    * **delete**: Deletes the session, logging out the user
    

## Forecasts
The very top resource - displays OK

### /forecasts/{geoposition}

Overview endpoint to assemble and access forecast data in various timely resolutions - THIS IS NOT DISPLAYED ANYWHERE WITH RAML2HTML :/

* URI Parameters

    * geoposition - required - string

* Methods
    
    * **get**: Provides an overview of the available data - display OK
    
### /forecasts/test

No methods here, but it does have a description

* Methods
    

## /conversations
This is the top level description for /conversations.

### /conversations

* Methods
    
    * **get** *(secured)*: Get a list of conversation for the current user
    
    * **post** *(secured)*: Create a new conversions. The currently logged in user doesn't need to be supplied in the members list, it's implied.
    
### /conversations/{convId}

* URI Parameters

    * convId - required - string

* Methods
    
    * **get**: Get a single conversation including its messages
    
    * **put**: Update a conversation (change members)
    
### /conversations/{convId}/messages

* URI Parameters

    * convId - required - string

* Methods
    
    * **get**: Get the messages for the conversation
    
        * Query Parameters
        
            * page_size - number - default: 20
        
            * page - number
        
    * **post**: Add a new message to a conversation
    
### /conversations/{convId}/messages/{messageId}

* URI Parameters

    * convId - required - string

    * messageId - required - string

* Methods
    
    * **put**: Update the message
    
    * **delete**: Delete the message
    

## /users

### /users

* Methods
    
    * **get**: Get a list of all users
    
        * Query Parameters
        
            * page_size - number - default: 20
        
            * page - number
        
            * from - string - pattern: ^[a-zA-Z].+$
        
    * **post**: Creates a new user
    
### /users/{userId}

* URI Parameters

    * userId - required - string

* Methods
    
    * **get**: Get the details of a user including a list of groups he belongs to
    
    * **put**: Update a user
    
    * **delete**: Deletes a user
    

## /groups

### /groups

* Methods
    
    * **get**: Get a list of all the groups
    
    * **post**: Create a new group
    
### /groups/{groupId}

* URI Parameters

    * groupId - required - string

* Methods
    
    * **get**: Get the details of a group, including the member list
    
    * **put**: Update the group, **optionally** supplying the new list of members (overwrites current list)
    
    * **delete**: Removes the group
    
### /groups/{groupId}/users

* URI Parameters

    * groupId - required - string

* Methods
    
    * **post**: Adds a user to a group
    
### /groups/{groupId}/users/{userId}

* URI Parameters

    * groupId - required - string

    * userId - required - string

* Methods
    
    * **delete**: Removes a user from a group
    

