DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments(
    id INT auto_increment NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INT auto_increment NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    -- to hold reference to department role belongs to
    -- I can't define this here, defined above in departments table
    -- department_id INT auto_increment NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employees(
    id INT auto_increment NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    -- to hold reference to another employee who manages the employee being Created. This field may be null if the employee has no manager
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT departments (name)
VALUES ("Engineering"), ("Finance"), ("Human Resources"), ("Marketing"), ("Sales");

INSERT roles (title, salary)
VALUES ("Engineer", 90000), ("Analyst", 150000), ("Consultant", 200000), ("Marketing Manager", 130000), ("Sales Lead", 200000);

INSERT employees (first_name, last_name, role_id, manager_id)
VALUES ("Jeff","Johnson", "2","1"), ("Billy", "Budd", 1, 5), ("Shelly", "Manne", 4, 5), ("Phil", "Coulson", 5, 4);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;