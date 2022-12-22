// import { Sequelize } from "sequelize";
import { TeamEvaluate } from "../db/models";
import { sequelize } from "../db/index";
class TeamEvaluateService {
  constructor(model) {
    this.TeamEvaluate = model;
  }
  async addEvaluate(evaluate) {
 
    const evaluates = await TeamEvaluate.create(evaluate);

    return evaluates;
  }
  async getEvaluates() {}

 
}

const teamEvaluateService = new TeamEvaluateService(TeamEvaluate);

export { teamEvaluateService };
