const User = require("../db/models/user");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../db/index");

class UserService {
  constructor(model) {
    this.User = model;
  }

  async getUsers() {
    const query = `SELECT * FROM Users`;
    const users = await sequelize.query(query, {type : QueryTypes.SELECT});
    return users;
  }
}
const userService = new UserService(User);

module.exports = userService;
