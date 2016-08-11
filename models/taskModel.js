var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating model
var taskSchema = new Schema({
	taskBody:{
		type: String,
		required: true
	},
	taskStatus:{
		type: String,
		required: true
	}
});

var Task = mongoose.model('task', taskSchema);
module.exports = Task;