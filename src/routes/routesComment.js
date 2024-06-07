const express = require('express')
const router = express.Router()

const  {
    getComments,
    getComment,
    getCommentsByTicket,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/controllerComment.js')

router.get('/', getComments)

router.get('/:commentID', getComment)

router.get('/ticket/:ticketID', getCommentsByTicket)

router.post('/', createComment)

router.put('/:commentID', updateComment)

router.delete('/:commentID', deleteComment)

module.exports = router