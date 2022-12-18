const express = require("express");
const errorHandler = require('./middlewares/error-handler')
const app = express();
const usersRouter = require('./routers/user-router')
/* GET home page. */

app.get("/", async function (req, res, next) {
  res.send("hello, wolrd!");
});
// CORS 에러 방지
// app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
// app.use(viewsRouter);

app.use('/api/users', usersRouter);
// app.use('/api/matchings', matchingsRouter);
app.use(errorHandler);

module.exports = app;
