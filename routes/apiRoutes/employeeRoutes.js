const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const { addemployee } = require('./employeeRoutes');


//show all employee
function viewAllEmployees() {
    router.get('/employee', (req, res) => {
        const sql = `SELECT * FROM employee ORDER BY last_name`;

        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            } res.json({
                message: 'success',
                data: rows
            });
        });
    });
};

//add a employee
function addemployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstname',
                message: 'What is the first name of new employee?'
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'What is the last name of employee'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is there role in the company?',
                Choices: ['CEO', 'CFO', 'Manager',]
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of employee?'
            }
        ]).then(employeeData => {
            router.put('/employee/:id', (req, res) => {
                //employee is allowed to not have a role affiliation
                const errors = inputCheck(req.body, 'employee_id');
                if (errors) {
                    res.status(400).json({ error: errors });
                    return;
                }

                const sql = `UPDATE employee SET employee_id =?
                             WHERE id = ?`;
                const params = [req.body.employee_id, req.params.id];
                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        // check if a record was found 
                    } else if (!result.affectedRows) {
                        res.json({
                            message: 'employee not found'
                        });
                    } else {
                        res.json({
                            message: 'success',
                            data: req.body,
                            changes: result.affectedRows
                        });
                    }
                });
            });
        });

};


module.exports = { viewAllEmployees, addemployee };