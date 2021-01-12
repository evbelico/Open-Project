# Open Project's Back-end

## Hello Margot :D

<br/>

### To update the server's packages, run : `npm i`

### To build the server's code (it will go inside the **dist** folder and generate javascript from TypeScript), run : `tsc`

_^ (if it fails, try : `npx tsc`)_

### To run the server (TypeScript) and watch for changes (using nodemon), run : `npm run start:watch`

<br/>

### The server is running on : http://localhost:4001/

### The apollo graphql endpoint is located at : http://localhost:4001/graphql

_^ You can test operations from there (**queries**, **mutations**, **subscriptions**... Just like CRUD operations)_

<br/>

### The credentials for the PostgreSQL database and other useful aliases are located at : **src/.env**

### The GraphQL Schema is located at : **src/graphql/schema.graphql**

^ _Feel free to update it according to the PostgreSQL database architecture, if needed. <br/> Also feel free to update the PostgreSQL database architecture according to your needs._

<br/>

### Database instanciation (using Sequelize ORM) is located at : **src/db/database.ts**

### All the database (Sequelize) models are located inside : **src/models/[_'modelName'_].ts**

^ _They are all exported as a single **models** entity inside **src/models/index.ts**_

<br/>

### _For better comfort, don't hesitate to install Apollo GraphQL, ESLint, GraphQL and Prettier VSCode extensions ^^_
