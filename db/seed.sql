DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;


-- INSERT departments (name)
-- VALUES ("Engineering"), ("Finance"), ("Human Resources"), ("Marketing"), ("Sales");


-- INSERT roles (title, salary, department_id)
-- VALUES ("Engineer", 90000, 3), ("Analyst", 150000, 2), ("Consultant", 200000, 1), ("Marketing Manager", 130000, 4), ("Sales Lead", 200000, 5);

-- INSERT employees (first_name, last_name, role_id, manager_id)
-- VALUES ("Jeff","Johnson", "2","1"), ("Billy", "Budd", 1, 5), ("Shelly", "Manne", 4, 5), ("Phil", "Coulson", 5, 4);


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

-- INSERT departments (name)
-- VALUES ("Engineering"), ("Finance"), ("Human Resources"), ("Marketing"), ("Sales");

-- INSERT roles(title, salary)
-- VALUES ("Engineer", 90000), ("Lawyer", 130000), ("Manager", 200000);

-- SELECT * FROM departments;