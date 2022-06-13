require('dotenv').config()
const connectDB = require('./connect');
const User = require('../models/user');

const ageCalculator = async () => {
  console.log(process.env.MONGO_URI);
  await connectDB(process.env.MONGO_URI).then( () => console.log("Connected to DB")).catch((err) => console.log(err));
  try {
    const query = await User.find({});
    console.log(query);
  } catch (error) {
    
  }
}
ageCalculator();