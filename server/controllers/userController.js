const userDAO = require('../dao/userDAO');
const argon2 = require('argon2');


async function addUser(req, res){
    let {isAdmin, email, password, firstName, lastName} = req.body;

    if(!isAdmin || !email || !password || !firstName || !lastName) {
        return res.status(422).json({ error: "Missing user information." });
    }

    const passwordHash = await argon2.hash(password);

    userDAO.addUser(isAdmin, email, passwordHash, firstName, lastName).then(() => {
        res.status(201).json({ message: "User created" });
    }).catch( err => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    })
}

function getUserById(req, res){
    if(req.isAdmin || req.idUser === req.params.iduser){
        userDAO.getUserById(req.params.iduser).then( user => {
            (user) ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
        }).catch( err => {
            res.status(500).json({ error: "Internal server error" });
        })
    } else {
        res.status(403).json({ message: 'You are not authorized to access this resource.' });
    }
}

function getUserByEmail(req, res){
    userDAO.getUserByEmail(req.params.email).then( user => {
        (user) ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getUserByBooking(req, res){
    userDAO.getUserByBooking(req.params.idbooking).then( user => {
        (user) ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllUsers(req, res){
    userDAO.getAllUsers().then( users => {
        (users && users.length) ? res.status(200).json(users) : res.status(404).json({ error: "No users found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateUser(req, res){
    const {idUser, isAdmin, email, firstName, lastName} = req.body;

    if(!idUser || !isAdmin || !email || !firstName || !lastName) {
        return res.status(422).json({ error: "Missing user information." });
    }

    userDAO.updateUser(idUser, isAdmin, email, firstName, lastName).then(() => {
        res.status(200).json({ message: "User updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

async function updateUserPassword(req, res){
    const {idUser, oldPassword, newPassword} = req.body;

    if(!idUser || !oldPassword || !newPassword) {
        return res.status(422).json({ error: "Missing information." });
    }

    const passwordHash = await userDAO.getPasswordHashById(idUser);
    const isVerified = await argon2.verify(passwordHash, oldPassword);

    if(isVerified){
        const newPasswordHash = await argon2.hash(newPassword);

        userDAO.updateUserPassword(idUser, newPasswordHash).then(() => {
            res.status(200).json({ message: "Password updated" });
        }).catch( err => {
            res.status(500).json({ error: "Internal server error" });
        })
    }
}

function deleteUser(req, res){
    userDAO.deleteUser(req.params.iduser).then(() => {
        res.status(200).json({ message: "User deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addUser, getUserById, getUserByEmail, getUserByBooking, getAllUsers, updateUser, updateUserPassword, deleteUser };