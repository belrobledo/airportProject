class Employee {

    constructor(idEmployee = null, firstName, lastName, position, idAirport){
        this.idEmployee = idEmployee;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.idAirport = idAirport;
    }

}

module.exports = Employee;