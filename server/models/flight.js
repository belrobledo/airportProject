class Flight {

    constructor(idFlight = null, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, airplaneModel, airplaneCapacity){
        this.idFlight = idFlight;
        this.idAirportOrigin = idAirportOrigin;
        this.idAirportDestination = idAirportDestination;
        this.departureTime = departureTime;
        this.distance = distance;
        this.duration = duration;
        this.price = price;
        this.airline = airline;
        this.airplane = {
            model: airplaneModel,
            capacity: airplaneCapacity
        }
    }

}

module.exports = Flight;