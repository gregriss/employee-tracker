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
    department_id INT NOT NULL,
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