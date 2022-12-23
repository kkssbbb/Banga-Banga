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
cafeInformationRouter.get("/cafeAll/:page", async function (req, res, next) {
  const page = req.params.page;
  const offset = 0;
  const cafeInfos = await cafeInformationService.getCafes(page, offset);
  try {
    res.status(200).json(cafeInfos);
  } catch (error) {
    next(error);
  }
});
cafeInformationRouter.get(
  "/cafeDetail/:location",
  async function (req, res, next) {
    // const location = req.params.page;
    const location = req.params.location;
    const cafeInfos = await cafeInformationService.getCafesDetail(location);
    try {
      res.status(200).json(cafeInfos);
    } catch (error) {
      next(error);
    }
  }
);

export { cafeInformationRouter };
