INSERT INTO department (name)
VALUES ("sales"),
    ("accounting"),
    ("information technology"),
    ("manufacturing"),
    ("support");

SELECT * FROM DEPARTMENT;

INSERT INTO role (title, salary, department_id)
VALUES ("sales rep", 80000, 1),
    ("sales manager", 110000, 1),
    ("accountant", 70000, 2),
    ("accounting manager", 100000, 2),
    ("it technician", 80000, 3),
    ("it manager", 120000, 3),
    ("manufacturing rep", 70000, 4),
    ("manufacturing manager", 110000, 4),
    ("support rep", 70000, 5),
    ("support manager", 110000, 5);

    SELECT * FROM ROLE;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Glenn", "Gabriel", 3, NULL),
    ("Tom", "Smith", 3, 1),
    ("Paige", "Russell", 1, 2),
    ("Sam", "Aldea", 1, 2),
    ("Pete", "Sampras", 2, 1);

SELECT * FROM employee;