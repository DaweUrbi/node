# MongoDB 101

## What is MongoDB?

A lot of people refer MongoDB as NoSQL Database (Not Structured Query Language) but what best defines MongoDB is Not Only SQL.

Also, it is classified as Non-Relational but the truth is that it can be used as Relational Database. It just stores differently.

MongoDB is a Document Database. Data is stored as BSON under the hood but represented as JSON

## Documents

Documents in MongoDB are JSON Objects.

Schema in MongoDB is optional.

Flexible data types.

```json
{
  "key1": "value",
  "key2": 2,
  "key3": true,
  "key4": [1, 2, 3, 4],
  "key5": {
    "a": 1,
    "b": 2,
    "c": 3
  }
}
```

## Pros and Cons

- Pros:

  - Scales very easily
  - Very cost effective
  - Faster to query data in most operations

- Cons:

  - Pretty easy to mess up with data
  - Less flexibility with querying (no JOINs)
  - Data size is typically higher

## How to use it?

- Create an account here:
  [MongoDB Atlas](https://www.mongodb.com/)
- Choose the Free Account (Shared)
- Keep the default configuration and click to create the cluster
- Once you get into the Database Deployments Page, you can click on `Network Access`.
- Click to add an IP Address and add your current IP Address.

## Connecting to the database

- Follow the steps to install:
  [MongoDB Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install)
- On MongoDB Atlas, you can click on `Connect` > `Connect with the MongoDB Shell`.
- To make sure you installed it, run `mongosh --version` on the terminal.
- Select the option `I have the MongoDB Shell installed`, copy the connection string and paste it into your terminal.

## Useful commands

[MongoDB Cheat Sheet](https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec)

- `db` - Show current database
- `show dbs` - Show all databases available
- `use <dbName>` - connects or create a new database
- `db.createCollection("<collectionName>")`
- `db.collectionName.insertOne({document:'data'});` - insert a new document
- `db.collectionName.insertMany([{document:'data'},{document:'data'} ]);` - insert multiple documents
- `db.collecitonName.find({condition:value})` - select data

## Additional ways to connect

- MongoDB Compass

  - On Atlas, you can click to `Connect` > `Connect using MongoDB Compass`.
  - Follow the steps.

- MongoDB for VS Code

  - On VS Code, search for MongoDB on the Extensions tab.
  - Install it.
  - On Atlas, you can click to `Connect` > `Connect using MongoDB Compass`.
  - Copy the connection string and paste it on VS Code.
  - Playgrounds are used in a similar way as MongoDB Shell.

- Connect to an application
  - On Atlas, you can click to `Connect` > `Connect your application`.
  - Check the box `Include full driver code example`
  - Copy the code and paste it in your `server.js` file.

## Exercise

- Create a new database using MongoDB
- Insert students and classes data into collections.
- Create a server to connect with the database.
- Create one route for each exercise (Day 1 - from 5 to 11) of Week Assignment Day 1. Each route should return the query result to the client.