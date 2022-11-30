const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

app.listen(process.env.PORT, () => {
  console.log(`Process running at port ${process.env.PORT}`);
});
