const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//show all roles
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

//get single employee
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id = ?`;
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