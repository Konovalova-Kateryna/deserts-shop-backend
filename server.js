const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Kateryna:BXyjmtNX34PQwyEW@cluster0.tgfn5.mongodb.net/deserts_shop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
    console.log("Server runing, base connected ");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
