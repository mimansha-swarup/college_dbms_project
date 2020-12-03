const express = require("express");
const mysql = require("mysql");
const path = require('path');
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

dotenv.config({ path: "./.env" })

var app = express();




var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//parsing encoded html body
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.set('view engine', 'ejs');


app.use(express.static("public"));



mysqlConnection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("working\n")

    }
});


//routing
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));



app.listen(3000, () => console.log("start on port 3000"));