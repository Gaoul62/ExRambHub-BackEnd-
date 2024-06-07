const express = require('express')
const router = express.Router()

const  {
    getTickets,
    getTicket,
    getTicketsByProject,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/controllerTicket.js')

router.get('/', getTickets)

router.get('/:ticketID', getTicket)

router.get('/project/:projectID', getTicketsByProject)

router.post('/', createTicket)

router.put('/:ticketID', updateTicket)

router.delete('/:ticketID', deleteTicket)

module.exports = router