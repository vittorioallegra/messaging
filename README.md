# Confidence Code Challenge

> :zap: Frontend engineer position

## :earth_americas: Overview

Hi there! Before you start, welcome to the Confidence code challenge for our frontend engineer position. We are happy to have you here and we hope you'll feel comfortable with this challenge.

## :green_book: Introduction

Our application is used across multiple regions and network availability scenarios. Our challange is to provide a seamless experience to our clients so we need our application to support poor network connectivity.

## :wrench: Technical expectation

Javascript and Typescript is in our DNA. You can decide to start from scratch or use CRA (Create React App), Next.JS, Node, etc. based on your preference. We really appreciate tests, UI skills and code organization and linting. We are less focused on UI in this challenge, but please consider creating a nice presentation.

## :triangular_ruler: UI expectation

The application should act like a commonly used chat system - having your message on one side and the buddy messages on the other side. We want to handle multi-party chat including other information like date, time, and what ever you think can be useful. To differentiate users, the chat message bubble should be in different colors (every user an unique color) and every user should have an avatar based on the initials of his or her name (Ex. John Doe -> JD)

```
+---------------------------+
|                           |
|                           |
|                           |
|                           |
|              [A] Hi there |
| [X] Hey dude!             |
| [X] How are doing?        |
+---------------------------+
| Type your message ...     |
+---------------------------+
```

## :movie_camera: UX expectation

From an user perspective we want:

- Server simulate poor connectivity issues so application should be able to handle this condition
- If message is not delivered the system should ask to user to manually resend the message
- When the user presses the up key, the user should be able to edit their last message
- Edited messages should show an edited text display with date and time
- Users should be able to delete messages
- Deleted messages should be visible with a "Deleted by" message showing date and time
- Messages must be ordered by datetime
- On refreshing the page, messages should still remain on the page without reloading the whole list
- Users should be able to have multiple chats per browser tabs

## :rocket: How to proceed

API documentation http://confi-codin-1xbkniq7crrwz-645813469.us-west-2.elb.amazonaws.com/documentation/static/index.html

Tips:

- Use your email to create an authentication token via `/users/authenticate` (ID property value)
- Use the authentication token generated above to create a chat channel `/threads/new` (ID property value)
- With the authentication token and the thread ID you can start to handle chat partecipants
- Use the `displayName` in `/messages/new` payload to differenciate chat partecipants
- (bonus) `/messages/new` have a special property `checksum` that you can use as custom identifier passing a value from the client

Create a new branch and start coding! When you have completed your code challenge open a PR to ask us to review it. If you need clarification about the challenge, open a PR in DRAFT mode and ask for help (you can also send an email if you feel more confortable). It not necessary to complete all the expectations above if you don't have time, but in the PR description please give us a detailed bulleted list of what you have complete. It can be useful to provide a video of the final solution if you would like.

## :checkered_flag: Conclusion

Please remember this a code challenge and not a real application so ignore the edge cases and focus on the suggestions above for the optimal solution. We know you don't have a week to spend in this challenge, so try to balance a final solution with your time.
