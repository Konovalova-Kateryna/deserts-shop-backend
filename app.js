const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const desertsRouter = require("./routes/api/deserts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/deserts", desertsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// const invokeAction = async ({ action, id, title, price }) => {
//   switch (action) {
//     case "read":
//       const allDeserts = await deserts.getAll();
//       return console.log(allDeserts);
//     case "getById":
//       const idDesert = await deserts.getById(id);
//       return console.log(idDesert);
//     case "add":
//       const newDesert = await deserts.add({
//         title,
//         category,
//         price,
//       });
//       return console.log(newDesert);
//     case "updateById":
//       const updateDesert = await deserts.updateById(id, {
//         title,

//         price,
//       });
//     case "deleteById":
//       const deleteDesert = await deserts.deleteById(id);
//       return console.log(deleteDesert);
//   }
// };

// // invokeAction({ action: "read" });
// // invokeAction({ action: "getById", id: 3 });
// // invokeAction({
// //   action: "add",
// //   title: "Passion fruit flavored macaroon",
// //   titleUa: "Макарун зі смаком маракуйя",
// //   price: 60,
// //   category: "macaroon",
// // });
// // invokeAction({
// //   action: "updateById",
// //   id: "Nu-4ZISh3c_TlY9QpuGBz",
// //   title: "Макарун зі смаком маракуйя",
// //   titleUa: "Макарун зі смаком маракуйя",
// //   price: 80,
// //   category: "macaroon",
// // });
// invokeAction({
//   action: "deleteById",
//   id: "Nu-4ZISh3c_TlY9QpuGBz",
// });
