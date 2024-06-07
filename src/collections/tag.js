const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const TagSchema = new mongoose.Schema({
    _id: ObjectId,
    title: {type: String, required: true}
})

const Tag = mongoose.model('tags', TagSchema)

module.exports = Tag