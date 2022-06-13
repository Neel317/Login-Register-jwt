//https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
//https://thinkster.io/tutorials/node-json-api/creating-the-user-model


require('dotenv').config();

const connectDB = require('./db/connect');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


async function start() {
  try {
    await connectDB(process.env.MONGO_URI).then(()=>console.log(`Connected to Database`));
    app.listen(() => {
      console.log(`Server started at ${port}`);
    }, port)
  } catch (error) {
    console.log(error);
  }
}
start();