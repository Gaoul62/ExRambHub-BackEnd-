const express = require('express')
const router = express.Router()

const  {
    getClients,
    getClient,
    getClientByAuth,
    getClientByEmail,
    createClient,
    updateClient,
    updateClientLastLogin,
    deleteClient
} = require('../controllers/controllerClient.js')

router.get('/', getClients)

router.get('/:clientID', getClient)

router.post('/auth', getClientByAuth)

router.get('/email/:email', getClientByEmail)

router.post('/', createClient)

router.put('/:clientID', updateClient)

router.put('/lastLogin/:clientID', updateClientLastLogin)

router.delete('/:clientID', deleteClient)

module.exports = router