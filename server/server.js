const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// setting up congif file
dotenv.config({ path: "config/config.env" });

// connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
