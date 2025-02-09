import express from "express";
const app = express();
const port = 7000;

app.listen(port, function () {
  console.log("App is running at port ", port);
});
