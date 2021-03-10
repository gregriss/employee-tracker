// require inquirer, mysql, and console.table packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const console_table = require('console.table');
// requiring class constructors for department, role, and employee
const department = require('./assets/department');
const role = require('./assets/role');
const employee = require('./assets/employee');

// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "company_db"
});

connection.connect( (err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log("Connected as ID " + connection.threadId);
    beginQuestions();
});

// ask user initial questions 
function beginQuestions(){

    // inquirer prompt for questions
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "begin",
            choices: ["Add a Department","Add a Role","Add an Employee","View All Departments","View All Roles","View ALL Employees by Department","View All Employees by Manager","Remove a Department","Remove a Role","Remove Employee","Update Employee Role","Update Employee Manager"]
        }
    ])
    .then( answer => {
        console.log(answer);
        if (answer.begin === "Add a Department") {
            console.log("Great! Let's add a department.");
            addDepartmentQuestions();
        }
        else if (answer.begin === "Add a Role") {
            console.log("Great! Let's add a Role.");
            addRoleQuestions();
        } 
        else if (answer.begin === "Add an Employee") {
            console.log("Great! Let's add an employee.");
            addEmployeeQuestions();
        }
        else if (answer.begin === "View All Departments") {
            console.log("Here are all the Departments");
            viewDepartments();
        }

    });
};

function addDepartmentQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which Department would you like to add?",
            name: "department",
            choices: ["Management","Software","Production","Sales","Marketing","Purchasing","Human Resources"]
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
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        }
    ])
    .then(answers => {
        console.log(answers.role);
        console.log(answers.salary);
    });
};

function addEmployeeQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the employee's first name?",
            name: "first"
        },
        {
            type: "input",
            message: "What's the employee's last name?",
            name: "last"
        }
    ])
    .then(answers => {
        console.log("The new employee's name is " + answers.first + " " + answers.last);
    });
};

function viewDepartments() {
    
}