const express = require('express');
const todo = express.Router();
console.log(todo);
const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    //optional
    host: 'localhost',
    port: 5432,
});
console.log(pool);