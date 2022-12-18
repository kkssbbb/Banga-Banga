const models = require("./src/db/index");
const app = require("./src/app.js");

models.sequelize.sync().then( () => {
  console.log("DB 연결 성공");
  app.listen(3008)
  const PORT = process.env.PORT || 3008;
  console.log(`서버 정상 실행 http://localhost:${PORT}`)
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

// const PORT = process.env.PORT || 3008;

// app.listen(PORT, () => {
//     console.log(`서버 정상 실행 http://localhost:${PORT}`)
// })
