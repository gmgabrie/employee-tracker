// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'B00tc@mp',
    database: 'employee_db'
  });

  db.connect(function (err) {
    if (err) throw err;
  console.log('Connected to the employee_db database.');
  console.log('Employee Tracker');
  promptUser();
  }
);



// Query database
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });

// Prompt User for Choices
const promptUser = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        pageSize: 10,
        message: 'Please select an option:',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Exit'
          ]
      }
    ])
    .then((answers) => {
      const {choices} = answers;

        if (choices === 'View All Employees') {
            viewAllEmployees();
        }

        if (choices === 'View All Roles') {
            viewAllRoles();
        }

        if (choices === 'View All Departments') {
          viewAllDepartments();
        }
        if (choices === 'Add an Employee') {
          addEmployee();
        }
        if (choices === 'Add a Department') {
          addDepartment();
        }
        if (choices === 'Add a Role') {
          addRole();
        }
        if (choices === 'Update an Employee Role') {
          updateEmployeeRole();
        }
        if (choices === 'Exit') {
            db.end();
        }
  });
};

function viewAllEmployees() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('See all employees above - Press an arrow key for options list');
    });
    promptUser();
  };

  function viewAllDepartments() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('See all departments above - Press an arrow key for options list');
    });
    promptUser();
  };

  function viewAllRoles() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('See all roles above - Press an arrow key for options list');
    });
    promptUser();
  };

  function addDepartment() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('Department Added - Press an arrow key for options list');
    });
    promptUser();
  };

  function addRole() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('Role Added - Press an arrow key for options list');
    });
    promptUser();
  };

  function addEmployee() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('Employee Added - Press an arrow key for options list');
    });
    promptUser();
  };

  function updateEmployeeRole() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('Employee Role Updated - Press an arrow key for options list');
    });
    promptUser();
  };