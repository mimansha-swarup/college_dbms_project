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






    mysqlConnection.query(`update student set ? where usn = ${usnU}`, { assignment1: a1, assignment2: a2, assignment3: a3 }, (error, results) => {



        if (error) {
            console.log(error);

        } else {
            return res.render('teacher')

        }
    });


}

exports.search = (req, res) => {

    const { usnSearch } = req.body;

    mysqlConnection.query(`select assignment1 ,assignment2 ,assignment3 from  student  where  usn = ${usnSearch}`, (error, results) => {



        if (error) {
            console.log(error);

        } else {
            console.log(results[0].assignment1)
            return res.render("teacher", {

                message: {
                    usn: usnSearch,
                    assignment1: results[0].assignment1,
                    assignment2: results[0].assignment2,
                    assignment3: results[0].assignment1,
                }

            });
        }
    });


}