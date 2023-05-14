const locationDAO = require('../dao/locationDAO');


function getAllCountries(req, res){
    locationDAO.getAllCountries().then( countries => {
        (countries && countries.length) ? res.status(200).json(countries) : res.status(404).json({ error: "No countries found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllCities(req, res){
    locationDAO.getAllCities().then( cities => {
        (cities && cities.length) ? res.status(200).json(cities) : res.status(404).json({ error: "No cities found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { getAllCountries, getAllCities };