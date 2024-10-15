const Ticket = require('../collections/ticket.js')
const mongoose = require('mongoose')

const getTickets = ((req, res) => {
    Ticket.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getTicket = ((req, res) => {
    Ticket.findOne({ _id: req.params.ticketID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Ticket not found'}))
})

const getTicketsByProject = ((req, res) => {
    Ticket.find({ project: req.params.projectID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Project not found'}))
})

const createTicket = async (req, res) => {
    try {
        const { title, description, status, priority, type, startDate, endDate, creator, assignee, project } = req.body;
        const newTicket = new Ticket({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            status: status,
            priority,
            type,
            dateCreation: new Date(),
            startdate: new Date(startDate),
            endDate: new Date(endDate),
            lastModification: new Date(Date.now()),
            creator,
            assignee,
            project
        });

        const result = await newTicket.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the ticket' });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { title, description, status, priority, type, endDate, creator, assignee, project } = req.body;
        const ticket = await Ticket.findOne({ _id: req.params.ticketID });

        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        ticket.title = title;
        ticket.description = description;
        ticket.status = status || 'TODO';
        ticket.priority = priority;
        ticket.type = type;
        ticket.endDate = new Date(endDate);
        ticket.lastModification = new Date(Date.now());
        ticket.creator = creator;
        ticket.assignee = assignee;
        ticket.project = project;

        const result = await ticket.save();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while updating the ticket' });
    }
};


const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.ticketID });

        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        const result = await Ticket.deleteOne({ _id: req.params.ticketID });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while deleting the ticket' });
    }
};

module.exports = {
    getTickets,
    getTicket,
    getTicketsByProject,
    createTicket,
    updateTicket,
    deleteTicket
}