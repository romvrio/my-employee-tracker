const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//show all deparments
function viewAllDepartments() {
    router.get('/deparment', (req, res) => {
        const sql = `SELECT * FROM department`;

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

// add a department 
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newdepartment',
                message: 'What is the name of the Department?'
            },
        ]).then(newDepartmentData => {
            router.put('/department/:id', (req, res) => {
                //department is allowed to not have a emplyee affiliation
                const errors = inputCheck(req.body, 'department_id');
                if (errors) {
                    res.status(400).json({ error: errors });
                    return;
                }

                const sql = `UPDATE employee SET department_id =?
                             WHERE id = ?`;
                const params = [req.body.department_id, req.params.id];
                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        // check if a record was found 
                    } else if (!result.affectedRows) {
                        res.json({
                            message: 'department not found'
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

module.exports = { viewAllDepartments, addDepartment };