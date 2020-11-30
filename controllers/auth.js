const mysql = require("mysql");



var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



exports.addTchr = (req, res) => {


    const { name, category, job, clas } = req.body;

    mysqlConnection.query("insert into teacher_details set ?", { name: name, category: category, job: job, class: clas }, (error, results) => {



        if (error) {
            console.log(error);

        } else {

            return res.render('admin', {
                message: "Done"
            });
        }
    });
}

exports.addStud = (req, res) => {
    const { nameS, usnS, branchS, semS, classS } = req.body;

    mysqlConnection.query("insert into student set ?", { name: nameS, usn: usnS, branch: branchS, semester: semS, class: classS }, (error, results) => {



        if (error) {
            console.log(error);

        } else {

            return res.render('admin', {
                message: "Done"
            });
        }
    });

}

exports.updateMarks = (req, res) => {

    const { usnU, a1, a2, a3 } = req.body;




    mysqlConnection.query(`select assignment1 ,assignment2 ,assignment3 from  student  where  usn = ${usnU}`, (error, results) => {

        const aa1 = document.getElementById("a1");
        const aa2 = document.getElementById("a2");
        const aa3 = document.getElementById("a3");

        if (error) {
            console.log(error);

        } else {
            console.log("-------------------------results1-------------------------\n");
            console.log(results);
            console.log("-------------------------results1-------------------------\n");


            aa1.value = results.assignment1
            aa2.value = results.assignment2
            aa3.value = results.assignment3
        }
    });







    mysqlConnection.query(`update student set ? where usn = ${usnU}`, { assignment1: a1, assignment2: a2, assignment3: a3 }, (error, results) => {



        if (error) {
            console.log(error);

        } else {
            console.log("-------------------------results-------------------------\n");
            console.log(results);
            console.log("-------------------------results-------------------------\n");




        }
    });


}