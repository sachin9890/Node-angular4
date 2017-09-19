var userController = {};

userController.users = function (User, req, res) {
    User.find(function (err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
};

userController.checkUserName = function (User, req, res) {
    var query = {};
    query.username = req.query.username;
    User.find(query, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json(user.length ? true : false);
        }
    });
};

userController.login = function (User, req, res) {
    var query = {};
    query.username = req.body.username;
    query.password = req.body.password;

    User.find(query, function (err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                'auth-token': user[0]._id
            });
        }
    });
};

userController.signup = function (User, req, res) {
    console.log(req.body);
    var user = new User(req.body);
    user.save();
    res.send(user);
};

userController.editProfile = function (User, req, res) {
    User.findOneAndUpdate({
        username: req.user.username
    }, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) {
            console.log("Something wrong when updating data!");
        } else {
            res.json({msg: "Record updated successfully"});
        }

    });
};

userController.uploadPhoto = function (User, req, res) {
    User.findOneAndUpdate({
        username: req.user.username
    }, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) {
            console.log("Something wrong when updating data!");
        } else {
            res.json({msg: "Record updated successfully"});
        }

    });
};

userController.changePassword = function (User, req, res) {
    if (req.user.password === req.body.password && req.body.newPassword === req.body.cNewPassword) {
        User.findOneAndUpdate({
            username: req.user.username
        }, {
            $set: {
                password: req.body.newPassword
            }
        }, {
            new: true
        }, function (err, user) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.json({msg: 'success'});
        });
    } else {
        res.json({msg: 'Password mismatch'});
    }

};

userController.forgotPassword = function (User, req, res) {

};

userController.remove = function (User, req, res) {
    // var query = {};
    // query._id = req.body.id;
    User.findByIdAndRemove(req.user.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({status:200});
        }
    });
};


module.exports = userController;