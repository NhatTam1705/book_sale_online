const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Handle Uncaught exception
process.on('uncaughtException',err =>{
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
})
// Setting up config file
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
//hadle unhandled promise pejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.group("Shutting down the server due to Unhandle Promise Projection");
  server.close(() => {
    process.exit(1);
  });
});
