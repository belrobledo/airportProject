class Ticket {

    constructor(idTicket = null, idFlight, email, firstName, lastName, idBooking){
        this.idTicket = idTicket;
        this.idFlight = idFlight;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idBooking = idBooking;
    }

}

module.exports = Ticket;