require('dotenv').config();
const connectDB = require('./db/connect');
const Users = require('./models/user');
const mockData = require('./models/Mock-data.json');


const populating = async () => {
  await connectDB(process.env.MONGO_URI).then( () => console.log("Connected to DB")).catch((err) => console.log(err));
  try {
    await Users.deleteMany({});
    await Users.create(mockData);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
}
populating()