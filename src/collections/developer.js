const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const DeveloperSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    surname: String,
    email: String,
    position: String,
    password: String
})

const Developer = mongoose.model('developers', DeveloperSchema)

module.exports = Developer