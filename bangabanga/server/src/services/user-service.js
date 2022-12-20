// import { Sequelize } from "sequelize";
import { User } from "../db/models";
import { sequelize } from "../db/index";
import bcrypt from "bcrypt";

export async function addUser(user) {
  const {
    role,
    user_name,
    mobile_number,
    email,
    nick_name,
    password,
    is_withdrawal,
  } = user;
  console.log(user);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserInfo = {
    role,
    user_name,
    mobile_number,
    email,
    nick_name,
    password: hashedPassword,
    is_withdrawal,
  };
  const newUser = await User.create(newUserInfo);

  return newUser;
}

export async function updateUser(id, toUpdate) {
  const user_id = id;
  console.log(user_id)
  const userChanged = await User.update(toUpdate, {
    where: { user_id },
  });
  return userChanged;
}

export async function getUsers() {}

export async function getUserToken(loginInfo) {
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
    throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
  }

  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

  const token = jwt.sign({ user_id: user.user_id, role: user.role }, secretKey);

  return { token };
}

export async function getUserById(id) {
  const user = await User.findOne({
    // where: { user_id: id },
    where: { user_id: id },
    // attributes: ['user_id'],
  });
  return user;
}
