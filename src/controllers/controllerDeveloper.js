const Developer = require('../collections/developer.js')
const mongoose = require('mongoose')
const encryptionHelper = require('../helpers/encryptionHelper.js')

const getDevelopers = ((req, res) => {
    Developer.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getDeveloper = ((req, res) => {
    Developer.findOne({ _id: req.params.developerID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Developer not found'}))
})

const getDeveloperByAuth = ((req, res) => {
    const hashedPassword = encryptionHelper.hashStringWithKey(req.body.password);
    Developer.findOne({ email: req.body.email, password: hashedPassword })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Developer not found'}))
})

const getDeveloperByEmail = ((req, res) => {
    Developer.findOne({ email: req.params.email })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Developer not found'}))
})

const createDeveloper = async (req, res) => {
    try {
        const { name, surname, email, password, position } = req.body;
        password = encryptionHelper.hashStringWithKey(password);
        const newDeveloper = new Developer({
            _id: new mongoose.Types.ObjectId(),
            name,
            surname,
            email,
            password,
            position
        });

        const result = await newDeveloper.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the developer' });
    }
};

const updateDeveloper = async (req, res) => {
    try {
        const { name, surname, email, password, position } = req.body;
        const developer = await Developer.findOne({ _id: req.params.developerID });

        if (!developer) {
            return res.status(404).json({ msg: 'Developer not found' });
        }

        developer.name = name;
        developer.surname = surname;
        developer.email = email;
        developer.password = encryptionHelper.hashStringWithKey(password);
        developer.position = position;
        developer.lastLogin = new Date(Date.now());

        const result = await developer.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the developer' });
    }
};

const updateDeveloperLastLogin = async (req, res) => {
    try {
        const developer = await Developer.findOne({ _id: req.params.developerID });

        if (!developer) {
            return res.status(404).json({ msg: 'Developer not found' });
        }

        developer.lastLogin = new Date();

        const result = await developer.save();
        res.status(200).json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while updating the developer' });
    }
};

const deleteDeveloper = ((req, res) => {
    Developer.findOneAndDelete({ _id: req.params.developerID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Developer not found' }))
})

module.exports = {
    getDevelopers,
    getDeveloper,
    getDeveloperByAuth,
    getDeveloperByEmail,
    createDeveloper,
    updateDeveloper,
    updateDeveloperLastLogin,
    deleteDeveloper
}