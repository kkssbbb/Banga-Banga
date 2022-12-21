"use strict";
import Sequelize from "sequelize";
import { User, MatchingPosts } from "./models";


const env = process.env.NODE_ENV || "development"; //개발용 환경 설정 배포 시 production으로 바꾸면 됨
const config = require("../config/config.js")[env]; //Sequelize 설정 파일
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize; //db객체에 sequelize 인스턴스 넣기
db.Sequelize = Sequelize; //db객체에 Sequelize 패키지 넣기

db.TeamEvaluate = TeamEvaluate;
db.User = User;
db.MatchingPosts = MatchingPosts;
db.MatchingSituation =MatchingSituation;
db.CafeInformation =CafeInformation;
db.OperationInformation =OperationInformation;


// User.init(sequelize);
User.init(sequelize);
MatchingPosts.init(sequelize);

// User.associate(db);
//MatchingPosts.associate(db);

export { db, sequelize };
