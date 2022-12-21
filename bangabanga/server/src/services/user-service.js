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
    const { user_name, mobile_number, email, nick_name, password } = user;
    console.log(user);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      user_name,
      mobile_number,
      email,
      nick_name,
      password: hashedPassword,
    };
    const newUser = await User.create(newUserInfo);

    return newUser;
  }
  //회원정보수정
  async updateUser(userInfoRequired, updateData) {
    const { user_id, checkPassword } = userInfoRequired;

    let user = await User.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new Error("가입 내역이 없습니다.");
    }
    const hashedPassword = user.password;
    // const isPasswordSame = await bcrypt.compare(checkPassword, hashedPassword);

    // if (!isPasswordSame) {
    //   throw new Error("비밀번호가 일치하지 않습니다.");
    // }
    // const { password } = updateData;
    // if (password) {
    //   const newHashedPassword = await bcrypt.hash(password, 10);
    //   updateData.password = newHashedPassword;
    //   console.log(newHashedPassword);
    // }
    const { escape_score } = updateData;
    console.log(updateData.escape_score);
    if (escape_score) {
      user.escape_score += escape_score;
    }
    user.save();
    console.log(user.escape_score);
    if (20 < user.escape_score && user.escape_score < 40) {
      updateData.tier = "silver";
    } else if (39 < user.escape_score && user.escape_score < 60) {
      updateData.tier = "gold";
    } else if (59 < user.escape_score && user.escape_score < 80) {
      updateData.tier = "platinum";
    } else if (79 < user.escape_score && user.escape_score < 101) {
      updateData.tier = "diamond";
    } else {
      updateData.tier = "diamond";
    }

    const userChanged = await User.update(updateData, {
      where: { user_id },
    });

    return userChanged;
  }

  async getUsers() {}

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

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      secretKey
    );

    return { token };
  }

  //유저정보 얻기
  async getUserById(id) {
    const user = await User.findOne({
      // where: { user_id: id },
      where: { user_id: id },
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
