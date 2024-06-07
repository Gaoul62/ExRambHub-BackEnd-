const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const AccessSchema = new mongoose.Schema({
    _id: ObjectId,
    user: ObjectId,
    project: ObjectId,
    super: Boolean,
})

const Access = mongoose.model('access', AccessSchema)

module.exports = Access