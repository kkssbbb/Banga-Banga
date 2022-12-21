import { Router } from "express";
import { metchingPostService } from "../services";

const metchingPostRouter = Router();

//지도로 보기에서 지역명(홍대)으로 get요청 api
metchingPostRouter.get("/:locationDetail", async (req, res, next) => {
  const locationDetail = req.params.locationDetail;

  try {
    const locationfilterPosts =
      await metchingPostService.getLocationfilterPosts(locationDetail);
    res.status(200).json(locationfilterPosts);
  } catch (error) {
    next(error);
  }
});

//게시글 전체 조회 (게시글 6개 페이지네이션)
metchingPostRouter.get("/:page", async (req, res, next) => {
  try {
    let page = req.params.page;
    let offset = 0;
    const posts = await metchingPostService.getPosts(page, offset);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//본인 게시글만 조회
metchingPostRouter.get("/:user_id", async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const userPosts = await metchingPostService.getUserPosts(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    next(error);
  }
});

//클릭한 게시글 조회
metchingPostRouter.get(
  "/read-post/:MatchingPosts_id",
  async (req, res, next) => {
    console.log("test22");

    try {
      const postId = req.params.MatchingPosts_id;
      const clickPost = await metchingPostService.getClickPost(postId);

      res.status(200).json(clickPost);
    } catch (error) {}
  }
);

//모집 게시글 쓰기
metchingPostRouter.post("/", async (req, res, next) => {
  const postContent = req.body;

  try {
    const users = await metchingPostService.postPost(postContent);
    res.status(200).json({ message: "게시글 작성 성공" });
  } catch (error) {
    next(error);
  }
});

//게시글 수정하기
metchingPostRouter.patch("/:matching_post_id", async (req, res, next) => {
  try {
    const postid = req.params.matching_post_id;
    const patchPost = req.body;

    const updatePost = await metchingPostService.updatePost(postid, patchPost);

    res.status(200).json({ message: "게시글 수정 성공" });
  } catch (error) {
    next(error);
  }
});

//게시글 삭제하기
metchingPostRouter.delete("/:matching_post_id", async (req, res, next) => {
  try {
    const postId = req.params.matching_post_id;
    await metchingPostService.deletePost(postId);
    res.status(200).json({ message: "게시글 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { metchingPostRouter };
