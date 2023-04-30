const bookingDAO = require('../dao/bookingDAO');
const invoiceDAO = require('../dao/invoiceDAO');
const ticketDAO = require('../dao/ticketDAO');

async function addBooking(req, res){
    const { idUser, total, paymentMethod, tickets } = req.body;

    if(!idUser || !total || !paymentMethod || (!tickets || tickets.length <= 0)) {
        return res.status(422).json({ error: "Missing booking information." });
    }

    try {
        const idInvoice = await invoiceDAO.addInvoice(total, paymentMethod);
        const idBooking = await bookingDAO.addBooking(idUser, idInvoice);
        for (const ticket of tickets) {
            await ticketDAO.addTicket(ticket.idFlight, ticket.email, ticket.firstName, ticket.lastName, idBooking);
        }
        res.status(200).json({ message: "Booking, Invoice and Tickets created" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
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


module.exports = { addBooking, getBookingById, getAllBookingsByUser };