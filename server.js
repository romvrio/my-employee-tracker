const db = require('./db/connection');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const employeeRoutes = require('./routes/apiRoutes/employeeRoutes')
const managerRoutes = require('./routes/apiRoutes/managerRoutes')
const roleRoutes = require('./routes/apiRoutes/roleRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use api routes
app.use('/api', apiRoutes);

function start() {
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
                    viewAllDepartments()
                    break;
                case 'roles':
                    viewAllRoles()
                    break;
                case 'employees':
                    viewAllEmployees()
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
};

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { router, start };