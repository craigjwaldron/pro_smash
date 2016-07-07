var mongoose = require ('mongoose');

var taskSchema = mongoose.Schema({
  task_name: { type: String, required: true, },
  complete: { type: Boolean, required: true, },
  day_assigned: { type: Date, required: true, }
});

var Pet = mongoose.model('allTasks', taskSchema );

module.exports = Pet;
