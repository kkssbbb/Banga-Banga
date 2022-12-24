import { Router } from "express";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const usersRouter = Router();

//유저 정보 조회
usersRouter.get("/user", loginRequired, async (req, res, next) => {
  try {
    // const userId = req.currentUserId;
    const userId = 1;
    // console.log(userId);
    const currentUserInfo = await userService.getUserById(userId);

    res.status(200).json(currentUserInfo);
  } catch (err) {
    next(err);
  }
});

// usersRouter.get("/user", loginRequired, async (req, res, next) => {
//   try {
//     const userId = req.currentUserId;
//     // console.log(userId);
//     const currentUserInfo = await userService.getUserById(userId);

//     res.status(200).json(currentUserInfo);
//   } catch (err) {
//     next(err);
//   }
// });

usersRouter.post("/", async (req, res, next) => {
  try {
    const { userName, mobileNumber, email, nickName, password } = req.body;
    const userInfo = {
      userName,
      mobileNumber,
      email,
      nickName,
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

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});
//회원정보 수정
usersRouter.patch("/:userId", async (req, res, next) => {
  try {
    const {
      role,
      userName,
      mobileNumber,
      email,
      nickName,
      password,
      userIntro,
      gender,
      age,
      mbti,
      preferenceTheme,
      nonPreferenceTheme,
      preferenceLocation,
      escapeScore,
      matchingCount,
      mannerScore,
      profileImg,
    } = req.body;
    const userId = req.params.userId;
    const { checkPassword } = req.body;
    // const user = userService.getUserById(user_id);
    // user.user_name = req.body.user_name;
    // const userInfoRequired = {user_id, "비밀번호 확인"};
    //회원정보를 수정하려면 현재비밀번호 입력 필요!!!!!!
    const userInfoRequired = { userId, checkPassword };

    const updateData = {
      ...(role && { role }),
      ...(userName && { userName }),
      ...(mobileNumber && { mobileNumber }),
      ...(userName && { userName }),
      ...(mobileNumber && { mobileNumber }),
      ...(email && { email }),
      ...(nickName && { nickName }),
      ...(nickName && { nickName }),
      ...(password && { password }),
      ...(userIntro && { userIntro }),
      ...(userIntro && { userIntro }),
      ...(gender && { gender }),
      ...(age && { age }),
      ...(mbti && { mbti }),
      ...(preferenceTheme && { preferenceTheme }),
      ...(nonPreferenceTheme && { nonPreferenceTheme }),
      ...(preferenceLocation && { preferenceLocation }),
      ...(matchingCount && { matchingCount }),
      ...(mannerScore && { mannerScore }),
      ...(escapeScore && { escapeScore }),
      ...(profileImg && { profileImg }),
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
//회원정보 전체 조회
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
//회원 정보 삭제(update)
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.status(200).json({ message: "회원 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
