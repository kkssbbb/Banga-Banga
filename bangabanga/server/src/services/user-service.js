import { Sequelize } from "sequelize";
import { User } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class UserService {
  constructor(model) {
    this.User = model;
  }

  async getUsers() {
    const query = `SELECT * FROM Users`;
    const users = await sequelize.query(query, { type: QueryTypes.SELECT });
    return users;
  }
}
const userService = new UserService(User);

export { userService };
