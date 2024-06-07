const Tag = require('../collections/tag.js')
const mongoose = require('mongoose')

const getTags = ((req, res) => {
    Tag.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getTag = ((req, res) => {
    Tag.findOne({ _id: req.params.tagID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Tag not found'}))
})

const getTagByTitle = ((req, res) => {
    Tag.findOne({ title: req.params.title })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Tag not found'}))
})

const createTag = async (req, res) => {
    try {
        const { title } = req.body;
        const newTag = new Tag({
            _id: new mongoose.Types.ObjectId(),
            title
        });

        const result = await newTag.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the tag' });
    }
};

const updateTag = async (req, res) => {
    try {
        const { title } = req.body;
        const tag = await Tag.findById(req.params.tagID);

        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }

        tag.title = title;

        const result = await tag.save();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while updating the tag' });
    }
};


const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.tagID);

        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }

        const result = await Tag.deleteOne({ _id: req.params.tagID });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while deleting the tag' });
    }
};

module.exports = {
    getTags,
    getTag,
    getTagByTitle,
    createTag,
    updateTag,
    deleteTag
}