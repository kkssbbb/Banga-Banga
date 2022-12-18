const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Matching extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        matching_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        matching_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        matching_location: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        intialAutoIncrement: 1,
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Matchings",
        modelName: "Matching",
      }
    );
  }
  static associate(db) {
    db.Matching.belongsTo(db.User, {
      foreignkey: "userId",
      sourceKey: "user_id",
      onUpdate: "cascade",
    });
  }
};
