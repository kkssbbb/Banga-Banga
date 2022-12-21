import { Sequelize } from "sequelize";
import { CafeInformation } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class CafeInformationService {
  constructor(model) {
    this.CafeInformation = model;
  }
  async getCafesAll() {
    const query = `select * from CafeInformation
    inner join OperationInformation
    on CafeInformation.cafe_id = OperationInformation.cafe_id`;

    const cafeDatas = await sequelize.query(query, { type: QueryTypes.SELECT });

    return cafeDatas;
  }
  async getCafes() {
    const query = `select * from CafeInformation`;

    const cafeDatas = await sequelize.query(query, { type: QueryTypes.SELECT });

    return cafeDatas;
  }
}

const cafeInformationService = new CafeInformationService(CafeInformation);

export { cafeInformationService };
