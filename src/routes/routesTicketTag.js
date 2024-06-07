const express = require('express')
const router = express.Router()

const  {
    getTicketTags,
    getTicketTag,
    getTicketTagsForTicket,
    getTicketTagsForTag,
    createTicketTag,
    updateTicketTag,
    deleteTicketTag
} = require('../controllers/controllerTicketTag.js')

router.get('/', getTicketTags)

router.get('/:ticketTagID', getTicketTag)

router.get('/ticket/:ticketID', getTicketTagsForTicket)

router.get('/tag/:tagID', getTicketTagsForTag)

router.post('/', createTicketTag)

router.put('/:ticketTagID', updateTicketTag)

router.delete('/:ticketTagID', deleteTicketTag)

module.exports = router