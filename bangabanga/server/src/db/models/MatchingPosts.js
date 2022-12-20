const { Sequelize, DataTypes } = require("sequelize");

class MatchingPosts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        MatchingPosts_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "모집글ID",
        },
        // cafe_id: {
        //   type: DataTypes.BIGINT,
         
        //   comment: "카페id",
        // },
        // user_id: {
        //   type: DataTypes.BIGINT,
        //   comment: "회원ID",
        // },
        title: {
          type: DataTypes.STRING(30),
          comment: "제목",
          allowNull: false, //필수
        },
        content: {
          type: DataTypes.STRING(300),
          comment: "게시글내용",
          allowNull: false, //필수
        },
        matching_location: {
          type: DataTypes.STRING(30),
          comment: "세부지역",
          allowNull: false, //필수
        },
        matching_time: {
          type: DataTypes.STRING(30),
          comment: "접선시간",
          allowNull: false, //필수
        },
        view: {
          type: DataTypes.INTEGER,
          comment: "조회수",
          defaultValue: 0,
        },
      },
      {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "MatchingPost", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
  // static associate(db) { db.Post.belongsTo(db.User)};
}

export { MatchingPosts };
