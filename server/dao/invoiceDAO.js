const connection = require('../databases/connection');
const Invoice = require('../models/invoice');


function addInvoice(total, paymentMethod) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddInvoice(?, ?);', [total, paymentMethod], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getInvoiceById(idInvoice) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetInvoiceById(?);', idInvoice, (error, results) => {
      if (error) {
        reject(error);
      }

      let invoice;
      if(results[0] && results[0].length){
        invoice = new Invoice(results[0][0].idInvoice, results[0][0].issuedDate, results[0][0].total, results[0][0].paymentMethod);
      }
      resolve(invoice);
    });
  });
}

function getInvoiceByBooking(idBooking) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetInvoiceByBooking(?);', idBooking, (error, results) => {
      if (error) {
        reject(error);
      }

      let invoice;
      if(results[0] && results[0].length){
        invoice = new Invoice(results[0][0].idInvoice, results[0][0].issuedDate, results[0][0].total, results[0][0].paymentMethod);
      }
      resolve(invoice);
    });
  });
}

function getAllInvoices() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllInvoices();', (error, results) => {
      if (error) {
        reject(error);
      }

      let invoices = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let invoice = new Invoice(result.idInvoice, result.issuedDate, result.total, result.paymentMethod);
          invoices.push(invoice);
        });
      }
      resolve(invoices);
    });
  });
}

function getAllInvoicesByUser(idUser) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllInvoicesByUser(?);', idUser, (error, results) => {
      if (error) {
        reject(error);
      }

      let invoices = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let invoice = new Invoice(result.idInvoice, result.issuedDate, result.total, result.paymentMethod);
          invoices.push(invoice);
        });
      }
      resolve(invoices);
    });
  });
}


module.exports = { addInvoice, getInvoiceById, getInvoiceByBooking, getAllInvoices, getAllInvoicesByUser };