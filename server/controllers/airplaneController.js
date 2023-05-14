const airplaneDAO = require('../dao/airplaneDAO');

function addAirplane(req, res){
    const {model, capacity} = req.body;

    if(!model || !capacity) {
        return res.status(422).json({ error: "Missing airplane information." });
    }

    airplaneDAO.addAirplane(model, capacity).then(() => {
        res.status(201).json({ message: "Airplane created" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAirplaneById(req, res){
    airplaneDAO.getAirplaneById(req.params.idairplane).then( airplane => {
        (airplane) ? res.status(200).json(airplane) : res.status(404).json({ error: "Airplane not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAirplaneByModel(req, res){
    airplaneDAO.getAirplaneByModel(req.params.airplanemodel).then( airplane => {
        (airplane) ? res.status(200).json(airplane) : res.status(404).json({ error: "Airplane not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllAirplanes(req, res){
    airplaneDAO.getAllAirplanes().then( airplanes => {
        (airplanes && airplanes.length) ? res.status(200).json(airplanes) : res.status(404).json({ error: "No airplanes found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateAirplane(req, res){
    const {idAirplane, model, capacity} = req.body;

    if(!idAirplane || !model || !capacity) {
        return res.status(422).json({ error: "Missing airplane information." });
    }

    airplaneDAO.updateAirplane(idAirplane, model, capacity).then(() => {
        res.status(200).json({ message: "Airplane updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function deleteAirplane(req, res){
    airplaneDAO.deleteAirplane(req.params.idairplane).then(() => {
        res.status(200).json({ message: "Airplane deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addAirplane, getAirplaneById, getAirplaneByModel, getAllAirplanes, updateAirplane, deleteAirplane };