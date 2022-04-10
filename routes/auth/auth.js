var express = require("express");
var router = express.Router();
var logger = require("../../lib/logger");
const bcrypt = require('bcrypt');
var _ = require("lodash");
var log = logger();
var Validator = require("jsonschema").Validator;
var v = new Validator();
var loginSchema = require("../../jsonSchemas/loginSchema")
var users = require("../../init_data.json")
var jwt = require('jsonwebtoken');

/* Login User*/
router.post("/login", function (req, res) {
  console.log(req.body)
  const validation = v.validate(req.body, loginSchema);
  if (validation.errors.length > 0) {
    console.log(validation.errors)
    return res.json({ errors: validation.errors.map( error =>  error.stack)});
  }
  const user = Object.values(users.data).find( user => user.email === req.body.email)
  if (!user){
    res.status(404)
    return res.json({message:"user not found"})
  }
  if(bcrypt.compareSync(req.body.password, user.password)) {
    var token = jwt.sign({ user:user}, 'shhhhh');
    res.cookie('token', token).send('cookie set')
    return res.json(user);
  } else {
    console.log(user.password, req.body.password)
    res.status(401)
    return res.json({message:"unauthorized"})
  }
});

module.exports = router;