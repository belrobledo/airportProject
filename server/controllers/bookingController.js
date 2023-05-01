const bookingDAO = require('../dao/bookingDAO');
const flightDAO = require('../dao/flightDAO');


async function addBookingTransaction(req, res){
    const { idUser, total, paymentMethod, idFlight, tickets } = req.body;

    if(!idUser || !total || !paymentMethod || !idFlight || (!tickets || tickets.length <= 0)) {
        return res.status(422).json({ error: "Missing booking information." });
    }

    try {
        const availableSeats = await flightDAO.getAvailableSeats(idFlight);
        console.log("available seats: ", availableSeats);

        if(!availableSeats){
            return res.status(404).json({ error: "Flight not found" });
        }

        if(tickets.length > availableSeats){
            console.log("too many tickets: ", availableSeats);
            return res.status(409).json({ error: "Conflict - not enough available seats in the flight" });
        }
        
        const idBooking = await bookingDAO.addBookingTransaction(idUser, total, paymentMethod, idFlight, tickets);
        return res.status(201).json({ message: "Booking, Invoice and Tickets created", idBooking: idBooking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

function getBookingById(req, res){
    bookingDAO.getBookingById(req.params.idbooking).then( booking => {
        (booking) ? res.status(200).json(booking) : res.status(404).json({ error: "Booking not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllBookingsByUser(req, res){
    bookingDAO.getAllBookingsByUser(req.params.iduser).then( bookings => {
        (bookings && bookings.length) ? res.status(200).json(bookings) : res.status(404).json({ error: "No bookings found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addBookingTransaction, getBookingById, getAllBookingsByUser };