const TicketTag = require('../collections/ticketTag.js')
const mongoose = require('mongoose')

const getTicketTags = ((req, res) => {
    TicketTag.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getTicketTag = ((req, res) => {
    TicketTag.findOne({ _id: req.params.ticketTagID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'TicketTag not found'}))
})

const getTicketTagsForTicket = ((req, res) => {
    TicketTag.find({ ticket: req.params.ticketID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Ticket not found'}))
})

const getTicketTagsForTag = ((req, res) => {
    TicketTag.find({ tag: req.params.tagID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Tag not found'}))
})

const createTicketTag = async (req, res) => {
    try {
        const { ticket, tag } = req.body;
        const newTicketTag = new TicketTag({
            _id: new mongoose.Types.ObjectId(),
            ticket,
            tag
        });

        const result = await newTicketTag.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the ticketTag' });
    }
};

const updateTicketTag = async (req, res) => {
    try {
        const { ticket, tag } = req.body;
        const ticketTag = await TicketTag.findById(req.params.ticketTagID);

        if (!ticketTag) {
            return res.status(404).json({ msg: 'TicketTag not found' });
        }

        ticketTag.ticket = ticket;
        ticketTag.tag = tag;

        const result = await ticketTag.save();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while updating the ticketTag' });
    }
};


const deleteTicketTag = async (req, res) => {
    try {
        const ticketTag = await TicketTag.findById(req.params.ticketTagID);

        if (!ticketTag) {
            return res.status(404).json({ msg: 'TicketTag not found' });
        }

        const result = await TicketTag.deleteOne({ _id: req.params.ticketTagID });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while deleting the ticketTag' });
    }
};

module.exports = {
    getTicketTags,
    getTicketTag,
    getTicketTagsForTicket,
    getTicketTagsForTag,
    createTicketTag,
    updateTicketTag,
    deleteTicketTag
}