const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName:{
    type: String,
    default: null
  },
  lastName:{
    type: String,
    default: null
  },
  email:{
    type: String,
    required:[true, 'Please Enter Email'],
    unique: true
  },
  password:{
    type: String
  },
  token:{
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema);