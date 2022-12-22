const { Sequelize, DataTypes } = require("sequelize");

class TeamEvaluate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        teamEvaluateId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        evaluatorId: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        evaluateTargetId: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        shortEvaluate: {
          type: DataTypes.STRING(300),
          allowNull: true,
          defaultValue: "재미있었습니다!",
        },
        mannerEvaluate: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        escapeEvaluate: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "TeamEvaluates",
        modelName: "TeamEvaluate",
        paranoid: true,
      }
    );
  }

  // static associate(db) {
  //   db.User.hasMany(db.Matching, {
  //     foreignkey: "create_id",
  //     sourceKey: "user_id",
  //     onUpdate: "cascade",
  //   });
  // }
}
export { TeamEvaluate };
