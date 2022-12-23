// import { Sequelize } from "sequelize";
import { User } from "../db/models";
import { sequelize } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  constructor(model) {
    this.User = model;
  }
  //회원가입
  async addUser(user) {
    const { userName, mobileNumber, email, nickName, password } = user;
    console.log(user);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      userName,
      mobileNumber,
      email,
      nickName,
      password: hashedPassword,
    };
    const newUser = await User.create(newUserInfo);

    return newUser;
  }
  //회원정보수정
  async updateUser(userInfoRequired, updateData) {
    const { userId, checkPassword } = userInfoRequired;

    let user = await User.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error("가입 내역이 없습니다.");
    }
    const hashedPassword = user.password;
    const isPasswordSame = await bcrypt.compare(checkPassword, hashedPassword);

    if (!isPasswordSame) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    const { password } = updateData;
    if (password) {
      const newHashedPassword = await bcrypt.hash(password, 10);
      updateData.password = newHashedPassword;
      console.log(newHashedPassword);
    }
    const { escapeScore } = updateData;
    console.log(updateData.escapeScore);
    if (escapeScore) {
      user.escapeScore += escapeScore;
    }
    user.save();
    console.log(user.escapeScore);
    if (20 < user.escapeScore && user.escapeScore < 40) {
      updateData.tier = "silver";
    } else if (39 < user.escapeScore && user.escapeScore < 60) {
      updateData.tier = "gold";
    } else if (59 < user.escapeScore && user.escapeScore < 80) {
      updateData.tier = "platinum";
    } else if (79 < user.escapeScore && user.escapeScore < 101) {
      updateData.tier = "diamond";
    } else {
      updateData.tier = "diamond";
    }

    const userChanged = await User.update(updateData, {
      where: { userId },
    });

    return userChanged;
  }

  async updateScore(updateScore, evaluateTargetId) {
    const { mannerEvaluate, escapeEvaluate } = updateScore;
    let user = await User.findOne({
      where: { userId: evaluateTargetId },
    });
    console.log(user);
    if (!user) {
      throw new Error("회원 정보가 없습니다.");
    }
    console.log(escapeEvaluate, mannerEvaluate);
    user.escapeScore += escapeEvaluate;
    user.mannerEvaluate += mannerEvaluate;
    user.save();

    if (0 <= user.escapeScore && user.escapeScore <= 21) {
      user.tier = "bronze";
    } else if (20 < user.escapeScore && user.escapeScore < 40) {
      user.tier = "silver";
    } else if (39 < user.escapeScore && user.escapeScore < 60) {
      user.tier = "gold";
    } else if (59 < user.escapeScore && user.escapeScore < 80) {
      user.tier = "platinum";
    } else if (79 < user.escapeScore && user.escapeScore < 101) {
      user.tier = "diamond";
    } else {
      user.tier = "diamond";
    }
    user.save();
  }

  //로그인 시 token 전달
  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;
    const user = await User.findOne({
      where: { email: email },
      // attributes: ['user_id']
    });

    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    const hashedPassword = user.password; // db에 저장되어 있는 암호화된 비밀번호

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    console.log(hashedPassword);
    console.log;
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const accessKey = process.env.ACCESS_SECRET || "access-key";

    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      accessKey,
      { expiresIn: "1m" }
    );
    console.log(accessToken);
    const refreshKey = process.env.REFRESH_SECRET || "refresh-key";
    const refreshToken = jwt.sign(
      { userId: user.userId, role: user.role },
      refreshKey,
      { expiresIn: "7d" }
    );
    console.log(refreshToken);

    return { accessToken, refreshToken };
  }

  //유저정보 얻기
  async getUserById(id) {
    const user = await User.findOne({
      // where: { user_id: id },
      where: { userId: id },
      // attributes: ['user_id'],
    });
    return user;
  }
  async getUserByEmail(email) {
    const user = await User.findOne({
      // where: { user_id: id },
      where: { email: email },
      // attributes: ['user_id'],
    });
    return user;
  }
  async deleteUser(id) {
    User.destroy({
      where: { user_id: id },
    });
  }
}

const userService = new UserService(User);

export { userService };
