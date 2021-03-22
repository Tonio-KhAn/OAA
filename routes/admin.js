const router = require('express').Router();
let User = require('../models/user.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route('/users/').get((req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });

module.exports = router;