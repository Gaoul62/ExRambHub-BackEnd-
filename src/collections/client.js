const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const ClientSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    surname: String,
    email: String,
    companyName: String,
    password: String,
    lastLogin: Date
})

const Client = mongoose.model('clients', ClientSchema)

module.exports = Client