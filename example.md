# Example API documentation version 1
http://example.com/1


### Welcome
Welcome to the Example Documentation. The Example API allows you
to do stuff. See also [example.com](https://www.example.com).


### Chapter two
More content here. Including **bold** text!


---


## ACCOUNTS


This is the top level description for /account.
* One
* Two
* Three



### /account

post: Creates a new account. Some **bold** text here.




Example:
```
{
  &quot;email&quot;: &quot;john@example.com&quot;,
  &quot;password&quot;: &quot;super_secret&quot;,
  &quot;name&quot;: &quot;John Doe&quot;
}

```






### /account/find

get: find an account







### /account/{id}

get: 


put: Update the account







delete: Delete the account







### /account/login

post: Login with email and password




Example:
```
{
  &quot;email&quot;: &quot;john@example.com&quot;,
  &quot;password&quot;: &quot;super_secret&quot;
}

```









### /account/forgot

post: Sends an email to the user with a link to set a new password




Example:
```
{
  &quot;email&quot;: &quot;john@example.com&quot;
}

```









### /account/session

get: Gets the sessions


delete: Deletes the session, logging out the user









## /conversations


This is the top level description for /conversations.


### /conversations

get: Get a list of conversation for the current user


post: Create a new conversions. The currently logged in user doesn&#x27;t need to be supplied in the members list, it&#x27;s implied.




Example:
```
{
  &quot;content&quot;: &quot;My message!&quot;,
  &quot;members&quot;: [1, 2, 3]
}

```






### /conversations/{convId}

get: Get a single conversation including its messages


put: Update a conversation (change members)




### /conversations/{convId}/messages

get: Get the messages for the conversation


post: Add a new message to a conversation




### /conversations/{convId}/messages/{messageId}

put: Update the message


delete: Delete the message















## /users



### /users

get: Get a list of all users


post: Creates a new user




Example:
```
{
  &quot;email&quot;: &quot;john@example.com&quot;,
  &quot;name&quot;: &quot;John Doe&quot;,
}

```






### /users/{userId}

get: Get the details of a user including a list of groups he belongs to


put: Update a user


delete: Deletes a user









## /groups



### /groups

get: Get a list of all the groups


post: Create a new group




Example:
```
{
  &quot;name&quot;: &quot;Cool people&quot;,
  &quot;members&quot;: [1, 2, 3]
}

```






### /groups/{groupId}

get: Get the details of a group, including the member list


put: Update the group, **optionally** supplying the new list of members (overwrites current list)




Example:
```
{
  &quot;name&quot;: &quot;Cool people&quot;,
  &quot;members&quot;: [1, 2, 3]
}

```




delete: Removes the group




### /groups/{groupId}/users

post: Adds a user to a group




Example:
```
{
  &quot;user_id&quot;: 4,
}

```






### /groups/{groupId}/users/{userId}

delete: Removes a user from a group















