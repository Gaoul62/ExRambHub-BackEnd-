const Subtask = require('../collections/subtask.js')
const mongoose = require('mongoose')

const getSubtasks = ((req, res) => {
    Subtask.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getSubtask = ((req, res) => {
    Subtask.findOne({ _id: req.params.subtaskID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Subtask not found'}))
})

const getSubtasksByTicket = ((req, res) => {
    Subtask.find({ ticket: req.params.ticketID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Ticket not found'}))
})

const createSubtask = async (req, res) => {
    try {
        const { title, status, ticket } = req.body;
        const newSubtask = new Subtask({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            status: status,
            ticket: ticket
        });

        const result = await newSubtask.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the subtask' });
    }
};

const updateSubtask = async (req, res) => {
    try {
        const { title, status, ticket } = req.body;
        const subtask = await Subtask.findOne({ _id: req.params.subtaskID });

        if (!subtask) {
            return res.status(404).json({ msg: 'Subtask not found' });
        }

        subtask.title = title;
        subtask.status = status || 'TODO';
        subtask.ticket = ticket;

        const result = await subtask.save();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while updating the subtask' });
    }
};


const deleteSubtask = async (req, res) => {
    try {
        const subtask = await Subtask.findOne({ _id: req.params.subtaskID });

        if (!subtask) {
            return res.status(404).json({ msg: 'Subtask not found' });
        }

        const result = await Subtask.deleteOne({ _id: req.params.subtaskID });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while deleting the subtask' });
    }
};

module.exports = {
    getSubtasks,
    getSubtask,
    getSubtasksByTicket,
    createSubtask,
    updateSubtask,
    deleteSubtask
}