const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    //my MySQL username
    user: 'root',
    //my MySQL password
    password: 'Invincible3162!',
    database: 'business'
},
    console.log('Connected to the election database.')
);

inquirer
    .prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]

        }
    ]).then(actionData => {
        console.log(actionData);
        switch (actionData) {
            case 'departments':
                departments()
                break;
            case 'roles':
                roles()
                break;
            case 'employees':
                employees()
                break;
            case 'addDepartment':
                addDepartment()
                break;
            case 'addRole':
                addRole()
                break;
            case 'addEmployee':
                addEmployee()
                break;
            case 'updateEmployeeRole':
                updateEmployeeRole()
                break;

            default:
                break;
        }
    });



