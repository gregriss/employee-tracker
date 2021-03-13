class Employee {
    constructor (id, firstName, lastName, role_id, manager_id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
};

module.exports = Employee;