const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes");
const connectDB = require("./src/connect");
require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

async function startServer() {
  try {
    await connectDB(process.env.DATABASE_URI);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
