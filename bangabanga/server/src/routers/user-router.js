import { Router } from "express";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const { user_name, mobile_number, email, nick_name, password } = req.body;
    const userInfo = {
      user_name,
      mobile_number,
      email,
      nick_name,
      password,
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
    const user_id = req.params.id;
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
    const checkPassword = req.body.checkPassword;
    // const user = userService.getUserById(user_id);
    // user.user_name = req.body.user_name;
    // const userInfoRequired = {user_id, "비밀번호 확인"};
    //회원정보를 수정하려면 현재비밀번호 입력 필요!!!!!!

    const userInfoRequired = { user_id, checkPassword };

    const updateData = {
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
      ...(escape_score && { escape_score }),
    };
    const updateUserInfo = await userService.updateUser(
      userInfoRequired,
      updateData
    );
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
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.status(200).json({ message: "게시글 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
