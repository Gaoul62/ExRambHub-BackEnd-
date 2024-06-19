const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const SubtaskSchema = new mongoose.Schema({
    _id: ObjectId,
    title: { type: String, required: true },
    status: { type: String, enum: ['BACKLOG', 'TODO', 'IN DEVELOPMENT', 'IN TESTS', 'TO BE DEPLOYED', 'DONE', 'CLOSED'], required: true },
    ticket: { type: ObjectId, required: true },
});

const Subtask = mongoose.model('subtasks', SubtaskSchema)

module.exports = Subtask