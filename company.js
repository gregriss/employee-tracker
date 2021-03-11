// require inquirer, mysql, and console.table packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const console_table = require('console.table');
// requiring class constructors for department, role, and employee
const Department = require('./assets/department');
const Role = require('./assets/role');
const Employee = require('./assets/employee');
// const { createPromptModule } = require('inquirer');

const departments = [];
const roles = [];
const employees = [];

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
        else if (answer.begin === "View All Roles") {
            console.log("Here are the roles that have been entered");
            viewRoles();
        }
        // this can eventually be "View All Employees by Department", using some kind of table join I think
        else if (answer.begin === "View All Employees") {
            console.log("Here are all employees in the database");
            viewEmployees();
        }
    });
};

function addDepartmentQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which Department would you like to add?",
            name: "department"
            // choices: ["Engineering","Finance","Human Resources","Marketing","Sales"]
        }
    ])
    .then(answer => {
        // console.table(answer.department);
        createDepartment(answer.department);
    });
};

function addRoleQuestions() {
    inquirer.prompt([
        {
            type: "input", // was "list" with specific options
            message: "Which Role would you like to add?",
            name: "title"
            // choices: ["Engineer","Intern","Secretary"]
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        }
    ])
    .then(answers => {
        // console.table([{role: answers.role}, {salary: answers.salary}]);
        const role = new Role(answers.title, answers.salary);
        createRole(answers);
        // return;
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
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choices: ['Engineer','Accountant','Lawyer','Salesperson'],
            name: "role"
        },
        {
            type: 'input',
            message: "Who is the employee's Manager?",
            name: 'manager'
        }
    ])
    .then(answers => {
        // console.log("The new employee's name is " + answers.first + " " + answers.last);
        const values = [
            [answers.first, answers.last, answers.role, answers.manager]
        ];
        console.table(['First Name', 'Last Name', 'Role','Manager'], values);
    });
};

function viewDepartments() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function viewEmployees() {
    connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function createDepartment(data) {
    console.log("Adding new Department...\n");
    connection.query(
        "INSERT INTO departments SET ?",
        {
            name: data
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Department inserted!\n");
            connection.end();
        }
    );
}

function createRole(data) {
    console.log("Adding new Role...\n");
    connection.query(
        "INSERT INTO roles SET ?",
        {
            title: data.title,
            salary: data.salary 
        },
        function (err, res) {
            if (err) throw err;
            console.log(data.title, data.salary);
            console.log(res.affectedRows + " Role inserted!\n");
            connection.end();
        }
    );
}

