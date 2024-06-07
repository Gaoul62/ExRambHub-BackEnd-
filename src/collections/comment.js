const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
    _id: ObjectId,
    text: String,
    date: Date,
    author: ObjectId,
    ticket: ObjectId
})

const Comment = mongoose.model('comments', CommentSchema)

module.exports = Comment