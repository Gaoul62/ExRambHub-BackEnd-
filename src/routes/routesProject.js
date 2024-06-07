const express = require('express')
const router = express.Router()

const  {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/controllerProject.js')

router.get('/', getProjects)

router.get('/:projectID', getProject)

router.post('/', createProject)

router.put('/:projectID', updateProject)

router.delete('/:projectID', deleteProject)

module.exports = router