const connection = require('../databases/connection');
const Booking = require('../models/booking');


function addBookingTransaction(idUser, total, paymentMethod, idFlight, tickets) {
  return new Promise((resolve, reject) => {
    connection.beginTransaction((beginTransactionErr) => {
      if (beginTransactionErr) {
        reject(beginTransactionErr);
      }

      connection.query('CALL spAddInvoice(?, ?, @idInvoice); SELECT @idInvoice AS idInvoice;', [total, paymentMethod], (queryErr, results) => {
        if (queryErr) {
          connection.rollback(() => {
            reject(queryErr);
          });
        }

        const idInvoice = results[1][0].idInvoice;

        connection.query('CALL spAddBooking(?, ?, @idBooking); SELECT @idBooking AS idBooking;', [idUser, idInvoice], (queryErr, results) => {
          if (queryErr) {
            connection.rollback(() => {
              reject(queryErr);
            });
          }

          const idBooking = results[1][0].idBooking;

          // loop through tickets and add them to the database
          const ticketQueries = tickets.map((ticket) => {
            return new Promise((ticketResolve, ticketReject) => {
              connection.query('CALL spAddTicket(?, ?, ?, ?, ?);', [idFlight, ticket.email, ticket.firstName, ticket.lastName, idBooking], (ticketQueryErr, ticketResults) => {
                if (ticketQueryErr) {
                  ticketReject(ticketQueryErr);
                } else {
                  ticketResolve();
                }
              });
            });
          });

          Promise.all(ticketQueries)
            .then(() => {
              connection.commit((commitErr) => {
                if (commitErr) {
                  connection.rollback(() => {
                    reject(commitErr);
                  });
                }

                resolve(idBooking);
              });
            })
            .catch((ticketErr) => {
              connection.rollback(() => {
                reject(ticketErr);
              });
            });
        });
      });
    });
  });
}

function getBookingById(idBooking) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetBookingById(?);', idBooking, (error, results) => {
      if (error) {
        reject(error);
      }

      let booking;
      if(results[0] && results[0].length){
        booking = new Booking(results[0][0].idBooking, results[0][0].idUser, results[0][0].idInvoice);
      }
      resolve(booking);
    });
  });
}

function getAllBookingsByUser(idUser) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllBookingsByUser(?);', idUser, (error, results) => {
      if (error) {
        reject(error);
      }

      let bookings = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let booking = new Booking(result.idBooking, result.idUser, result.idInvoice);
          bookings.push(airplane);
        });
      }
      resolve(bookings);
    });
  });
}
  
function deleteBooking(idBooking) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteBooking(?);', idBooking, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}


module.exports = { addBookingTransaction, getBookingById, getAllBookingsByUser, deleteBooking };