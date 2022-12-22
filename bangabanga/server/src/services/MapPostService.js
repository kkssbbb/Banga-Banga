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
    // const cafeInformations = await CafeInformation.findAll({
    //  attributes: ['cafe_id','cafe_name','latitude','longitude']
    // });
    // const matchingPosts = await MatchingPosts.findAll({
    //   attributes: ['cafe_id','matching_time']
    //  });
    //  console.log('cafeInformations : ', cafeInformations);
    //  console.log('matchingPosts : ', matchingPosts);


    const query = ` SELECT count(C.cafeId) as recruitingNum, C.cafeId, C.cafeName, C.locationDetail ,C.lat, C.lng FROM CafeInformation C
  JOIN  MatchingPost P 
    ON C.cafeId = P.cafeId
    where C.locationDetail = '${locationDetail}' and P.matchingTime > date_format(curdate(),'%Y%M%H%i' );`;
    const matchingPosts = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    console.log(matchingPosts[0].recruitingNum);
    
    if(matchingPosts[0].recruitingNum === 0){
     return   `현재 ${locationDetail} 지역은 모집중인 카페가 없습니다`
    }


    return matchingPosts;
  }

//2. 마커클릭했을 떄 옆에 해당 카페에 등록되어있는 모집공고 보여주기 API
  async getCafePosts(cafeId) {
    const query = ` SELECT * FROM MatchingPost P 
    where  P.cafeId = ${cafeId} and P.matchingTime > date_format(curdate(),'%Y%M%H%i' );`;
      const cafePosts = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return cafePosts;

  }
}

const mapPostService = new MapPostService(MatchingPosts, CafeInformation);

export { mapPostService };
