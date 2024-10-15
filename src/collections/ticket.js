const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const TicketSchema = new mongoose.Schema({
    _id: ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['BACKLOG', 'TODO', 'IN DEVELOPMENT', 'IN TESTS', 'TO BE DEPLOYED', 'DONE', 'CLOSED'], required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    type: { type: String, enum: ['Bug', 'Feature', 'Task'], required: true },
    dateCreation: { type: Date, default: Date.now },
    startdate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    lastModification: { type: Date },
    creator: { type: ObjectId, required: true },
    assignee: { type: ObjectId, required: true },
    project: { type: ObjectId, required: true },
});

const Ticket = mongoose.model('tickets', TicketSchema)

module.exports = Ticket