const Access = require('../collections/access.js')
const mongoose = require('mongoose')

const getAccesses = ((req, res) => {
    Access.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getAccess = ((req, res) => {
    Access.findOne({ _id: req.params.accessID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Access not found'}))
})

const getAccessesForUser = ((req, res) => {
    Access.find({ user: req.params.userID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'User not found'}))
})

const getAccessesForProject = ((req, res) => {
    Access.find({ project: req.params.projectID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Project not found'}))
})

const createAccess = async (req, res) => {
    try {
        const { user, project, isSuper } = req.body;
        const newAccess = new Access({
            _id: new mongoose.Types.ObjectId(),
            user,
            project,
            super: isSuper
        });

        const result = await newAccess.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the access' });
    }
};

const updateAccess = async (req, res) => {
    try {
        const { user, project, isSuper } = req.body;
        const access = await Access.findById(req.params.accessID);
        if (!access) {
            return res.status(404).json({ msg: 'Access not found' });
        }

        access.user = user;
        access.project = project;
        access.super = isSuper;

        const result = await access.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the access' });
    }
};

const deleteAccess = async (req, res) => {
    try {
        const access = await Access.findById(req.params.accessID);

        if (!access) {
            return res.status(404).json({ msg: 'Access not found' });
        }

        const result = await Access.deleteOne({ _id: req.params.accessID });
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the access' });
    }
};

module.exports = {
    getAccesses,
    getAccess,
    getAccessesForUser,
    getAccessesForProject,
    createAccess,
    updateAccess,
    deleteAccess
}