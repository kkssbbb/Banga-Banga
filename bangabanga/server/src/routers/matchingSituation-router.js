import { Router } from "express";
import { matchingSituationService } from "../services";

const matchingSituationRouter = Router();

matchingSituationRouter.post("/", async (req, res, next) => {
  try {
    const { participantsId, matchingPostId } = req.body;
    const participantsInfo = {
      participantsId,
      matchingPostId,
    };
    const matchingSituation = await matchingSituationService.addParticipants(
      participantsInfo
    );
    res.status(200).json(matchingSituation);
  } catch (error) {
    next(error);
  }
});

export { matchingSituationRouter };
