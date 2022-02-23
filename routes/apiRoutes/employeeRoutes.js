const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//show all employee
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

//get single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } res.json({
            message: 'success',
            data: rows
        });
    });
});


module.exports = router;