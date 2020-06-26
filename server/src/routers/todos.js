const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// TodoList
router.get('/todos', function(req, res, next){
    console.log("Hello From Router.todos");
    console.log(req.method);
    console.log(req.body);
    console.log(req.query);

    // const {email, pass} = req.query;
    // todoModel.createTodo(email, pass);
});

module.exports = router;
