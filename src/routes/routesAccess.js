const express = require('express')
const router = express.Router()

const  {
    getAccesses,
    getAccess,
    getAccessesForUser,
    getAccessesForProject,
    createAccess,
    updateAccess,
    deleteAccess
} = require('../controllers/controllerAccess.js')

router.get('/', getAccesses)

router.get('/:accessID', getAccess)

router.get('/user/:userID', getAccessesForUser)

router.get('/project/:projectID', getAccessesForProject)

router.post('/', createAccess)

router.put('/:accessID', updateAccess)

router.delete('/:accessID', deleteAccess)

module.exports = router