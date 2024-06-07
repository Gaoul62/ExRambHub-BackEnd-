const Client = require('../collections/client.js')
const mongoose = require('mongoose')

const getClients = ((req, res) => {
    Client.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getClient = ((req, res) => {
    Client.findOne({ _id: req.params.clientID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Client not found'}))
})

const getClientByAuth = ((req, res) => {
    Client.findOne({ email: req.body.email, password: req.body.password })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Client not found'}))
})

const getClientByEmail = ((req, res) => {
    Client.findOne({ email: req.params.email })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Client not found'}))
})

const createClient = async (req, res) => {
    try {
        const { name, surname, email, password, companyName } = req.body;
        const newClient = new Client({
            _id: new mongoose.Types.ObjectId(),
            name,
            surname,
            email,
            password,
            companyName
        });

        const result = await newClient.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the client' });
    }
};

const updateClient = async (req, res) => {
    try {
        const { name, surname, email, password, companyName } = req.body;
        const client = await Client.findById(req.params.clientID);

        if (!client) {
            return res.status(404).json({ msg: 'Client not found' });
        }

        client.name = name;
        client.surname = surname;
        client.email = email;
        client.password = password;
        client.companyName = companyName;

        const result = await client.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the client' });
    }
};

const deleteClient = ((req, res) => {
    Client.findOneAndDelete({ _id: req.params.clientID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Client not found' }))
})

module.exports = {
    getClients,
    getClient,
    getClientByAuth,
    getClientByEmail,
    createClient,
    updateClient,
    deleteClient
}