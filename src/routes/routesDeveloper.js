const express = require('express')
const router = express.Router()

const  {
    getDevelopers,
    getDeveloper,
    getDeveloperByAuth,
    getDeveloperByEmail,
    createDeveloper,
    updateDeveloper,
    updateDeveloperLastLogin,
    deleteDeveloper
} = require('../controllers/controllerDeveloper.js')

router.get('/', getDevelopers)

router.get('/:developerID', getDeveloper)

router.post('/auth', getDeveloperByAuth)

router.get('/email/:email', getDeveloperByEmail)

router.post('/', createDeveloper)

router.put('/:developerID', updateDeveloper)

router.put('/lastLogin/:developerID', updateDeveloperLastLogin)

router.delete('/:developerID', deleteDeveloper)

module.exports = router