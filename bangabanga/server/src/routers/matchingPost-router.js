import { Router } from "express";
import { metchingPostService } from "../services";

const metchingPostRouter = Router();



//게시글 전체 조회
metchingPostRouter.get("/", async (req, res, next) => {
   
    
  try {
    const posts = await metchingPostService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});



//본인 게시글만 조회 미완성
metchingPostRouter.get("/213", async (req, res, next) => {
    try {
      const userPosts = await postService.getPost();
      res.status(200).json(userPosts);

    } catch (error) {
      next(error);
    }
  });

  //모집 게시글 쓰기 
  metchingPostRouter.post("/", async (req, res, next) => {

     const postContent  = req.body;

    try {
      const users = await metchingPostService.postPost(postContent);
      res.status(200).json({"message" : "게시글 작성 성공"});
    } catch (error) {
      next(error);
    }
  });

//게시글 수정하기
metchingPostRouter.patch("/:matching_post_id", async(req,res,next) => {
   
    try{
        const postid = req.params.matching_post_id;
        const patchPost = req.body;


        const updatePost = await metchingPostService.updatePost(
            postid,
            patchPost)

            res.status(200).json({"message" : "게시글 수정 성공"});
    }catch(error){
        next(error);
    }
})

//게시글 삭제하기
metchingPostRouter.delete("/:matching_post_id", async(req,res,next)=>{
    try {
        const postId = req.params.matching_post_id
        await metchingPostService.deletePost(postId)
        res.status(200).json({"message": "게시글 삭제 성공"})
    } catch (error) {
        next(error);
    }
})

export { metchingPostRouter };