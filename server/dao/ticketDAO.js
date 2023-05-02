const connection = require('../databases/connection');
const Ticket = require('../models/ticket');


function addTicket(idFlight, email, firstName, lastName, idBooking) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddTicket(?, ?, ?, ?, ?);', [idFlight, email, firstName, lastName, idBooking], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getTicketById(idTicket) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetTicketById(?);', idTicket, (error, results) => {
      if (error) {
        reject(error);
      }

      let ticket;
      if(results && results[0].length){
        ticket = new Ticket(results[0][0].idTicket, results[0][0].idFlight, results[0][0].email, results[0][0].firstName, results[0][0].lastName, results[0][0].idBooking);
      }
      resolve(ticket);
    });
  });
}

function getAllTicketsByFlight(idFlight) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllTicketsByFlight(?);', idFlight, (error, results) => {
      if (error) {
        reject(error);
      }

      let tickets = [];
      if(results && results[0].length){
        results[0].forEach(result => {
          let ticket = new Ticket(result.idTicket, result.idFlight, result.email, result.firstName, result.lastName, result.idBooking);
          tickets.push(ticket);
        });
      }
      resolve(tickets);
    });
  });
}

function getAllTicketsByBooking(idBooking) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spGetAllTicketsByBooking(?);', idBooking, (error, results) => {
        if (error) {
          reject(error);
        }
  
        let tickets = [];
        if(results && results[0].length){
          results[0].forEach(result => {
            let ticket = new Ticket(result.idTicket, result.idFlight, result.email, result.firstName, result.lastName, result.idBooking);
            tickets.push(ticket);
          });
        }
        resolve(tickets);
      });
    });
}

function getAllTicketsByUser(idUser) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllTicketsByUser(?);', idUser, (error, results) => {
      if (error) {
        reject(error);
      }

      let tickets = [];
      if(results && results[0].length){
        results[0].forEach(result => {
          let ticket = new Ticket(result.idTicket, result.idFlight, result.email, result.firstName, result.lastName, result.idBooking);
          tickets.push(ticket);
        });
      }
      resolve(tickets);
    });
  });
}

function updateTicket(idTicket, idFlight, email, firstName, lastName, idBooking) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateTicket(?, ?, ?, ?, ?, ?);', [idTicket, idFlight, email, firstName, lastName, idBooking], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}
  
  function deleteTicket(idTicket) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteTicket(?);', idTicket, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}


module.exports = { addTicket, getTicketById, getAllTicketsByFlight, getAllTicketsByBooking, getAllTicketsByUser, updateTicket, deleteTicket };