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
    on CafeInformation.cafeId = OperationInformation.cafeId`;

    const cafeDatas = await sequelize.query(query, { type: QueryTypes.SELECT });

    return cafeDatas;
  }
  async getCafes(page, offset) {
    if (page >= 1) {
      offset = 9 * (page - 1);
    }
    const cafeDatas = await CafeInformation.findAll({
      offset: offset,
      limit: 9,
    });
    return cafeDatas;
  }
  async getCafesDetail(page, offset, location) {
    if (page >= 1) {
      offset = 9 * (page - 1);
    }
    const cafeDatas = await CafeInformation.findAll({
      where: { locationDetail: location },
      offset: offset,
      limit: 9,
    });
    return cafeDatas;
  }
}

const cafeInformationService = new CafeInformationService(CafeInformation);

export { cafeInformationService };
