var express = require('express');

var app = express();

var path = require('path');

var cors = require('cors');

var mongoose = require('mongoose');

var fs = require('fs');


var multer = require('multer');

//var db = mongoose.connect('mongodb://localhost:27017/users');

var config = require('./config/config.json');

var db = mongoose.connect(config.database.prodURL);

var User = require('./model/userModel');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userRouter = require('./routes/userRoute')(User, express);

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        console.log("filename---" + filename);
        return filename;
    },
}));

app.use('/user', userRouter);

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
    console.log('listening at', process.env.PORT || 3000, process.env.IP || '0.0.0.0');
});
