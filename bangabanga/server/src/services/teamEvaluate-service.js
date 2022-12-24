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
  async getMyShortEvaluate(userId) {
    const myShortEvaluate = await TeamEvaluate.findAll({
      where: { evaluateTargetId: userId },
      attributes: ["evaluateTargetId", "shortEvaluate", "createdAt", "evaluatorId"],
    });
    return myShortEvaluate;
  }
}

const teamEvaluateService = new TeamEvaluateService(TeamEvaluate);

export { teamEvaluateService };
