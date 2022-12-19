import { Router } from "express";
import { userService } from "../services";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
