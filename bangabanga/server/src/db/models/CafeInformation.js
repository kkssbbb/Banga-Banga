import { Sequelize, DataTypes } from "sequelize";

//카페정보 테이블
class CafeInformation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        cafe_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "카페정보ID",
        },
        location: { 
          type: DataTypes.STRING(10),
          comment: '지역 대분류(서울)',
        },
        location_delete: {
          type: DataTypes.STRING(10),
          comment: '지역 소분류(홍대,건대 등등)',
         },
        cafe_name: {
          type: DataTypes.STRING(30),
          comment: '매장이름',
         },
        star_rate: {
          type: DataTypes.DECIMAL(4,2),
          comment: '별점점수 4.23',
         },
        reviews_sum: {
          type: DataTypes.INTEGER,
          comment: '매장 별점',
         },
        address: { 
          type: DataTypes.STRING(20),
          comment: '매장 주소',
        },
        latitude: { 
          type: DataTypes.STRING(5),
          comment: '매장 위도',
        },
        longitude: { 
          type: DataTypes.STRING(5),
          comment: '매장 경도'
        },
       
      },
      {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "CafeInformation", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
  // static associate() {}
}

export { CafeInformation };
