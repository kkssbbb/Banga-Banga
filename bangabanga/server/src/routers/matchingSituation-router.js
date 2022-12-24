import { Router } from "express";
import { matchingSituationService } from "../services";

const matchingSituationRouter = Router();

matchingSituationRouter.post("/", async (req, res, next) => {
  try {
    const { participantsId, matchingPostsId } = req.body;
    const participantsInfo = {
      participantsId,
      matchingPostsId,
    };
    const matchingSituation = await matchingSituationService.addParticipants(
      participantsInfo
    );
    res.status(200).json(matchingSituation);
  } catch (error) {
    next(error);
  }
});
matchingSituationRouter.get("/", async (req, res, next) => {
  try {
    // const userId = req.currentUserId;
    const userId = 1;
    const myPostInfo = await matchingSituationService.getMyPostInfo(userId);
    res.status(200).json(myPostInfo);
  } catch (error) {
    next(error);
  }
});
matchingSituationRouter.get("/count", async (req, res, next) => {
  try {
    // const userId = req.currentUserId;
    const userId = 1;
    const myPostInfo = await matchingSituationService.getMyPostCount(userId);
    res.status(200).json(myPostInfo);
  } catch (error) {
    next(error);
  }
});
matchingSituationRouter.get("/myteam", async (req, res, next) => {
  try {
    // const { userId, matchingPostsId } = req.body;
    const userId = 1;
    const matchingPostsId = 7;
    const participantsInfo = {
      userId,
      matchingPostsId,
    };
    const myTeamInfo = await matchingSituationService.getMyTeamInfo(participantsInfo);
    res.status(200).json(myTeamInfo);
  } catch (error) {
    next(error);
  }
});

export { matchingSituationRouter };
