const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name:{
    type: String,
    default: null
  },
  last_name:{
    type: String,
    default: null
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  password:{
    type: String,
    required:[true, 'Please enter Password'],
    minLength:[6, 'Password lenght cannot be less than 6'],
    maxLength:[12, 'Password cannot exceed 12']
  },
  DOB:{
    type: Date
  },
  age:{
    type: Number
  },
  token:{
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema);