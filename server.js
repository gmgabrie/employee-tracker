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
        message: 'Please select an option:',
        choices: [
          'View All Employees',
          'View All Roles',
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

        if (choices === 'Exit') {
            db.end();
        }
  });
};

function viewAllEmployees() {
    let sql = 'SELECT * FROM employee';
    db.query(sql, (err, result) => {
      if (err) throw err;
      // Inform the client
    console.table(result);
    console.log('See all employees above - Press an arrow key for options');
    });
    promptUser();
  };