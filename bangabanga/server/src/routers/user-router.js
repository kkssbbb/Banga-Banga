import { Router } from "express";
import { loginRequired } from "../middlewares";
import * as userService from "../services";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const {
      role,
      user_name,
      mobile_number,
      email,
      nick_name,
      password,
      is_withdrawal,
    } = req.body;
    console.log(req.body);
    const userInfo = {
      role,
      user_name,
      mobile_number,
      email,
      nick_name,
      password,
      is_withdrawal,
    };
    const user = await userService.addUser(userInfo);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:id", async (req, res, next) => {
  try {
    // const user_id = req.params.user_id;
    const user_id = 2;
    const role = req.body.role;
    const user_name = req.body.user_name;
    const mobile_number = req.body.password;
    const email = req.body.email;
    const nick_name = req.body.nick_name;
    const password = req.body.password;
    const user_intro = req.body.user_intro;
    const gender = req.body.gender;
    const age = req.body.age;
    const mbti = req.body.mbti;
    const preference_theme = req.body.preference_theme;
    const non_preference_theme = req.body.non_preference_theme;
    const preference_location = req.body.preference_location;
    const rating_score = req.body.rating_score;
    const escape_score = req.body.escape_score;
    const matching_count = req.body.matching_count;
    const manner_evaluate = req.body.manner_evaluate;
    //is_withdrawal은 삭제 예정.
    const is_withdrawal = req.body.is_withdrawal;

    // const user = userService.getUserById(user_id);
    // user.user_name = req.body.user_name;
    // const userInfoRequired = {user_id, "비밀번호 확인"};
    //회원정보를 수정하려면 현재비밀번호 입력 필요!!!!!!
    const toUpdate = {
      ...(role && { role }),
      ...(user_name && { user_name }),
      ...(mobile_number && { mobile_number }),
      ...(email && { email }),
      ...(nick_name && { nick_name }),
      ...(password && { password }),
      ...(user_intro && { user_intro }),
      ...(gender && { gender }),
      ...(age && { age }),
      ...(mbti && { mbti }),
      ...(preference_theme && { preference_theme }),
      ...(non_preference_theme && { non_preference_theme }),
      ...(preference_location && { preference_location }),
      ...(rating_score && { rating_score }),
      ...(matching_count && { matching_count }),
      ...(manner_evaluate && { manner_evaluate }),
      ...(escape_score && { manner_evaluate }),
      ...(is_withdrawal && { is_withdrawal }),
    };
    const updateUserInfo = await userService.updateUser(user_id, toUpdate);
    res.status(200).json(updateUserInfo);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await userService.getUserById(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
