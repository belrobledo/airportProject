class Airport {

    constructor(idAirport = null, name, idAddress, addressLine1, addressLine2 = null, city, postalCode, country){
        this.idAirport = idAirport;
        this.name = name;
        this.address = {
            idAddress: idAddress,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            country: country
        };
    }

}

module.exports = Airport;