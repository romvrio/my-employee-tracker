const db = require('./db/connection');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use api routes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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



