const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    description: String
})

const Project = mongoose.model('projects', ProjectSchema)

module.exports = Project