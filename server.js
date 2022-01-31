const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });

// middleware
const notFoundMiddleware = require('./middleware/not-found');

app.use(notFoundMiddleware);

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>{
      dbo.connectToServer(function (err) {
        if (err) console.error(err);
      })

      console.log(`Server is listening on port ${port}...`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();