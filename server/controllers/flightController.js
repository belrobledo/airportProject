const flightDAO = require('../dao/flightDAO');

function addFlight(req, res){
    const {idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane} = req.body;

    if(!idAirportOrigin || !idAirportDestination || !departureTime || !distance || !duration || !price || !airline || !idAirplane) {
        return res.status(422).json({ error: "Missing flight information." });
    }

    flightDAO.addFlight(idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane).then(() => {
        res.status(201).json({ message: "Flight created" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getFlightById(req, res){
    flightDAO.getFlightById(req.params.idflight).then( flight => {
        (flight) ? res.status(200).json(flight) : res.status(404).json({ error: "Flight not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllFlights(req, res){
    flightDAO.getAllFlights().then( flights => {
        (flights && flights.length) ? res.status(200).json(flights) : res.status(404).json({ error: "No flights found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllFlightsByOrigin(req, res){
    const {origin, departure} = req.query;

    flightDAO.getAllFlightsByOrigin(origin, departure).then( flights => {
        (flights && flights.length) ? res.status(200).json(flights) : res.status(404).json({ error: "No flights found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllFlightsByDestination(req, res){
    const {destination, departure} = req.query;

    flightDAO.getAllFlightsByDestination(destination, departure).then( flights => {
        (flights && flights.length) ? res.status(200).json(flights) : res.status(404).json({ error: "No flights found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllFlightsByOriginAndDestination(req, res){
    const {origin, destination, departure} = req.query;

    flightDAO.getAllFlightsByOriginAndDestination(origin, destination, departure).then( flights => {
        (flights && flights.length) ? res.status(200).json(flights) : res.status(404).json({ error: "No flights found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateFlight(req, res){
    const {idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane} = req.body;

    if(!idFlight || !idAirportOrigin || !idAirportDestination || !departureTime || !distance || !duration || !price || !airline || !idAirplane) {
        return res.status(422).json({ error: "Missing flight information." });
    }

    flightDAO.updateFlight(idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane).then(() => {
        res.status(200).json({ message: "Flight updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function deleteFlight(req, res){
    flightDAO.deleteFlight(req.params.idflight).then(() => {
        res.status(200).json({ message: "Flight deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { 
    addFlight, 
    getFlightById, 
    getAllFlights, 
    getAllFlightsByOrigin, 
    getAllFlightsByDestination, 
    getAllFlightsByOriginAndDestination, 
    updateFlight, 
    deleteFlight 
};