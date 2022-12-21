import { Sequelize } from "sequelize";
import { MatchingPosts, CafeInformation } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class MapPostService {
  constructor(model) {
    this.MapPostService = model;
  }

  //지도로 보기에서 지역명(홍대)으로 get요청 api
  async getLocationfilterPosts(locationDetail) {
 
    //카페정보테이블 ,모집글 조회해서
    //조건1 필터링하기
    //조건2 필터링하기
    //recruitingNum  모집중인 공고 개수 구하기
    const cafeInformations = await CafeInformation.findAll({
      attributes: ['latitude','longitude','cafe_name','cafe_id']
    });
    return cafeInformations;
  }
}

const mapPostService = new MapPostService(MatchingPosts, CafeInformation);

export { mapPostService };
