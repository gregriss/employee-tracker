// require inquirer, mysql, and console.table packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
// requiring class constructors for department, role, and employee
const Department = require('./assets/department');
const Role = require('./assets/role');
const Employee = require('./assets/employee');
// creating arrays to push data objects into
const departmentsArr = [];
const rolesArr = [];
const employeesArr = [];

// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "company_db"
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected as ID " + connection.threadId);
    beginQuestions();
});

// ask user initial questions 
function beginQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "begin",
            choices: ["Add a Department", "Add a Role", "Add an Employee", "View All Departments", "View All Roles", "View All Employees", "View All Employees by Manager", "Update Employee Role", "Remove a Department", "Remove a Role", "Remove Employee", "Update Employee Manager"] // will have View All Employees by Department
        }
    ])
        .then(answer => {
            // console.log(answer);
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
                // console.log("Here are the roles that have been entered");
                viewRoles();
            }
            // this can eventually be "View All Employees by Department", using some kind of table join I think
            else if (answer.begin === "View All Employees") {
                console.log("Here are all employees in the database");
                viewEmployees();
            }
            else if (answer.begin === "Update Employee Role") {
                console.log("Okay, let's update an employee's role.");
                // updateRoleQuestions();
                GetRolesAndUpdate();
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            }
            else {
                console.log("Something else went wrong");
            }
        });
};

function addDepartmentQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which Department would you like to add?",
            name: "department",
            choices: ["Engineering", "Finance", "Human Resources", "Marketing", "Sales"]
        }
    ])
        .then(answer => {
            // console.table(answer.department);
            const department = new Department(answer.department);
            departmentsArr.push(department);
            createDepartment(answer.department);
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            }
            else {
                console.log("Something else went wrong");
            }
        });
};

function addRoleQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which Role would you like to add?",
            name: "title",
            choices: ["Lead Engineer", "Software Engineer", "Sales Lead", "Salesperson", "Accountant", "Financial Analyst"]
        },
        {
            type: "input",
            message: "What is the salary for this role? (No more than 6 figures)",
            name: "salary"
        }
    ])
        .then(answers => {
            // console.table([{role: answers.role}, {salary: answers.salary}]);
            const role = new Role(answers.title, answers.salary);
            rolesArr.push(role);
            createRole(answers);
            // return;
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            }
            else {
                console.log("Something else went wrong");
            }
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
            choices: ["Lead Engineer", "Software Engineer", "Sales Lead", "Salesperson", "Accountant", "Financial Analyst"],
            name: "role"
        },
        // {
        //     type: 'input',
        //     message: "Who is the employee's Manager?",
        //     name: 'manager'
        // }
    ])
        .then(answers => {
            // console.log(answers);
            // const employee = new Employee(answers.first, answers.last, answers.role); // add answers.manager
            // employeesArr.push(employee);
            // const values = [
            //     [answers.first, answers.last, answers.role, answers.manager]
            // ];
            // console.table(['First Name', 'Last Name', 'Role','Manager'], values);
            createEmployee(answers);
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
            salary: data.salary,
            // department_id: 
        },
        function (err, res) {
            if (err) throw err;
            // console.log(data.title, data.salary);
            const values = [[data.title, data.salary]];
            console.table(['Role', 'Salary'], values);
            console.log(res.affectedRows + " Role inserted!\n");
            connection.end();
        }
    );
}

function createEmployee(data) {
    // make new query to roles table to get id for "Lead engineer"
    // SELECT id FROM roles WHERE title = data.role 
    connection.query(
        "INSERT INTO employees SET ?", [
            {
                first_name, last_name, role_id
            }
        ],
        // {
        //     first_name: data.first,
        //     last_name: data.last,
        //     // role_id: role_id
        //     // manager_id: data.manager
        // },
        (err, res) => {
            if (err) throw err;
            // const values = [[data.first, data.last, data.role]] // add data.manager
            //     console.table(['First Name', 'Last Name','Role'], values); // add 'Manager'
            //     console.log(res.affectedRows + " Role inserted!\n");
            beginQuestions();
            connection.query(
                "SELECT id FROM roles WHERE title = ?",
                {
                    title: data.role
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(res.affectedRows + " Role inserted!\n");
                    connection.end();
                }
            )
        }
    )
};

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table("Here are the roles that have been entered");
        console.table(res);
        connection.end();
    });
};
// this code might help me do JOIN I need to show employees by department, etc.
// --   * Console log all the clients and their parties.
// client_id is what they have in common, so that's what we use for our join
// SELECT client_name, party_name FROM clients c JOIN parties p ON c.id = p.client_id;
function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        let role = null;
        if (role_id = 1) {
            role === "Lead Engineer";
        }
        else if (role_id = 2) {
            role === "Software Engineer";
        }
        else if (role_id = 3) {
            role === "Sales Lead";
        }
        else if (role_id = 4) {
            role === "Salesperson";
        }
        else if (role_id = 5) {
            role === "Accountant";
        }
        else if (role_id = 6) {
            role === "Financial Analyst";
        }
        console.table(res);
        connection.end();
    });
};

function GetRolesAndUpdate() {
    var roleTitlesArr = [];
    connection.query("SELECT title FROM roles", (err, results) => {
        console.log(results);
        results.forEach(title => {
            roleTitlesArr.push(title.title);
        })
        updateRoleQuestions(roleTitlesArr);
    })
}

function updateRoleQuestions(roleTitlesArr) {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last'
        },
        {
            type: 'list',
            message: "What is the employee's new role?",
            name: 'new',
            choices: roleTitlesArr
        }
    ])
        .then(answers => {
            console.table(answers);
            var roleID = roleTitlesArr.indexOf(answers.new) + 1;
            updateEmployeeRole(answers, roleID);
        })
}

function updateEmployeeRole(data, role) {
    connection.query(
        // I don't quite understand this yet... look at this first tomorrow
        // I think I need to use the Foreign Key Peter told me about
        "UPDATE employees SET ? WHERE ? AND ?",
        [
            {
                role_id: role
            },
            {
                first_name: data.first
            },
            {
                last_name: data.last
            }
        ],

        function (err, res) {
            if (err) throw err;
            console.table(res.affectedRows + " role updated!\n");
            connection.end();
        }
    )
};