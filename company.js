const inquirer = require("inquirer");
const mysql = require("mysql");
const console_table = require("console.table");

// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "company_db"
});

connection.connect( (err) => {
    if(err) throw err;
    beginQuestions();
});

// ask user initial questions 
function beginQuestions(){
    console.log("Working?");

    // inquirer prompt for questions
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["Add a department","Add a role","View ALL employees","View ALL Employees by Department","View All Employees by Manager","Add Employee","Remove Employee","Update Employee Role","Update Employee Manager"]
        }
    ])
    .then( answers => {
        console.log(answers);
    });
}