import { Router } from "express";
import { matchingSituationService } from "../services";
import { loginRequired } from "../middlewares";

const matchingSituationRouter = Router();

//모집글 참여신청
matchingSituationRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { matchingPostsId } = req.body;
    const participantsInfo = {
      userId,
      matchingPostsId,
    };
    const matchingSituation = await matchingSituationService.addParticipants(
      participantsInfo
    );
    res.status(200).json({ matchingSituation, message: "참여자 등록 성공" });
  } catch (error) {
    next(error);
  }
});
//모집글 참여신청취소
matchingSituationRouter.patch(
  "/:matchingPostsId",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { matchingPostsId } = req.params;
      const participantsInfo = {
        userId,
        matchingPostsId,
      };
      const matchingSituation =
        await matchingSituationService.deleteParticipants(participantsInfo);
      res.status(200).json({ matchingSituation, message: "신청취소 완료" });
    } catch (error) {
      next(error);
    }
  }
);
matchingSituationRouter.get("/", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const myPostInfo = await matchingSituationService.getMyPostInfo(userId);
    res.status(200).json(myPostInfo);
  } catch (error) {
    next(error);
  }
});
matchingSituationRouter.get(
  "/post/:matchingPostsId",
  async (req, res, next) => {
    try {
      const { matchingPostsId } = req.params;
      const PostInfo = await matchingSituationService.getPostInfo(
        matchingPostsId
      );
      res.status(200).json(PostInfo);
    } catch (error) {
      next(error);
    }
  }
);
matchingSituationRouter.get("/count", loginRequired, async (req, res, next) => {
  try {
    // const userId = req.currentUserId;
    const userId = 12;
    const myPostInfo = await matchingSituationService.getMyPostCount(userId);
    res.status(200).json(myPostInfo);
    console.log(myPostInfo);
  } catch (error) {
    next(error);
  }
});
matchingSituationRouter.get(
  "/myteam/:matchingPostId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { matchingPostsId } = req.params;
      const userId = req.currentUserId;
      const participantsInfo = {
        userId,
        matchingPostsId,
      };
      const myTeamInfo = await matchingSituationService.getMyTeamInfo(
        participantsInfo
      );
      res.status(200).json(myTeamInfo);
    } catch (error) {
      next(error);
    }
  }
);
matchingSituationRouter.patch(
  "/:matchingPostId",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { matchingPostId } = req.params;
      const updateInfo = { userId, matchingPostId };
      await matchingSituationService.updateIsEvaluate(updateInfo);
      res.status(200).json({ message: "팀원 평가 여부 수정 성공" });
    } catch {}
  }
);
export { matchingSituationRouter };
