class Invoice {

    constructor(idInvoice = null, issuedDate, total, paymentMethod){
        this.idInvoice = idInvoice;
        this.issuedDate = issuedDate;
        this.total = total;
        this.paymentMethod = paymentMethod;
    }

}

module.exports = Invoice;