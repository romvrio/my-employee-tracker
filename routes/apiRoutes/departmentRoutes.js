const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//show all deparments
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

//get single department
router.get('/deparment/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
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