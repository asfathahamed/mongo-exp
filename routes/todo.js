var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error'));
db.once('open', function() {
    // we are connected!
});

router.get('/', async function(req, res, next) {
    if (!req.query.name) {
        res.json({status: 0, message: "Please send a name in query string"});
    }
    var name = req.query.name;
    console.log(req);
    var todoSchema = mongoose.Schema({
        name: String
    });
    
    var Todo = mongoose.model('Todo', todoSchema);

    await Todo.find(function (err, todoList) {
        if (err) return console.error(err);
        var result = todoList.find(item => item.name === name)
        if (result) res.json({status: 0, message: "todo '" + name + "' already exists"});
    });

    var todo = new Todo({ name: name });

    await todo.save(function(err, todo) {
        res.json(err ? {status: 0, message:" username already exists"} :
            {status: 1, name: todo.name, message: "Successfully created todo"});
    });
});

module.exports = router;
