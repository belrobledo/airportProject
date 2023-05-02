# Airport Project

(Work in Progress)

Airport ticketing web application built using Express.js and MySQL, developed for Solvd NodeJS Internship Course. Allows users to buy flight tickets as well as get information about flights, routes and pricing.  

## Table of Contents
[Roles and functionalities](https://github.com/belrobledo/airportProject#roles-and-functionalities-)

[Installing this Project](https://github.com/belrobledo/airportProject#installing-this-project-)

[OAuth 2.0 Authorization Protocol](https://github.com/belrobledo/airportProject#oauth-20-authorization-protocol)  
* [OAuth 2.0 Flow](https://github.com/belrobledo/airportProject#oauth-20-flow)

[API Documentation](https://github.com/belrobledo/airportProject#api-documentation-) 
* [Users](https://github.com/belrobledo/airportProject#users)
* [Airports](https://github.com/belrobledo/airportProject#airports)
* [Employees](https://github.com/belrobledo/airportProject#employees)
* [Flights](https://github.com/belrobledo/airportProject#flights)
* [Airplanes](https://github.com/belrobledo/airportProject#airplanes)
 

[Data Structure](https://github.com/belrobledo/airportProject#data-structure)
* [User](https://github.com/belrobledo/airportProject#user)
* [Airport](https://github.com/belrobledo/airportProject#airport)
* [Employee](https://github.com/belrobledo/airportProject#employee)
* [Flight](https://github.com/belrobledo/airportProject#flight)
* [Airplane](https://github.com/belrobledo/airportProject#airplane)

[Database Documentation](https://github.com/belrobledo/airportProject#database-documentation)

[Built With](https://github.com/belrobledo/airportProject#built-with-)

[Author](https://github.com/belrobledo/airportProject#author)


## Roles and functionalities

You should be able to log in as two principal roles, users and admins, with the following functionalities:

### ◻ User
- Search for flights by origin, destination, date and number of passengers.
- View available flights with their prices, duration, airline and any layovers/stops.
- Filter and sort search results by price, duration, etc.
- Reserve and purchase tickets for selected flights.
- Receive notifications for flight updates, cancellations and delays.

### ◻ Admin
- Manage and update flight schedules, routes, prices and availability.
- Add, edit and delete airport information.


## Installing this Project

You can clone the repository. Cloning will give you a copy of the project up and running on
your local machine for development and testing purposes. You must have npm and Docker installed in your computer.

Step by step instructions:

1- Clone the repo

    git clone https://github.com/belrobledo/airportProject.git

2- Run the following command in the terminal

    docker-compose up --build

3- You will now be able to access it at localhost:3000

## OAuth 2.0 Authorization Protocol

This project implements an OAuth 2.0 authentication flow.

### OAuth 2.0 Flow
1. The user fills the login form with his credentials (email and password) and clicks the "Login" button on the login page.  
2. The client sends an authentication request to the server.  
3. The server authenticates the user and generate a pair of tokens (Access token and Refresh token). Token's value is a uuid random string. Access token has an expiration time of 15 minutes. Refresh tokens has an expiration time of 6 hours.
4. The server stores the tokens in Redis Database, along with the user's ID and user's Role. Finally, the server sends the tokens to the Client as HTTP Cookies.  
5. The client can then use the access token to authorizate and make requests to protected resources. If Access token has expired, the client can use the Refresh token to obtain a new pair of tokens. If Refresh token has also expired, the client must authenticate again with his login credentials.    

## API Documentation

### Endpoints

The following endpoints are available. See "Data Structures" for examples of possible JSON responses for each class.

### Users:
- 'GET/users': Get all users.  
   Status: 200 OK if successful, 404 Not Found if no users found.
- 'GET/users/:type': Get all users by type (user/admin).  
   Status: 200 OK if successful, 404 Not Found if no users found with specified type.
- 'GET/user/:id': Get a specific user by ID.  
   Status: 200 OK if successful, 404 Not Found if no user found with specified ID.
- 'POST/user': Create a new user.  
   Status: 201 Created if successful, 400 Bad Request if request is invalid.
- 'PUT/user/:id': Update an existing user by ID.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no user found with specified ID.
- 'PATCH/user/:id': Update one field of a user by ID, specifying in the request body the field and the new value.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no user found with specified ID.
- 'DELETE/user/:id': Delete a user by ID.  
   Status: 204 No Content if successful, 404 Not Found if no user found with specified ID.

### Airports:
- 'GET/airports': Get all airports.  
   Status: 200 OK if successful, 404 Not Found if no airports found.
- 'GET/airport/:code': Get an airport by code.  
   Status: 200 OK if successful, 404 Not Found if no airport found with specified code.  
- 'POST/airport': Create a new airport.  
   Status: 201 Created if successful, 400 Bad Request if request is invalid.  
- 'PUT/airport/:code': Update an existing airport by code.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no airport found with specified code.  
- 'PATCH/airport/:code': Update one field of an airport by code, specifying in the request body the field and the new value.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no airport found with specified code.  
- 'DELETE/airport/:code': Delete an airport by code.  
   Status: 204 No Content if successful, 404 Not Found if no airport found with specified code.  

### Employees:
- 'GET/employees/:airport': Get all employees by airport. Use airport code.  
   Status: 200 OK if successful, 404 Not Found if no employees found with specified airport code.  
- 'GET/employee/:id': Get an employee by ID.  
   Status: 200 OK if successful, 404 Not Found if no employee found with specified ID.  
- 'POST/employee': Create a new employee.  
   Status: 201 Created if successful, 400 Bad Request if request is invalid.
- 'PUT/employee/:id': Update an existing employee by ID.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no employee found with specified ID.  
- 'PATCH/employee/:id': Update one field of an employee by ID, specifying in the request body the field and the new value.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no employee found with specified ID.  
- 'DELETE/employee/:id': Delete an employee by ID.  
   Status:  204 No Content if successful, 404 Not Found if no employee found with specified ID.  

### Flights:
- 'GET/flights': Get all flights.  
   Status: 200 OK if successful, 404 Not Found if no flights found.  
- 'GET/flights/:origin': Get all flights from a specific airport. Origin is the code of the airport.  
   Status: 200 OK if successful, 404 Not Found if no flights found with specified origin airport code.  
- 'GET/flights/:destination': Get all flights to a specific airport. Destination is the code of the airport.  
   Status: 200 OK if successful, 404 Not Found if no flights found with specified destination airport code.  
- 'GET/flights/origin=:origin&destination=:destination': Get all flights from origin Airport to destination Airport. Use the code of the airports.  
   Status: 200 OK if successful, 404 Not Found if no flights found with specified origin and destination airport codes.  
- 'GET/flight/:id': Get a flight by ID.  
   Status: 200 OK if successful, 404 Not Found if no flight found with specified ID.  
- 'POST/flight': Create a new flight.  
   Status: 201 Created if successful, 400 Bad Request if request is invalid.
- 'PUT/flight/:id': Update an existing flight by ID.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no flight found with specified ID.  
- 'PATCH/flight/:id': Update one field of a flight by ID, specifying in the request body the field and the new value.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if no flight  
- 'DELETE/flight/:id': Delete a flight by ID.  
   Status: 204 No Content if succesful, 404 Not Found if no flight found witch specified ID.

### Airplanes:
- 'GET/airplanes': Get all airplanes.  
   Status: 200 OK if successful, 404 Not Found if no airplanes found.  
- 'GET/airplane/:id': Get an airplane by ID.  
   Status: 200 OK if successful, 404 Not Found if no airplane with the specified ID was found.  
- 'POST/airplane': Create a new airplane.  
   Status: 201 Created if successful, 400 Bad Request if request is invalid.   
- 'PUT/airplane/:id': Update an existing airplane by ID.  
   Status: 200 OK if successful, 400 Bad Request if request is invalid, 404 Not Found if the airplane was not found.    
- 'DELETE/airplane/:id': Delete an airplane by ID.  
   Status: 204 No Content if successful, 404 Not Found if no airplane found with the specified ID.    

## Data Structure

### User  
Data type: Object  
Fields: id, type, email, password, firstName, ,lastName, birthDate, mobileNumber.

User example:   
{  
    "id": "20d7c49c-0e3c-4784-8fee-dcd2973746e2",  
    "type": "user" / "admin",  
    "email": "john@example.com",  
    "password": "hashedPassword",  
    "firstName": "John",  
    "lastName": "Smith",  
    "birthDate": "1987-10-10",  
    "mobileNumber": "555-555-5556"  
}

### Airport
Data type: Object  
Fields: code, name, address, terminals, employees.  

Airport example:  
{  
   "code": "JFK",  
   "name": "John F. Kennedy International Airport",  
   "address": "Queens, NY 11430, USA",  
   "terminals": [ Terminal A, Terminal B, ... , Terminal Z ],  
   "employees": [ employee1, employee2, ... , employeeN ]   
}  


### Employee
Data type: Object  
Fields: id, firstName, lastName, airportCode, position.

Employee example:  
{  
   "id": "24bce4e6-0439-4354-a780-4fe984a7f074",  
   "firstName": "Martha",  
   "lastName": "Kent",  
   "airportCode": "JFK",  
   "position": "Customer Service"  
}

### Flight

Data type: Object  
Fields: id, origin, destination, dateTime, duration, distance, price, airline, airplane, passengers.  

Flight example:  
{  
   "id": 456,  
   "origin": "LHR",  
   "destination": "JFK",  
   "dateTime": "2023-05-01 08:00:00",  
   "duration": 420,   //duration in minutes  
   "distance": 3450,   //distance in kilometers  
   "price": 800.00,   //price in USD  
   "airline": "British Airways",  
   "airplane": { id: 3, name: "Boeing 777", capacity: 312 },  
   "passengers": [ passenger1, passenger2, passenger3, ... , passengerN ]
}  

### Airplane

Data type: Object  
Fields: id, model, capacity.  
  
{  
   "id": 5,  
   "model": "Airbus A380",  
   "capacity": 853  
}

## Database Documentation

To see all the details about the database documentation, please check [this markdown](https://github.com/belrobledo/airportProject/blob/master/database-info.md).

## Built With

  - [Node JS](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](http://expressjs.com/) - Web framework for node.js
  - [Docker](https://www.docker.com/) - Used to create docker containers of server-side and Redis.
  - [MySQL](https://www.mysql.com/) - SQL Database used to persist project data.
  - [Redis](https://redis.io/) - In-memory database used to store OAuth 2.0 tokens
  - [OAuth 2.0](https://oauth.net/2/) - Authorization Protocol

## Author
[![Belen Robledo](https://avatars.githubusercontent.com/u/106560013?v=4&s=144)](https://github.com/belrobledo)  | 
---|
[Belén Robledo ](https://github.com/belrobledo) |