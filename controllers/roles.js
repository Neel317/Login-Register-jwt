const Users = require('../models/user');

const deleteUsers = async (users) => {
  try {
    const delCount = await Users.deleteMany(users);
    if(delCount){
      return delCount;
    }else{
      return -1;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = deleteUsers;