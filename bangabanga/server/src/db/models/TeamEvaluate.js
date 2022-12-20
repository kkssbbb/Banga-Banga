const { Sequelize, DataTypes } = require("sequelize");

class TeamEvaluate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        teamEvaluate_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        rater_id: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        short_evaluate: {
          type: DataTypes.STRING(300),
          allowNull: true,
          defaultValue: "재미있었습니다!",
        },
        manner_evaluate: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        escape_evaluate: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        intialAutoIncrement: 1,
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
