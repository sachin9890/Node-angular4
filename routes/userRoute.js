module.exports = function (User, express) {
    var userRouter = express();

    var bodyParser = require('body-parser');

     userRouter.use(bodyParser.urlencoded({
     extended: false
     }));

     userRouter.use(bodyParser.json());
    var multiparty = require('multiparty');
    var passport = require('passport');


    var userController = require("../controllers/userController");
    var passportLocal = require("../config/passport-local")(User);
    var passportFacebook = require("../config/passport-facebook")(User);

    passport.use(passportLocal);
    passport.use(passportFacebook);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    userRouter.configure(function () {
        userRouter.use(express.cookieParser());
        userRouter.use(express.bodyParser());
        userRouter.use(express.session({secret: 'keyboard cat'}));
        userRouter.use(passport.initialize());
        userRouter.use(passport.session());
    });


    userRouter.get('/list', isLoggedIn, function (req, res) {
        userController.users(User, req, res);
    });

    userRouter.get('/logout', isLoggedIn, function (req, res) {
        req.logout();
        res.json({'msg': 'done'});
    });

    userRouter.get('/checkUserName', function (req, res) {
        userController.checkUserName(User, req, res);
    });

    /*userRouter.get('/login/facebook', passport.authenticate('facebook',{ display: 'popup' }));

     userRouter.get('/login/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/' }),
     function(req, res) {
     // Successful authentication, redirect home.
     res.redirect('/');
     });*/

    userRouter.post('/login', passport.authenticate('local'), function (req, res) {
        res.json({id: req.user.id, username: req.user.username, email: req.user.email});
        //userController.login(User, req, res);
    });

    userRouter.post('/signup', function (req, res) {
        userController.signup(User, req, res);
    });

    userRouter.get('/getProfile', isLoggedIn, function (req, res) {
        res.json(req.user);
    });

    userRouter.put('/editProfile', isLoggedIn, function (req, res) {
        userController.editProfile(User, req, res);
    });

    userRouter.post('/uploadPhoto', function (req, res) {
        // console.log(req.user.username);
        // console.log(req.body);
        // console.log(req.files);
        //userController.uploadPhoto(User, req, res);
    });

    userRouter.put('/changePassword', isLoggedIn, function (req, res) {
        userController.changePassword(User, req, res);
    });

    userRouter.put('/forgotPassword', isLoggedIn, function (req, res) {
        userController.forgotPassword(User, req, res);
    });

    userRouter.delete('/deleteUser', isLoggedIn, function (req, res) {
        userController.remove(User, req, res);
    });

    return userRouter;
};

function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({status: 401, msg: ''})
    }

}