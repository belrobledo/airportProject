# Airport Project ✈

🛠 Work in Progress 🛠

Airport ticketing web application built using Express.js and (MySQL/MongoDB), developed for Solvd NodeJS Internship Course. Allows users to buy flight tickets as well as get information about flights, routes and pricing.

## Roles and functionalities 👨‍💻

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

## API Documentation 📝


### Endpoints

Users:
- 'GET/users': Get all users.
- 'GET/users/:type': Get all users by type (users/admins).
- 'GET/user/:id': Get a specific user by ID.
- 'POST/user': Create a new user.
- 'PUT/user/:id': Update an existing user by ID.
- 'PATCH/user/:id': Update one field of a user by ID, specifying in the request body the field and the new value.
- 'DELETE/user/:id': Delete a user by ID.

Airports:
- 'GET/airports': Get all airports.
- 'GET/airport/:code': Get an airport by code.
- 'POST/airport': Create a new airport.
- 'PUT/airport/:code': Update an existing airport by code.
- 'PATCH/airport/:code': Update one field of an airport by code, specifying in the request body the field and the new value.
- 'DELETE/airport/:code': Delete an airport by code.

Employees:
- 'GET/employees/:airport': Get all employees by airport. Use airport code.
- 'GET/employee/:id': Get an employee by ID.
- 'POST/employee': Create a new employee.
- 'PUT/employee/:id': Update an existing employee by ID.
- 'PATCH/employee/:id': Update one field of an employee by ID, specifying in the request body the field and the new value.
- 'DELETE/employee/:id': Delete an employee by ID.

Flights:
- 'GET/flights': Get all flights.
- 'GET/flights/:origin': Get all flights from a specific airport. Origin is the code of the airport.
- 'GET/flights/:destination': Get all flights to a specific airport. Destination is the code of the airport.
- 'GET/flights/origin=:origin&destination=:destination': Get all flights from origin Airport to destination Airport. Use the code of the airports.
- 'GET/flight/:id': Get a flight by ID.
- 'POST/flight': Create a new flight.
- 'PUT/flight/:id': Update an existing flight by ID.
- 'PATCH/flight/:id': Update one field of a flight by ID, specifying in the request body the field and the new value.
- 'DELETE/flight/:id': Delete a flight by ID.

Airplanes:
- 'GET/airplanes': Get all airplanes.
- 'GET/airplane/:id': Get an airplane by ID.
- 'POST/airplane': Create a new airplane.
- 'PUT/airplane/:id': Update an existing airplane by ID.
- 'DELETE/airplane/:id': Delete an airplane by ID.

## Data Structure:

- User:  object(fields: id, type, email, password, firstname, lastname, birthdate, mobileNumber) divided between clients and admins.
- Airport: object(fields: code, name, address, terminals, employees)
- Employee: object(fields: id, firstname, lastname, airport, position)
- Flight:  object(fields: id, origin, destination, dateTime, duration, distance, price, airline, airplane, passengers)
- Airplane: object(fields: id, model, capacity)
- Graph: map(key: airport.code, value: [array of flights from aiport])


## Built With 💻

  - [Node JS](https://nodejs.org/)
  - [Express](http://expressjs.com/)
  - ...

## Author
[![Belen Robledo](https://avatars.githubusercontent.com/u/106560013?v=4&s=144)](https://github.com/belrobledo)  | 
---|
[Belén Robledo ](https://github.com/belrobledo) |