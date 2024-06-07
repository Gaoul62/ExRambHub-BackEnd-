const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const TicketTagSchema = new mongoose.Schema({
    _id: ObjectId,
    ticket: { type: ObjectId, required: true },
    tag: { type: ObjectId, required: true },
})

const TicketTag = mongoose.model('ticketTags', TicketTagSchema)

module.exports = TicketTag