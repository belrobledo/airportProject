const countryDAO = require('../dao/countryDAO');

function addCountry(req, res){
    const {countryname} = req.body;

    if(!countryname) {
        return res.status(422).json({ error: "Missing country name" });
    }

    countryDAO.addCountry(countryname).then(() => {
        res.status(201).json(req.body);
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getCountryById(req, res){
    countryDAO.getCountryById(req.params.idcountry).then( country => {
        (country) ? res.status(200).json(country) : res.status(404).json({ error: "Country not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getCountryByName(req, res){
    countryDAO.getCountryByName(req.params.countryname).then( country => {
        (country) ? res.status(200).json(country) : res.status(404).json({ error: "Country not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllCountries(req, res){
    countryDAO.getAllCountries().then( countries => {
        (countries && countries.length) ? res.status(200).json(countries) : res.status(404).json({ error: "No countries found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

//countryDAO.populateTable();


module.exports = { addCountry, getCountryById, getCountryByName, getAllCountries };