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
   
    
    const recruiting = [] //현재모집중인 
   
    //카페정보테이블 ,모집글 조회해서
    //조건1 필터링하기
    //조건2 필터링하기
    //recruitingNum  모집중인 공고 개수 구하기
    // const cafeInformations = await CafeInformation.findAll({
    //  attributes: ['cafe_id','cafe_name','latitude','longitude']
    // });
    // const matchingPosts = await MatchingPosts.findAll({
    //   attributes: ['cafe_id','matching_time']
    //  });
    //  console.log('cafeInformations : ', cafeInformations);
    //  console.log('matchingPosts : ', matchingPosts);
  const query =  `  SELECT C.cafeId, C.cafeName, C.locationDetail ,C.lat, C.lng FROM CafeInformation C
  JOIN  MatchingPost P 
    ON C.cafeId = P.cafeId
    where C.locationDetail = '${locationDetail}';  `
     const matchingPosts = await sequelize.query(query, { type: QueryTypes.SELECT });
     

    
    return matchingPosts;
  }
}

const mapPostService = new MapPostService(MatchingPosts, CafeInformation);

export { mapPostService };
  