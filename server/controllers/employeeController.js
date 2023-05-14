const employeeDAO = require('../dao/employeeDAO');

function addEmployee(req, res){
    const {firstName, lastName, position, idAirport} = req.body;

    if(!firstName || !lastName || !position || !idAirport) {
        return res.status(422).json({ error: "Missing employee information." });
    }

    employeeDAO.addEmployee(firstName, lastName, position, idAirport).then(() => {
        res.status(201).json({ message: "Employee created" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getEmployeeById(req, res){
    employeeDAO.getEmployeeById(req.params.idemployee).then( employee => {
        (employee) ? res.status(200).json(employee) : res.status(404).json({ error: "Employee not found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllEmployees(req, res){
    employeeDAO.getAllEmployees().then( employees => {
        (employees && employees.length) ? res.status(200).json(employees) : res.status(404).json({ error: "No employees found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function getAllEmployeesByAirport(req, res){
    employeeDAO.getAllEmployeesByAirport(req.params.idairport).then( employees => {
        (employees && employees.length) ? res.status(200).json(employees) : res.status(404).json({ error: "No employees found" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function updateEmployee(req, res){
    const {idEmployee, firstName, lastName, position, idAirport} = req.body;

    if(!idEmployee || !firstName || !lastName || !position || !idAirport) {
        return res.status(422).json({ error: "Missing employee information." });
    }

    employeeDAO.updateEmployee(idEmployee, firstName, lastName, position, idAirport).then(() => {
        res.status(200).json({ message: "Employee updated" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}

function deleteEmployee(req, res){
    employeeDAO.deleteEmployee(req.params.idemployee).then(() => {
        res.status(200).json({ message: "Employee deleted" });
    }).catch( err => {
        res.status(500).json({ error: "Internal server error" });
    })
}


module.exports = { addEmployee, getEmployeeById, getAllEmployees, getAllEmployeesByAirport, updateEmployee, deleteEmployee };