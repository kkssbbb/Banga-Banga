import { Sequelize } from "sequelize";
import { MatchingPosts } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class MetchingPostService {
  constructor(model) {
    this.MatchingPosts = model;
  }

  //전체 게시글 조회  게시글 6개로 페이지네이션 -> 지역별로
  async getLocalDetailPosts(localDetail) {
    const query = `SELECT C.address, C.cafeName ,M.* FROM MatchingPost M   
    join CafeInformation C
       ON C.cafeId = M.cafeId
      where M.matchingLocation = "${localDetail}";
    `;
    const posts = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return posts;
  }

  // 전체 게시글 조회
  async getPosts() {
    const query = `select * from MatchingPost;
    `;
    const posts = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return posts;
  }

  // 본인 게시글만 조회
  async getUserPosts(userId) {
    const query = `select * from MatchingPost
    where user_id =${userId};`;

    const userPosts = await sequelize.query(query, { type: QueryTypes.SELECT });

    return userPosts;
  }

  //클릭한 게시글 조회
  async getClickPost(postId) {
    const query = `select M.* ,C.cafeName from MatchingPost M
    join CafeInformation C
    where matchingPostsId = ${postId} and M.cafeId = C.cafeId;
    `;
    const countQuery = ` update MatchingPost set view = view + 1 where matchingPostsId = ${postId};
    `;
    sequelize.query(countQuery, { type: QueryTypes.UPDATE });
    const result1 = sequelize.query(query, { type: QueryTypes.SELECT });

    return result1;
  }

  //모집 게시글 작성
  async postPost(postContent) {
    //console.log(postContent);
    //  const [title,peopleNum,themeName,matchStatus,matchingLocation,matchingTime,cafeId,userId] = [postContent];

    const result = MatchingPosts.create({
      title: postContent.title,
      peopleNum: postContent.peopleNum,
      themeName: postContent.themeName,
      matchStatus: postContent.matchStatus,
      matchingLocation: postContent.matchingLocation,
      matchingTime: postContent.matchingTime,
      cafeId: postContent.cafeId,
      userId: postContent.userId,
    });
    // console.log(result);

    return result;
  }

  //모집 게시글 수정
  async updatePost(postid, patchPost) {
    [patchPost] = patchPost;
    //title, peopleNum, matchStatus, matchingLocation, matchingTime, cafeId, userId
    console.log(patchPost.peopleNum);

    MatchingPosts.update(
      {
        title: patchPost.title,
        peopleNum: patchPost.peopleNum,
        themeName: patchPost.themeName,
        matchStatus: patchPost.matchStatus,
        matchingLocation: patchPost.matchingLocation,
        matchingTime: patchPost.matchingTime,
        cafeId: patchPost.cafeId,
        userId: patchPost.userId,
      },
      {
        where: { MatchingPosts_id: postid },
      }
    );
  }

  //모집 게시글 삭제
  async deletePost(postId) {
    MatchingPosts.destroy({
      where: { MatchingPosts_id: postId },
    });
  }
}

const metchingPostService = new MetchingPostService(MatchingPosts);

export { metchingPostService };
