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
    // console.log("Working?");

    // inquirer prompt for questions
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["Add a Department","Add a Role","Add an Employee","View All Departments","View All Roles","View ALL Employees by Department","View All Employees by Manager","Remove a Department","Remove a Role","Remove Employee","Update Employee Role","Update Employee Manager"]
        }
    ])
    .then( answer => {
        console.log(answer);
        if (answer.choice === "Add a Department") {
            console.log("Great! Let's add a department.");
            addDeptQuestions();
        }
        else if (answer.choice === "Add a Role") {
            console.log("Great! Let's add a Role.");
            addRoleQuestions();
        } 
        else if (answer.choice === "Add an Employee") {
            console.log("Great! Let's add an employee.");
            addEmployeeQuestions();
        }

    });
}

function addDeptQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which Department would you like to add?",
            name: "department",
            choices: ["Software","Marketing","Custodial","Management"]
        }
    ])
    .then(answer => {
        console.log(answer);
    });
}

function addRoleQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which Role would you like to add?",
            name: "role",
            choices: ["Engineer","Intern","Secretary"]
        }
    ])
    .then(answer => {
        console.log(answer);
    });
};

function addEmployeeQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the name of the employee?",
            name: "employee"
        }
    ])
    .then(answer => {
        console.log("The new employee's name is " + answer);
    });
};

