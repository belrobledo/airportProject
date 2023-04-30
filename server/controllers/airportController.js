const airportDAO = require('../dao/airportDAO');

function addAirport(req, res){
    const {idAirport, name, addressLine1, addressLine2, city} = req.body;

    if(!idAirport || !name || !addressLine1 || !city) {
        return res.status(422).json({ error: "Missing airport information." });
    }

    airportDAO.addAirport(idAirport, name, addressLine1, addressLine2, city).then(() => {
        res.status(201).json({ message: "Airport created" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAirportById(req, res){
    airportDAO.getAirportById(req.params.idairport).then( airport => {
        (airport) ? res.status(200).json(airport) : res.status(404).json({ error: "Airport not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAirportByCity(req, res){
    airportDAO.getAirportByCity(req.params.city).then( airport => {
        (airport) ? res.status(200).json(airport) : res.status(404).json({ error: "Airport not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllAirports(req, res){
    airportDAO.getAllAirports().then( airports => {
        (airports && airports.length) ? res.status(200).json(airports) : res.status(404).json({ error: "No airports found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateAirport(req, res){
    const {idAirport, name, idAddress, addressLine1, addressLine2, city} = req.body;

    if(!idAirport || !name || !idAddress || !addressLine1 || !city) {
        return res.status(422).json({ error: "Missing airport information." });
    }

    airportDAO.updateAirport(idAirport, name, idAddress, addressLine1, addressLine2, city).then(() => {
        res.status(200).json({ message: "Airport updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function deleteAirport(req, res){
    airportDAO.deleteAirport(req.params.idairport).then(() => {
        res.status(200).json({ message: "Airport deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addAirport, getAirportById, getAirportByCity, getAllAirports, updateAirport, deleteAirport };