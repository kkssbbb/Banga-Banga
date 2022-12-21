// import { Sequelize } from "sequelize";
import { TeamEvaluate } from "../db/models";
import { sequelize } from "../db/index";
class TeamEvaluateService {
  constructor(model) {
    this.TeamEvaluate = model;
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

const teamEvaluateService = new TeamEvaluateService(TeamEvaluate);

export { teamEvaluateService };
