import { Sequelize, DataTypes } from "sequelize";

class MatchingSituation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        recruitmentStatusId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "모집현황ID",
        },
        recruitmentStatus: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          commet: "모집현황 수",
        },
        isFinish: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "평가 완료 여부",
        },

        //   matching_post_id: {
        //     type: DataTypes.BIGINT,
        //     comment: "모집글ID",
        //   },
      },
      {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "MatchingSituation", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
  static associate(db) {
    db.MatchingSituation.belongsTo(db.MatchingPosts, {
      foreignKey: "matchingPostsId",
      sourceKey: "matchingPostsId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export { MatchingSituation };
