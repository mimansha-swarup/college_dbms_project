// const usn = document.getElementById("usnSearch");
// const search = document.getElementById("search-btn");
// const a1 = document.getElementById("a1");
// const a2 = document.getElementById("a2");
// const a3 = document.getElementById("a3");


// const mysql = require("mysql");



// var mysqlConnection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });




// function showInfo() {

//     mysqlConnection.query(`select assignment1 ,assignment2 ,assignment3 from  student  where  usn = "${usn}"`, (error, results) => {



//         if (error) {
//             console.log(error);

//         } else {
//             console.log(results)
//             print(results)

//             a1.value = results.assignment1
//         }
//     });

// }
// search.addEventListener('click', showInfo)