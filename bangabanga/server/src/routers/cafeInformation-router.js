import { Router } from "express";
import { loginRequired } from "../middlewares";
import { cafeInformationService } from "../services";

const cafeInformationRouter = Router();

cafeInformationRouter.get("/", async function (req, res, next) {
  //  로그인인증미들웨어 잠시 삭제함.
  try {
    // 전체 사용자 목록을 얻음
    const cafeInfos = await cafeInformationService.getCafes();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(cafeInfos);
  } catch (error) {
    next(error);
  }
});

export { cafeInformationRouter };
