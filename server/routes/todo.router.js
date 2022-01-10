const express = require('express');
const todoRouter = express.Router();

const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    //optional
    host: 'localhost',
    port: 5432,
});

// Get all todos

todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM todos;';
    pool
        .query(queryText)
        .then(result => {
        // sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting todo', error);
            res.sendStatus(500)
        });
});

// POST for todos 
// Add a new task
todoRouter.post('/', (req, res) => {
    console.log('this is re.body', req.body);
    let queryText =`
    INSERT INTO "todos" 
	("task", "date", "importance") 
VALUES
    ($1, $2, $3)
    `;
    let queryParams = [
        req.body.task,
        req.body.date,
        req.body.importance
    ];
    console.log('queryText is', queryText);
    pool.query(queryText, queryParams)
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('error getting todo', error);
        res.sendStatus(500)
    })
});


// PUT ... update a task to show it has been completed




// DELETE ... Remove a task when delete button is pressed after completion

module.exports = todoRouter;