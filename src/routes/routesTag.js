const express = require('express')
const router = express.Router()

const  {
    getTags,
    getTag,
    getTagByTitle,
    createTag,
    updateTag,
    deleteTag
} = require('../controllers/controllerTag.js')

router.get('/', getTags)

router.get('/:tagID', getTag)

router.get('/title/:title', getTagByTitle)

router.post('/', createTag)

router.put('/:tagID', updateTag)

router.delete('/:tagID', deleteTag)

module.exports = router