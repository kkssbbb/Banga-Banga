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
  async getPosts(localDetail) {
    const query = `select C.address, M.* from MatchingPost M   
    join CafeInformation C
       ON C.cafeId = M.cafeId
      where M.matchingLocation = "${localDetail}";
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
    const result = MatchingPosts.findOne({
      where: { matchingPostsId: postId },
    }).then((MatchingPosts) => MatchingPosts.increment("view", { view: 1 }));

    return result;
  }

  //모집 게시글 작성
  async postPost(postContent) {
    [postContent] = postContent;
    const result = MatchingPosts.create({
      title: postContent.title,
      content: postContent.content,
      matchingLocation: postContent.matchingLocation,
      matchingTime: postContent.matchingTime,
    });
  }

  //모집 게시글 수정
  async updatePost(postid, patchPost) {
    [patchPost] = patchPost;

    MatchingPosts.update(
      {
        title: patchPost.title,
        content: patchPost.content,
        matching_location: patchPost.matchingLocation,
        matching_time: patchPost.matchingTime,
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
