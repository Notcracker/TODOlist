var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var	assert = require('assert');

var task = express.Router();
var Tasks = require('../models/taskModel');

task.use(bodyParser.json());
task.route('/')
.get(function (req,res,next){
	console.log('nice, you, fool!');
	res.sendFile(path.join(__dirname, '../public/index.html'));
})
.post(function(req,res,next){
	
	var taskText = req.body.text;
	console.log(taskText);
	Tasks.create({taskBody:taskText,taskStatus:"In process"}, function (err,task) {
		if (err) throw err;

		res.json(task);

		
	});
	
});

task.route('/tasks')

.get(function (req,res,next){
	console.log('test');
	Tasks.find({})
	.exec(function (err, tasks) {
		if (err) throw err;
		res.json(tasks);
	})
})
.put(function (req, res, next) {
	console.log(req.body);
	Tasks.findById(req.body.id, function (err, task) {
		if (err) throw err;
		if (task.taskStatus === 'In process'){
			Tasks.findByIdAndUpdate(req.body.id, {
		        $set: {taskStatus:'Completed'}
		    }, {
		        new: true
		    }, function (err, data) {
		    	if (err) throw err;
		    	res.end();
		    })
		} else if (task.taskStatus === 'Completed'){
			Tasks.findByIdAndUpdate(req.body.id, {
		        $set: {taskStatus:'In process'}
		    }, {
		        new: true
		    }, function (err, data) {
		    	if (err) throw err;
		    	res.end();
		    })
		}
	})
});

task.route('/tasks/:id')
.delete(function (req,res,next){
	Tasks.findByIdAndRemove(req.params.id, function (err, task){
		if (err) throw err;
		res.end();
	})
})

module.exports = task;