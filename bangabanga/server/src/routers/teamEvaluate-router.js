import { Router } from "express";
import { loginRequired } from "../middlewares";
import { teamEvaluateService, userService } from "../services";
const teamEvaluateRouter = Router();

teamEvaluateRouter.post("/", async (req, res, next) => {
  try {
    const evaluateDatas = req.body;
    const evaluate = evaluateDatas.forEach(async (evaluateData) => {
      const {
        evaluateTargetId,
        evaluatorId,
        shortEvaluate,
        mannerEvaluate,
        escapeEvaluate,
      } = evaluateData;
      const evaluateInfo = {
        evaluateTargetId,
        evaluatorId,
        shortEvaluate,
        mannerEvaluate,
        escapeEvaluate,
      };
      await teamEvaluateService.addEvaluate(evaluateInfo);
      const score = { mannerEvaluate, escapeEvaluate };
      await userService.updateScore(score, evaluateTargetId);
    });
    res.status(200).json(evaluate)

    // const evaluate = await teamEvaluateService.addEvaluate(evaluateInfo);
    // res.status(200).json(evaluate);
    // const score = {mannerEvaluate, escapeEvaluate}
    // await userService.updateScore(score, evaluateTargetId)
  } catch (error) {
    next(error);
  }
});

export { teamEvaluateRouter };
