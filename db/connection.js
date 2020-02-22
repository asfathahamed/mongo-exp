var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error'));
db.once('open', function() {
    // we are connected!
});

module.export = mongoose;