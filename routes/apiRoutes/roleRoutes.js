const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//show all roles
function viewAllRoles() {
    router.get('/role', (req, res) => {
        const sql = `SELECT * FROM role ORDER BY title`;

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

function addRole() {
    router.put('/role/:id', (req, res) => {
        //role is allowed to not have a emplyee affiliation
        const errors = inputCheck(req.body, 'role_id');
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }

        const sql = `UPDATE employee SET role_id =?
                     WHERE id = ?`;
        const params = [req.body.role_id, req.params.id];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                // check if a record was found 
            } else if (!result.affectedRows) {
                res.json({
                    message: 'role not found'
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

};


module.exports = { viewAllRoles, addRole };