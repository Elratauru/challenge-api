# Challenge API
## What is this?

Built in Node v16.13.1, npm v9.5.0

This API is a proof of concept of a NodeJS API which uses ES6 + Express + JWT Bearer Token Authentication and connects into a simple file-based SQLite3 Database.

**Important:** There's a video showcase for a quick look on how the API works in the root folder of this repository as a quick example of what it does.

## API Diagram
The API is built on the concept of "expandability", meaning that each component is standalone and self-contained in their own folder. This enables a project to expand without having to refactor everything each few months.

Each folder inside component will have as many files as required: A Controller, a Router, a Service, a Testing Suite, Validation, and if required, a Data Access Layer as well, with each file providing a particular set of functionality.

Then, each router is then loaded through the App.js as required, with the middlewares providing support for higher-level functionality, like Authentication and Authorization.

## Middlewares
There are a few middlewares built that handle multiple responsibilities depending on the type:
- Authentication: The authentication middleware makes sure that your Bearer token is valid and required for the endpoint.
- Authorization: The authorization middleware validates that your authentication has permission for the designated endpoint.
- Error: This error middleware is used to catch all errors and throw then in a standard format.
- Validation: The validation middleware is used to interface between Joi and to handle all the payloads sent to the API.

## How to run this
First, do a regular `npm install`, this will install all the required dependencies. Then execute the API through the following command: `npm run start`

The API will attempt to use port 3000 by default. It can be changed by going to the app.js file and switching it around.

## Available Models
The API has two available models: user and tutorial. There's actions available for tutorials but no users can be CRUD. There are two users available with different permissions however:

### Admin User:
```
admin@test.com
12345678
```
### Regular User:
```
user@test.com
12345678
```

Note: Be aware that these Passwords are stored as plain text as this is just a Proof of Concept. In a real world production scenario, the password needs to be cryptographically hashed through a set of Key + Hash algorithm and verified on authentication... but for the sake of use and changing the password to test it out, this doesn't use one.

## Testing 
There's a minimal test suit written in Mocha + Chai to support a few of the CRUD actions for the Tutorial Model. 

You can run `npm run test` to see it do it's thing. It will create a few records and then remove each one from the DB afterwards. The way this works is so each component has it's own individual Testing suite, Mocha will grab any files ending in "Testing.js" and will attempt to run them.

## Postman
Also, there's an included Postman Suite with all the available actions to execute in the `postman` folder. This has both the available authentications as well as the public and private endpoints for the Tutorial model. Be aware that attempting to use an user authentication for Updating/Creating/Deleting will result in a friendly message telling you that you don't have access to these actions.

## Limitations
Because the API is built using SQlite3, there is no "good" way of doing prepared statements on columns: This means that advanced filtering is not possible (filtering on a passed column and then grabbing only a value from that column). While this can be done by building the queries manually, not using prepared statements opens the door to SQL Injection attempts and it's a no-go for any modern API.

Instead, as to demonstrate some filtering with the tools at disposal, I have added a simple "limit" parameter to the List / Get All Items endpoint. You can access it by sending `?limit=20` to the API on the collection endpoint.

## Future Improvements
Getting Rid of SQLite3 would be the best option, as it limits the query possibilities compared to what MySQL or pSQL enable you to do, with the main offender being the missing ?? operator for prepared columns.

A more extensive test suite would be prefered as well, along with integration with the Code Coverage tool Instanbul. The issue with Istanbul right now is that ES6+ code doesn't work correctly without Babel, and building the code to commonjs through it seems like a waste of CPU and resources.

## Author
Built by Alfonso Carvallo as an example portfolio project, 2023.
