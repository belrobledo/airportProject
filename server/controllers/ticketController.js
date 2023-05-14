const ticketDAO = require('../dao/ticketDAO');

function addTicket(req, res){
    const {idFlight, email, firstName, lastName, idBooking} = req.body;

    if(!idFlight || !email || !firstName || !lastName || !idBooking) {
        return res.status(422).json({ error: "Missing ticket information." });
    }

    ticketDAO.addTicket(idFlight, email, firstName, lastName, idBooking).then(() => {
        res.status(201).json({ message: "Ticket created" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getTicketById(req, res){
    ticketDAO.getTicketById(req.params.idticket).then( ticket => {
        (ticket) ? res.status(200).json(ticket) : res.status(404).json({ error: "Ticket not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllTicketsByFlight(req, res){
    ticketDAO.getAllTicketsByFlight(req.params.idflight).then( tickets => {
        (tickets && tickets.length) ? res.status(200).json(tickets) : res.status(404).json({ error: "No tickets found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllTicketsByBooking(req, res){
    ticketDAO.getAllTicketsByBooking(req.params.idbooking).then( tickets => {
        (tickets && tickets.length) ? res.status(200).json(tickets) : res.status(404).json({ error: "No tickets found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllTicketsByUser(req, res){
    ticketDAO.getAllTicketsByUser(req.params.iduser).then( tickets => {
        (tickets && tickets.length) ? res.status(200).json(tickets) : res.status(404).json({ error: "No tickets found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateTicket(req, res){
    const {idTicket, idFlight, email, firstName, lastName, idBooking} = req.body;

    if(!idTicket || !idFlight || !email || !firstName || !lastName || !idBooking) {
        return res.status(422).json({ error: "Missing ticket information." });
    }

    ticketDAO.updateTicket(idTicket, idFlight, email, firstName, lastName, idBooking).then(() => {
        res.status(200).json({ message: "Ticket updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function deleteTicket(req, res){
    ticketDAO.deleteTicket(req.params.idticket).then(() => {
        res.status(200).json({ message: "Ticket deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addTicket, getTicketById, getAllTicketsByFlight, getAllTicketsByBooking, getAllTicketsByUser, updateTicket, deleteTicket };