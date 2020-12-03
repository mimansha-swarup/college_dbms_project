const mysql = require("mysql");



var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



exports.addTchr = (req, res) => {


    const { name, category, job, clas } = req.body;
    console.log(req.body);

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


    mysqlConnection.query("insert into assignment_marks set ?", { usn: usnS, name: nameS }, );
    mysqlConnection.query("insert into assignment_link set ?", { usn: usnS, name: nameS }, );
    mysqlConnection.query("insert into student set ?", { name: nameS, usn: usnS, branch: branchS, semester: semS, class: classS }, (error, results) => {



        if (error) {
            console.log(error);

        } else {

            return res.render('admin', {
                stumessage: "Done"
            });
        }
    });

}


exports.search = (req, res) => {

    const { usnSearch } = req.body;
    // console.log(req.body)

    mysqlConnection.query(`select * from  assignment_marks  where  usn = "${usnSearch}"`, (error, results) => {



        if (error) {
            console.log(error);

        } else {

            return res.render("teacher", {

                message: results[0]

            });
        }
    });


}
exports.updateMarks = (req, res) => {

    const objValue = Object.values(req.body);
    const usnU = objValue[0];
    const a1 = objValue[1];
    const a2 = objValue[2];
    const a3 = objValue[3];


    // console.log(req.body)
    // console.log(objValue)
    // console.log(objValue[0])
    if (a1 && a2 && a3) {
        mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change1: a1, change2: a2, change3: a3 });
        mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment1: a1, assignment2: a2, assignment3: a3 }, (error, results) => {

            if (error) {
                console.log(error);

            } else {
                return res.render("teacher", {
                    result: "Sucessfully Updated"
                })

            }
        });


    } else {
        if (a1) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change1: a1 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment1: a1 }, (error, results) => {

                if (error) {
                    console.log(error);

                } else {
                    return res.render("teacher", {
                        result: "Sucessfully Updated"
                    })

                }
            });

        }
        if (a2) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change2: a2 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment2: a2 }, (error, results) => {

                if (error) {
                    console.log(error);

                } else {
                    return res.render("teacher", {
                        result: "Sucessfully Updated"
                    })

                }
            });

        }
        if (a3) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change3: a3 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment3: a3 }, (error, results) => {

                if (error) {
                    console.log(error);

                } else {
                    return res.render("teacher", {
                        result: "Sucessfully Updated"
                    })

                }
            });
        }
    }

}

exports.getDetails = (req, res) => {

    const { usnSearch } = req.body;

    mysqlConnection.query(`select * from  student  where  usn = "${usnSearch}"`, (error, results) => {



        if (error) {
            console.log(error);

        } else {

            return res.render("student", {

                message: results[0]

            });
        }


    });


}

exports.remove = (req, res) => {
    const { usnSearch } = req.body;

    mysqlConnection.query(`delete from student where usn="${usnSearch}"`, (error, results) => {

        if (error) {
            console.log(error);
        } else {
            return res.render("teacher", {

                message: "Record Deleted"
            });
        }

    });
}