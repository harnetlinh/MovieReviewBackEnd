const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require("./Routes/routes.js");
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use(dotenv);
app.use("/",routes);

app.listen(process.env.PORT,() =>{
    console.log("Server Is Running " + process.env.PORT);
   console.log(process.env.PORT);
})