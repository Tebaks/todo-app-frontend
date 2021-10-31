# TODO APP FRONTEND

## Run
```
npm start
```
## Unit tests
```
npm run unit-test
```
## Acceptance tests
To run acceptance test first create env variable for mock server which is postman mock server:
```
REACT_APP_API_URL="https://f80c975b-8d9d-4f70-a017-e8e0c4b16bdb.mock.pstmn.io"
```
and then run application and:
```
npm run acceptance-test
```

## Development
-   First I write Acceptance test for "Show Header and List Todos".
-   Then I write unit test for "Should have `header` element" and "should shows a list of todos.".
-   Both unit test and acceptance test failed because there is no logic and ui behind it.
-   After that I Create 2 component "TodoContainer" and "Todos"
-   I added Header to TodoContainer and added elements to Todo component to show all todos one by one.
-   Unit tests are passed.
-   TodoContainer has to pass todoList to Todo component, so I create mock server using Postman and test with it.
-   I repeat all this steps for Add Todo feature.
-   Acceptance tests are passed.
-   Then I implement GetTodos and AddTodo feature to backend.

## CI/CD
For cicd I use github actions and deploy to heroku.
-   Create Heroku app for development and Add REACT_APP_API_URL environment variable for mock server.
-   Create Heroku app for production and Add REACT_APP_API_URL environment variable for production backend server.
## Github Actions
-   install node and dependencies
-   Run unit tests
-   Deploy application to development environment
-   Sleep for 1 minute to wait app ready
-   Run acceptance tests using mock server
-   Deploy to production environment

## Consumer Driven Contract
I search and partly learn how to implement consumer driven contract testing using pact.io. But when I try to create pacts I got this error.
```
cannot load such file -- rubygems.rb
```
Whatever I tried I couldn't fix it. I write contract tests anyway but it doesn't functional right now.