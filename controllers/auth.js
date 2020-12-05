const { render } = require("ejs");
const mysql = require("mysql");



var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//============================================================ADMIN=======================================================================

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

    mysqlConnection.query(`select exists(select usn from student where usn="${usnS}");`, (error, results) => {
        const isUsnExist = Object.values(results[0]);
        if (isUsnExist[0]) {

            return res.render('admin', {
                stumessage: "USN Already Exist"
            });
        } else {
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

    });


};

exports.getLog = (req, res) => {
    mysqlConnection.query("select * from log", (error, results) => {
        return res.render("admin", {
            logTable: results
        });

    });
}


//============================================================TEACHER=======================================================================


exports.search = (req, res) => {

    const { usnSearch } = req.body;
    // console.log(req.body)

    mysqlConnection.query(`select * from  assignment_marks  where  usn = "${usnSearch}"`, (error, results) => {



        if (error) {
            console.log(error);

        } else if (results[0]) {

            return res.render("teacher", {

                message: results[0]


            });
        } else {
            return res.render("teacher", {

                isError: true


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



    if (a1 && a2 && a3) {
        mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change1: a1, change2: a2, change3: a3 });
        mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment1: a1, assignment2: a2, assignment3: a3 }, (error, results) => {

            if (error) {
                console.log(error);

            } else if (results.affectedRows) {
                return res.render("teacher", {
                    isSuccess: "Sucessfully Updated"
                });

            } else {

                return res.render("teacher", {
                    isError: true
                });
            }
        });


    } else {

        if (a1) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change1: a1 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment1: a1 }, (error, results) => {

                if (error) {
                    console.log(error);

                } else if (results.affectedRows) {
                    return res.render("teacher", {
                        isSuccess: "Sucessfully Updated"
                    });

                } else {

                    return res.render("teacher", {
                        isError: true
                    });
                }
            });

        } else if (a2) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change2: a2 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment2: a2 }, (error, results) => {

                if (error) {
                    console.log(error);

                } else if (results.affectedRows) {
                    return res.render("teacher", {
                        isSuccess: "Sucessfully Updated"
                    });

                } else {

                    return res.render("teacher", {
                        isError: true
                    });
                }


            });

        } else if (a3) {
            mysqlConnection.query("insert into log set datetime = now(), ?", { usn: usnU, change3: a3 });
            mysqlConnection.query(`update assignment_marks set ? where usn = "${usnU}"`, { assignment3: a3 }, (error, results) => {
                if (error) {
                    console.log(error);

                } else if (results.affectedRows) {
                    return res.render("teacher", {
                        isSuccess: "Sucessfully Updated"
                    });

                } else {

                    return res.render("teacher", {
                        isError: "Sucessfully Updated"
                    });
                }
            });
        } else {


            return res.render("teacher", {
                isError: true
            });
        }

    }


}

exports.remove = (req, res) => {
    const { usnSearch } = req.body;

    mysqlConnection.query(`delete from assignment_link where usn="${usnSearch}"`);
    mysqlConnection.query(`delete from assignment_marks where usn="${usnSearch}"`);
    mysqlConnection.query(`delete from student where usn="${usnSearch}"`, (error, results) => {

        if (error) {
            console.log(error);
        } else if (results.affectedRows) {

            return res.render("teacher", {
                isSuccess: "Record Deleted"
            });

        } else {
            return res.render("teacher", {

                isError: true
            });
        }

    });
}

//===============================================================STUDENTS====================================================================



exports.getDetails = (req, res) => {

    const { usnSearch } = req.body;

    mysqlConnection.query(`select *
    from  student 
    inner join assignment_marks
    on student.usn=assignment_marks.usn 
    inner join assignment_link 
    on student.usn=assignment_link.usn 
    where student.usn="${usnSearch}"`, (error, results) => {




        if (error) {
            console.log(error);

        } else if (results[0]) {

            return res.render("student", {

                message: results[0]

            });

        } else {

            return res.render("student", {

                isError: true

            });
        }


    });

}
exports.addLink = (req, res) => {


    const objValue = Object.values(req.body);
    const usnSearch = objValue[0];
    const l = objValue[1];
    const driveLink = objValue[2];

    if (l == "link1" && driveLink) {
        mysqlConnection.query(`update  assignment_link set ? where  usn = "${usnSearch}"`, { link1: driveLink }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render("student", {
                    isSuccess: "Submitted Successfully"
                });
            }
        });

    } else if (l == "link2" && driveLink) {
        mysqlConnection.query(`update  assignment_link set ? where  usn = "${usnSearch}"`, { link2: driveLink }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render("student", {
                    isSuccess: "Submitted Successfully"
                });
            }
        });

    } else if (l == "link3" && driveLink) {
        mysqlConnection.query(`update  assignment_link set ? where  usn = "${usnSearch}"`, { link3: driveLink }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render("student", {
                    isSuccess: "Submitted Successfully"
                });
            }
        });

    } else {

        return res.render("student", {

            isError: true

        });
    }




}