//https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
//https://thinkster.io/tutorials/node-json-api/creating-the-user-model


require('dotenv').config();
require('express-async-errors');

const connectDB = require('./db/connect');
const {notFound, errorHandling} =require('./middleware/404&error');
const routes = require('./routes/routes');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/', routes);

app.use(notFound, errorHandling);
async function start() {
  try {
    await connectDB(process.env.MONGO_URI).then(() => console.log("Connected to DB.."));
    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}
start();