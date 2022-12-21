const { Sequelize, DataTypes } = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "일반회원",
        },
        user_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        mobile_number: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        nick_name: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        user_intro: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM("남성", "여성"),
          allowNull: true,
        },
        age: {
          type: DataTypes.ENUM("10대", "20대", "30대", "40대"),
          allowNull: true,
        },
        mbti: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        preference_theme: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        non_preference_theme: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        preference_location: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        rating_score: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        tier: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "bronze",
        },
        escape_score: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        matching_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        manner_evaluate: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 50,
        },
        created_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },
      },
      {
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users",
        paranoid: true,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.MatchingPosts, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}
export { User };
