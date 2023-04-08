class Flight {

    constructor(idFlight = "", idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane){
        this.idFlight = idFlight;
        this.idAirportOrigin = idAirportOrigin;
        this.idAirportDestination = idAirportDestination;
        this.departureTime = departureTime;
        this.distance = distance;
        this.duration = duration;
        this.price = price;
        this.airline = airline;
        this.idAirplane = idAirplane;
    }

}