const Project = require('../collections/project.js')
const mongoose = require('mongoose')

const getProjects = ((req, res) => {
    Project.find({})
        .then(result => {
            if (result.length === 0) {
                console.log('No projects found');
            }
            res.status(200).json({ result });
        })
        .catch(error => res.status(500).json({msg: error}))
})

const getProject = ((req, res) => {
    Project.findOne({ _id: req.params.projectID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Project not found'}))
})

const createProject = async (req, res) => {
    try{
        const { name, description } = req.body;
        const newProject = new Project({
            _id: new mongoose.Types.ObjectId(),
            name,
            description
        });

        const result = await newProject.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the project' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.findById(req.params.projectID);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project.name = name;
        project.description = description;

        const result = await project.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the project' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectID);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const result = await Project.deleteOne({ _id: req.params.projectID });
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the project' });
    }
};

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}