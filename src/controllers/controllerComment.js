const Comment = require('../collections/comment.js')
const mongoose = require('mongoose')

const getComments = ((req, res) => {
    Comment.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getComment = ((req, res) => {
    Comment.findOne({ _id: req.params.commentID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Comment not found'}))
})

const getCommentsByTicket = ((req, res) => {
    Comment.find({ ticket: req.params.ticketID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Ticket not found'}))
})

const createComment = async (req, res) => {
    try {
        const { text, date, author, ticket } = req.body;
        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            text,
            date: new Date(date),
            author,
            ticket
        });

        const result = await newComment.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the comment' });
    }
};

const updateComment = ((req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.commentID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Comment not found' }))
})

const deleteComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentID);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        const result = await Comment.deleteOne({ _id: req.params.commentID });
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the comment' });
    }
};

module.exports = {
    getComments,
    getComment,
    getCommentsByTicket,
    createComment,
    updateComment,
    deleteComment
}