var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    console.log(req.session);
    res.render('users', { title: req.session.user.username });
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect("/login");
});
module.exports = router;
