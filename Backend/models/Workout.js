const mongoose = require('mongoose');
const Exercise = require('./Exercise');


const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }] ,// Array of exercise references
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }, // Status of the workout
  completedAt: { type: Date }, // Date when the workout was completed

});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
