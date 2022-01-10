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
    console.log('this is req.body', req.body);
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
todoRouter.put('/:id', (req, res) => {
    // Grab the URL parameter
    console.log('id is', req.params.id);
    console.log('req.body', req.body);
    let queryText = `
    UPDATE "todos"
    SET "complete_status" = $1
    WHERE "id" = $2;
    `;
    let queryParams = [
        req.body.status,                     //$1
        req.params.id                       //$2
    ];

    pool.query(queryText, queryParams)
    .then(() =>{
        res.sendStatus(204);
    })
    .catch((err) => {
        console.log('PUT /todos failed!', err);
        res.sendStatus(500);
    });
})
  




// DELETE ... Remove a task when delete button is pressed after completion

todoRouter.delete('/:id', (req, res) => {
    console.log('id is',req.params.id);
    const queryText = `DELETE FROM todos WHERE id = $1 `; //SQL code here, use $1, $2 in conjunction with the query params
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(204);
        })
        .catch((err) => {
        console.log('DELETE failed:', err);
    })
});

module.exports = todoRouter;