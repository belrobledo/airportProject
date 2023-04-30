class Booking {

    constructor(idBooking = null, idUser, idInvoice){
        this.idBooking = idBooking;
        this.idUser = idUser;
        this.idInvoice = idInvoice;
    }

}

module.exports = Booking;