const users = require("./../models/users");

async function createUser(params) {
  try {
    const user = new users(params);
    await user.save();
    return user;
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function getUser(params) {
  try {
    const user = await users.findOne(params).exec();
    return user;
  } catch (error) {
    console.log("Error while get user", error.message);
  }
  return null;
}

async function findUsers() {
  try {
    const users = await users.find().exec();
    return users;
  } catch (error) {
    console.log("Error while get all users for dashboard", error.message);
  }
}

async function deleteUser(params) {
  try {
    const user = await users.deleteUser(params);
    return user;
  } catch (error) {
    console.log("Error while get all users for dashboard", error.message);
  }
}

module.exports = {
  createUser,
  getUser,
  findUsers,
  deleteUser,
};
