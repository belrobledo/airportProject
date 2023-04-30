const connection = require('../databases/connection');
const Booking = require('../models/booking');


function addBooking(idUser, idInvoice) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddBooking(?, ?, @pIdBooking); SELECT @pIdBooking AS idBooking;', [idUser, idInvoice], (error, results) => {
      if (error) {
        reject(error);
      }

      const idBooking = results[1][0].idBooking;
      resolve(idBooking);
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


module.exports = { addBooking, getBookingById, getAllBookingsByUser, deleteBooking };