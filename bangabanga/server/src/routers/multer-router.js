
module.exports = app => {
    const db = require("../models");
    const Image = db.images;
    const upload = require("../middleware/upload");
    const fs = require("fs");
    const multer = require("multer");
  
    var router = require("express").Router();
  
    router.post("/upload", upload, async (req, res, next) => {
      try {
        // blob형태를 base64로 변환
        const imgData = fs
          .readFileSync(`app${req.file.path.split("app")[1]}`)
          .toString("base64");
  
        // db에 path 저장
        await Image.create({ path: imgData });
  
        res.json({ path: imgData });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    });
  
    app.use("/api/", router);
  };
   