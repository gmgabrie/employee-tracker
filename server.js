// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
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
  console.log(chalk.cyan('Connected to the employee_db database.'));
  console.log('')
  console.log(chalk.cyan("######   ##   ##  #####    ##        ####    ##  ##   ######   ######"))
  console.log(chalk.cyan("##       #######  ##  ##   ##       ##  ##   ##  ##   ##       ##    ")) 
  console.log(chalk.cyan("#####    ## # ##  #####    ##       ##  ##    ####    #####    ##### ")) 
  console.log(chalk.cyan("##       ## # ##  ##       ##       ##  ##     ##     ##       ##    ")) 
  console.log(chalk.cyan("######   ## # ##  ##       ######    ####      ##     ######   ######"))  
  console.log("")                                                                                                                                                                                                        
  console.log(chalk.cyan("######   #####     ####     ####    ##  ##   ######   #####   "))
  console.log(chalk.cyan("  ##     ##  ##   ##  ##   ##  ##   ## ##    ##       ##  ##  "))
  console.log(chalk.cyan("  ##     #####    ######   ##       ####     #####    #####   "))
  console.log(chalk.cyan("  ##     ##  ##   ##  ##   ##  ##   ## ##    ##       ##  ##  "))
  console.log(chalk.cyan("  ##     ##  ##   ##  ##    ####    ##  ##   ######   ##  ##  "))
  console.log("");
  promptUser();
  }
);

// Prompt User for Choices
const promptUser = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        pageSize: 15,
        message: 'Please select an option:',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'View Employees by Department',
          'View Employees by Manager',
          'Delete an Employee',
          'Update an Employee\'s Manager',
          'Get Total Salary for a Department',
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
        if (choices === 'View Employees by Department') {
          viewEmpByDept();
        }
        if (choices === 'View Employees by Manager') {
          viewEmpByMgr();
        }
        if (choices === 'Delete an Employee') {
          delEmployee();
        }
        if (choices === 'Update an Employee\'s Manager') {
          updateEmployeeMgr();
        }
        if (choices === 'Get Total Salary for a Department') {
          totalDeptSalary();
        }
        if (choices === 'Exit') {
            db.end();
        }
  });
};

//function to view all employees
function viewAllEmployees() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };

  //function to view all departments
  function viewAllDepartments() {
    let sql = 'SELECT department.id, department.name AS department FROM department';
    db.query(sql, (err, result) => {
      if (err) throw err;
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };

  //function to view all roles
  function viewAllRoles() {
    let sql = 'SELECT role.id, role.title, role.department_id, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };/////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function to add a department
  function addDepartment() {
    inquirer.prompt([
      {
        name: 'addDepartment',
        type: 'input',
        message: 'Please enter a department name:'
      }
    ]).then(answer => {
      let sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(sql, answer.addDepartment, (err, res) => {
        if (err) throw err;
    console.log('');
    console.log(chalk.green('Added ' + answer.addDepartment + ' to departments!'));
    viewAllDepartments();
    });
  });
  };

  //function to add a role
  function addRole() {
    db.query(`SELECT * FROM department;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({name: department.name, value: department.id }));
      inquirer.prompt([
          {
          name: 'department',
          type: 'rawlist',
          message: 'Which department would you like to add a role to?',
          choices: departments   
          },
          {
          name: 'title',
          type: 'input',
          message: 'What is the name of the role you want to add?'   
          },
          {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the role you want to add?'   
          },
      ]).then((response) => {
          db.query(`INSERT INTO role SET ?`, 
            {
              title: response.title,
              salary: response.salary,
              department_id: response.department,
            },
          (err, res) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green('Added ' + response.title + ' to roles!'));
          viewAllRoles();
          })
      })
  })
  };

//function to add an employee
  function addEmployee() {
    db.query(`SELECT * FROM role;`, (err, res) => {
      if (err) throw err;
      let roles = res.map(role => ({name: role.title, value: role.id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let managers = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

      inquirer.prompt([
          {
          name: 'firstName',
          type: 'input',
          message: 'What is the new employees\'s first name?'   
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'What is the new employees\'s last name?'
            },
          {
          name: 'role',
          type: 'rawlist',
          message: 'What is the new employee\'s title?',
          choices: roles   
          },
          {
          name: 'manager',
          type: 'rawlist',
          message: 'Who is the new employee\'s manager?',
          choices: managers
          },
      ]).then((response) => {
          db.query(`INSERT INTO employee SET ?`, 
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.role,
              manager_id: response.manager,
            },
          (err, response) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green('New employee added!'));
          viewAllEmployees();
          })
      })
  })
  })};

  //function to update an employee role
  function updateEmployeeRole() {
    db.query(`SELECT * FROM role;`, (err, res) => {
      if (err) throw err;
      let roles = res.map(role => ({name: role.title, value: role.id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

      inquirer.prompt([
          {
          name: 'employee',
          type: 'rawlist',
          message: 'Which employee would you like to update?',
          choices: employees
          },
          {
          name: 'role',
          type: 'rawlist',
          message: 'What role would you like the employee to have?',
          choices: roles   
          },

      ]).then((response) => {
          db.query(`UPDATE employee SET ? WHERE ?`, 
            [
              {
              role_id: response.role,
            },
            {
              id: response.employee,
            },
          ],
          (err, res) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green('Update Successful'));
          viewAllEmployees();
          })
      })
  })
  })};

  //function to view employees by department
  function viewEmpByDept() {
    db.query(`SELECT id, name FROM department ORDER BY id ASC;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({name: department.name , value: department.id }));
      inquirer.prompt([
          {
          name: 'department',
          type: 'rawlist',
          message: 'Which department would you like to see the employees of?',
          choices: departments   
          },
      ]).then((response) => {
          db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE department.id = ${response.department} ORDER BY employee.id ASC`, 
          (err, res) => {
              if (err) throw err;
              console.table('\n', res, '\n');
              promptUser();
          })
      })
  })
  };

  //function to view employees by manager
  function viewEmpByMgr() {
    db.query(`SELECT id, first_name, last_name FROM employee ORDER BY id ASC;`, (err, res) => {
      if (err) throw err;
      let managers = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
      inquirer.prompt([
          {
          name: 'manager',
          type: 'rawlist',
          message: 'Which manager would you like to see the employee\'s of?',
          choices: managers   
          },
      ]).then((response) => {
          db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employee manager RIGHT JOIN employee employee ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE employee.manager_id = ${response.manager} ORDER BY employee.id ASC`, 
          (err, res) => {
              if (err) throw err;
              console.table('\n', res, '\n');
              promptUser();
          })
      })
  })
  };

  //function to delete an employee
  function delEmployee() {
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

      inquirer.prompt([
          {
          name: 'employee',
          type: 'rawlist',
          message: 'Which employee would you like to delete?',
          choices: employees
          },
      ]).then((response) => {
          db.query(`DELETE FROM employee WHERE ?`, 
            [
            {
              id: response.employee,
            },
          ],
          (err, res) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green('Employee deleted successfully'));
          viewAllEmployees();
          })
      })
  })
  };

  //function to update manager for an employee
  function updateEmployeeMgr() {
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
      let managers = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
      inquirer.prompt([
          {
          name: 'employee',
          type: 'rawlist',
          message: 'Which employee would you like to update?',
          choices: employees
          },
          {
          name: 'manager',
          type: 'rawlist',
          message: 'Which manager would you like to choose for the employee?',
          choices: managers   
          },

      ]).then((response) => {
          db.query(`UPDATE employee SET ? WHERE ?`, 
            [
              {
              manager_id: response.manager,
            },
            {
              id: response.employee,
            },
          ],
          (err, res) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green('Update Successful'));
          viewAllEmployees();
          })
      })
  })
  };

  //function to show total salary for entire department
  function totalDeptSalary() {
    db.query(`SELECT * FROM department;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({name: department.name, value: department.id }));
      inquirer.prompt([
          {
          name: 'department',
          type: 'rawlist',
          message: 'Which department would you get a total salary for?',
          choices: departments   
          },
      ]).then((response) => {
          // db.query(`SELECT department_id, department.name AS department_name, SUM(role.salary) AS total_salary FROM role JOIN department ON role.department_id = department.id WHERE ?`, 
          db.query(`SELECT department.id, department.name AS department_name, SUM(role.salary) AS total_salary FROM employee AS employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE ?`, 
          {
              department_id: response.department,
            },
          (err, res) => {
              if (err) throw err;
          console.log('');
          console.log(chalk.green(`The total of all salaries from the selected department:`));
          console.table('\n', res, '\n');
          promptUser();
          })
      })
  })
  };