import { Router } from "express";
import { loginRequired } from "../middlewares";
import { cafeInformationService } from "../services";

const cafeInformationRouter = Router();

cafeInformationRouter.get("/all", async function (req, res, next) {
  const cafeInfos = await cafeInformationService.getCafesAll();
  try {
    res.status(200).json(cafeInfos);
  } catch (error) {
    next(error);
  }
});
cafeInformationRouter.get("/cafeOnly", async function (req, res, next) {
  const cafeInfos = await cafeInformationService.getCafes();
  try {
    res.status(200).json(cafeInfos);
  } catch (error) {
    next(error);
  }
});

export { cafeInformationRouter };
