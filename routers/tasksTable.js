var express = require('express');
var bodyParser = require('body-parser');

var	assert = require('assert');

var task = express.Router();
var Tasks = require('../models/taskModel');

task.use(bodyParser.json());
task.route('/')
.get(function(req,res,next){
	console.log('nice, you, fool!');
	res.end('<html><h1>TRY YOUR LUCK</h1></html>')
});

module.exports = task;