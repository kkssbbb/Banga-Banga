import { Sequelize } from "sequelize";
import { MatchingPosts } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class MetchingPostService {
  constructor(model) {
    this.MatchingPosts = model;
  }

  //전체 게시글 조회  게시글 6개로 페이지네이션
  async getPosts(page, offset) {
    if (page >= 1) {
      offset = 6 * (page - 1);
    }
    const posts = await MatchingPosts.findAll({
      offset: offset,
      limit: 6,
    }); //페이지네이션
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
    console.log("아이디: ", postid, patchPost.title);

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
