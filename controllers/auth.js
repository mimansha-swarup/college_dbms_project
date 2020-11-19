const mysql = require("mysql");



var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req, res) => {


    const { name, category, email, password, passwordConfirm } = req.body;

    mysqlConnection.query('select email from user where email =?', [email], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            return res.render('register', {
                message: "That email is already registered"
            });
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: "password does not match"
            });

        }

        mysqlConnection.query("insert into user set ?", { name: name, category: category, email: email, pass: password }, (error, results) => {


            if (error) {
                console.log(error);

            } else {

                return res.render('register', {
                    message: "Done"
                });
            }
        })



    });

}