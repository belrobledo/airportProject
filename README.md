# Airport API Project

Airport API built using Express and MySQL developed for Solvd NodeJS Internship Course. Allows Users to buy flight tickets as well as get information about airports, flights, routes and pricing.  
<br>

## Table of Contents
[Installing this Project](https://github.com/belrobledo/airportProject#installing-this-project-)

[Roles and functionalities](https://github.com/belrobledo/airportProject#roles-and-functionalities-)

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

<br>

## Installing this Project

You can clone the repository. Cloning will give you a copy of the project up and running on
your local machine for development and testing purposes. You must have npm and Docker installed in your computer.

Step by step instructions:

1- Clone the repo

    git clone https://github.com/belrobledo/airportProject.git

2- Run the following command in the terminal at project's root directory

    docker-compose up --build

3- Wait until all Docker's containers are up and running, indicated with the following message in the console

    "Connected to MySQL database! Server is ready to use."

4- You will now be able to access it at localhost:3000

    http://localhost:3000/
<br>

## Roles and Functionalities

There system supports two primary user roles: Users and Admins. Each role has the following functionalities:

### ◻ User
- Search for flights by origin, destination and departure time.
- View available direct or connecting flights with their prices, duration, airline and any layovers/stops.
- Filter and sort search results by price, departure, etc.
- Book and purchase tickets for selected flights.

### ◻ Admin
- All of the User's functionalities.
- Manage and update flight schedules, routes, prices and availability.
- Add, edit and delete airport information.

<br>

## OAuth 2.0 Authorization Protocol

This project implements an OAuth 2.0 authentication flow.

### OAuth 2.0 Flow
1. The User fills a login form with his credentials (email and password).  

2. The Client sends an authentication request with User's credentials to the following API's endpoint: `http://localhost:3000/login`.  
3. The Server authenticates the User and generate a pair of Tokens (Access Token and Refresh Token). Token's value is an uuid random string. Access Token has an expiration time of 15 minutes. Refresh Tokens has an expiration time of 6 hours.
4. The Server stores the Tokens in a Redis database, along with the User's `idUser` ID and User's `isAdmin` role. Finally, the Server sends the Tokens to the Client as HTTP Cookies.  
5. The Client can then use the Access Token to authorizate and make requests to protected resources. If Access Token has expired, the Client can use the Refresh Token to obtain a new pair of Tokens. If Refresh Token has also expired, the Client must authenticate again with the User's login credentials. 

### OAuth 2.0 Authorization-Level
The server has four possible levels of authorization:
1. `Not Authenticated` - Not logged in.
2. `Authenticated` - Any logged in User.
3. `Admin` - Any logged in User with Admin role.
4. `User` - Logged in User matching the requested resource's owner user ID.

<br>

## API Documentation

### Base URL

    http://localhost:3000/

### Endpoints

The following endpoints are available for making requests. All responses are in JSON format.

### Authentication:

- `POST /login` - User login.  
  - Authorization-Level: `Not Aunthenticated`
  - Request:

        Request-Body:
          {
            "email": "belen@gmail.com",
            "password": "123"
          }
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Ok - logged in" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `GET /logout` - User logout.  
  - Authorization-Level: `Aunthenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Ok - logged out" }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

### Users:

- `POST /users` - Add new user.  
  - Authorization-Level: `Not Aunthenticated`
  - Request:

        Request-Body:
          {
            "idUser": "03864baa-e787-11ed-af88-0242ac140004",
            "isAdmin": 1,
            "password": "123",
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo"
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "User created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `GET /users/id/:iduser` - Get user by User ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | iduser        | efa7f593-e7a7-11ed-8236-0242ac180004 |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idUser": "efa7f593-e7a7-11ed-8236-0242ac180004",
          "isAdmin": 1,
          "email": "belen@gmail.com",
          "firstName": "Belen",
          "lastName": "Robledo"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /users/booking/:idbooking` - Get user by Booking ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idbooking     | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idUser": "efa7f593-e7a7-11ed-8236-0242ac180004",
          "isAdmin": 1,
          "email": "belen@gmail.com",
          "firstName": "Belen",
          "lastName": "Robledo"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `PUT /users` - Update user.  
  - Authorization-Level: `User`
  - Request:

        Request-Body:
          {
            "idUser": "03864baa-e787-11ed-af88-0242ac140004",
            "isAdmin": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "User updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /users/password` - Update user's password.  
  - Authorization-Level: `User`
  - Request:

        Request-Body:
          {
            "idUser": "03864baa-e787-11ed-af88-0242ac140004",
            "oldPassword": "123",
            "newPassword": "456"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Password updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `GET /users` - Get all users.  
  - Authorization-Level: `Admin`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idUser": "efa7f593-e7a7-11ed-8236-0242ac180004",
            "isAdmin": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `DELETE /users/:iduser` - Delete user by User ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | iduser        | efa7f593-e7a7-11ed-8236-0242ac180004 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "User deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

### Airports:

- `GET /airports/id/:idairport` - Get airport by Airport ID.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idairport     | BUE           |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idAirport": "BUE",
          "name": "Aeropuerto Internacional Ezeiza",
          "address": {
              "idAddress": 1,
              "addressLine1": "Autopista Teniente General Ricchieri",
              "addressLine2": "KM. 33,5",
              "city": "Buenos Aires",
              "postalCode": "1802",
              "country": "Argentina"
          }
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /airports/city/:city` - Get airport by City.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | city          | Buenos Aires  |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idAirport": "BUE",
          "name": "Aeropuerto Internacional Ezeiza",
          "address": {
              "idAddress": 1,
              "addressLine1": "Autopista Teniente General Ricchieri",
              "addressLine2": "KM. 33,5",
              "city": "Buenos Aires",
              "postalCode": "1802",
              "country": "Argentina"
          }
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /airports` - Get all airports.  
  - Authorization-Level: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idAirport": "BUE",
            "name": "Aeropuerto Internacional Ezeiza",
            "address": {
                "idAddress": 1,
                "addressLine1": "Autopista Teniente General Ricchieri",
                "addressLine2": "KM. 33,5",
                "city": "Buenos Aires",
                "postalCode": "1802",
                "country": "Argentina"
            }
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `POST /airports` - Add new airport.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idAirport": "BUE",
            "name": "Aeropuerto Internacional Ezeiza",
            "addressLine1": "Autopista Teniente General Ricchieri",
            "addressLine2": "KM. 33,5",
            "city": "Buenos Aires"
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "Airport created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `PUT /airports` - Update airport.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idAirport": "BUE",
            "name": "Aeropuerto Internacional Ezeiza",
            "idAddress": 1,
            "addressLine1": "Autopista Teniente General Ricchieri",
            "addressLine2": "KM. 33,5",
            "city": "Buenos Aires"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Airport updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /airports/:idairport` - Delete airport by Airport ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idairport     | BUE           |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Airport deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

### Flights:

- `GET /flights/id/:idflight` - Get flight by Flight ID.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idflight      | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idFlight": 1,
          "idAirportOrigin": "BUE",
          "idAirportDestination": "NRT",
          "departureTime": "2023-12-26T19:30:00.000Z",
          "distance": 18362,
          "duration": 1830,
          "price": 1190,
          "airline": "Aerolineas Argentinas",
          "airplane": {
              "model": "Airbus A340",
              "capacity": 375
          }
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /flights/availability/:idflight` - Get number of available seats in a flight.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idflight      | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { availableSeats: 230}

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /flights` - Get all flights.  
  - Authorization-Level: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idFlight": 1,
            "idAirportOrigin": "BUE",
            "idAirportDestination": "NRT",
            "departureTime": "2023-12-26T19:30:00.000Z",
            "distance": 18362,
            "duration": 1830,
            "price": 1190,
            "airline": "Aerolineas Argentinas",
            "airplane": {
                "model": "Airbus A340",
                "capacity": 375
            }
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /flights/origin` - Get all flights.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Query Params  | Value Example |
      | ------------- | ------------- |
      | origin        | BUE           |
      | departure     | 2023-12-26    |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idFlight": 1,
            "idAirportOrigin": "BUE",
            "idAirportDestination": "NRT",
            "departureTime": "2023-12-26T19:30:00.000Z",
            "distance": 18362,
            "duration": 1830,
            "price": 1190,
            "airline": "Aerolineas Argentinas",
            "airplane": {
                "model": "Airbus A340",
                "capacity": 375
            }
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `POST /flights` - Add new flight.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idAirportOrigin": "BUE",
            "idAirportDestination": "NRT",
            "departureTime": "2023-12-26 19:30:00",
            "distance": 18362,
            "duration": 1830,
            "price": 1190,
            "airline": "Aerolineas Argentinas",
            "idAirplane": 2
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "Flight created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `PUT /flights` - Update flight.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idFlight": 1,
            "idAirportOrigin": "BUE",
            "idAirportDestination": "NRT",
            "departureTime": "2023-12-26 19:30:00",
            "distance": 18362,
            "duration": 1830,
            "price": 1190,
            "airline": "Aerolineas Argentinas",
            "idAirplane": 2
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Flight updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /flights/:idflight` - Delete flight by Flight ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idflight      | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Flight deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

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

<br>

## Database Documentation

To see all the details about the database documentation, please refer to [this markdown](https://github.com/belrobledo/airportProject/blob/master/database-info.md).

<br>

## Built With

  - [Node JS](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](http://expressjs.com/) - Web framework for Node JS.
  - [Docker](https://www.docker.com/) - Used to create docker containers for Server, Redis and DB services.
  - [MySQL](https://www.mysql.com/) - SQL relational database used to persist data.
  - [Redis](https://redis.io/) - In-memory database used to store OAuth 2.0 Tokens.
  - [OAuth 2.0](https://oauth.net/2/) - Authorization Protocol.

<br>

## Author
[![Belen Robledo](https://avatars.githubusercontent.com/u/106560013?v=4&s=144)](https://github.com/belrobledo)  | 
---|
[Belén Robledo ](https://github.com/belrobledo) |