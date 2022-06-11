const mongoose = require('mongoose');

function connectDB(URI){
  return mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}

module.exports = connectDB;