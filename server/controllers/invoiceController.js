const invoiceDAO = require('../dao/invoiceDAO');

function getInvoiceById(req, res){
    invoiceDAO.getInvoiceById(req.params.idinvoice).then( invoice => {
        (invoice) ? res.status(200).json(invoice) : res.status(404).json({ error: "Invoice not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getInvoiceByBooking(req, res){
    invoiceDAO.getInvoiceByBooking(req.params.idbooking).then( invoice => {
        (invoice) ? res.status(200).json(invoice) : res.status(404).json({ error: "Invoice not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllInvoices(req, res){
    invoiceDAO.getAllInvoices().then( invoices => {
        (invoices && invoices.length) ? res.status(200).json(invoices) : res.status(404).json({ error: "No invoices found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllInvoicesByUser(req, res){
    invoiceDAO.getAllInvoicesByUser(req.params.iduser).then( invoices => {
        (invoices && invoices.length) ? res.status(200).json(invoices) : res.status(404).json({ error: "No invoices found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { getInvoiceById, getInvoiceByBooking, getAllInvoices, getAllInvoicesByUser };