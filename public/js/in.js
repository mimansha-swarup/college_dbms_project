// const usn = document.getElementById("usn").value;
// 

// const mysql = require("mysql");



// var mysqlConnection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });




// function showInfo() {

//     mysqlConnection.query(`select assignment1 ,assignment2 ,assignment3 from  student  where  usn = ${usn}`, (error, results) => {



//         if (error) {
//             console.log(error);

//         } else {

//             a1.value = results.assignment1
//         }
//     });

// }