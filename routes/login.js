var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'User Login' });
});

router.post('/', function(req, res, next) {
    if (!req.session) {
        return next(new Error('no session'));
    }

    var user = {
        username: 'admin',
        password: 'admin'
    };

    if (req.body.username === user.username && req.body.password === user.password) {
        req.session.user = {username: req.body.username, password: req.body.password};
        res.redirect("/users");
    } else {
        client.on('connect', function(e){
            console.log(e);
        });

        client.hgetall('login_user', function (err, res) {
            if (err) {
                console.log(err);
                client.hmset('login_user', {'username':req.body.username, 'password':req.body.password});
            } else {
                client.hdel('login_user', 'username', 'password');
                client.hmset('login_user', {'username':req.body.username, 'password':req.body.password});
            }
        })

        res.redirect("/login");
    }
});

module.exports = router;