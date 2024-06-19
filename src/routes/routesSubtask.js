const express = require('express')
const router = express.Router()

const  {
    getSubtasks,
    getSubtask,
    getSubtasksByTicket,
    createSubtask,
    updateSubtask,
    deleteSubtask
} = require('../controllers/controllerSubtask.js')

router.get('/', getSubtasks)

router.get('/:subtaskID', getSubtask)

router.get('/ticket/:ticketID', getSubtasksByTicket)

router.post('/', createSubtask)

router.put('/:subtaskID', updateSubtask)

router.delete('/:subtaskID', deleteSubtask)

module.exports = router