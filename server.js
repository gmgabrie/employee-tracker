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
  console.log('')
  console.log("######   ##   ##  #####    ##        ####    ##  ##   ######   ######")
  console.log("##       #######  ##  ##   ##       ##  ##   ##  ##   ##       ##    ")  
  console.log("#####    ## # ##  #####    ##       ##  ##    ####    #####    ##### ")  
  console.log("##       ## # ##  ##       ##       ##  ##     ##     ##       ##    ")  
  console.log("######   ## # ##  ##       ######    ####      ##     ######   ######")  
  console.log("")                                                                                                                                                                                                        
  console.log("######   #####     ####     ####    ##  ##   ######   #####   ")
  console.log("  ##     ##  ##   ##  ##   ##  ##   ## ##    ##       ##  ##  ")
  console.log("  ##     #####    ######   ##       ####     #####    #####   ")
  console.log("  ##     ##  ##   ##  ##   ##  ##   ## ##    ##       ##  ##  ")
  console.log("  ##     ##  ##   ##  ##    ####    ##  ##   ######   ##  ##  ")
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
          'View Employees by Department',
          'View Employees by Manager',
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
        if (choices === 'Exit') {
            db.end();
        }
  });
};

//DONE
function viewAllEmployees() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };

  //DONE
  function viewAllDepartments() {
    let sql = 'SELECT department.id, department.name AS department FROM department';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };

  //DONE
  function viewAllRoles() {
    let sql = 'SELECT role.id, role.title, role.department_id, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table('\n', result);
    console.log('');
    promptUser();
    });
  };/////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DONE
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
    // //   // Inform the client
    console.log('');
    console.log('Added ' + answer.addDepartment + ' to departments!');
    viewAllDepartments();
    });
  });
  };

  //DONE
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
          console.log('Added ' + response.title + ' to roles!');
          viewAllRoles();
          })
      })
  })
  };

//DONE
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
          console.log('Added ' + response.firstName + response.lastName + ' to employees!');
          viewAllEmployees();
          })
      })
  })
  })};

  //DONE
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
          console.log('Update Successful');
          viewAllEmployees();
          })
      })
  })
  })};

  // DONE
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

  //DONE
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

