# Airport API | Endpoints Documentation

<br>

## Table of Contents
[Base URL](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#base-url)  

[Endpoints](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#endpoints)
  * [Authentication](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#authentication)
  * [Users](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#users)
  * [Airports](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#airports)
  * [Flights](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#flights)
  * [Airplanes](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#airplanes)
  * [Tickets](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#tickets)
  * [Bookings](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#bookings)
  * [Invoices](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#invoices)
  * [Employees](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#employees)
  * [Locations](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md#locations)

<br>

## Base URL

    http://localhost:3000/

<br>

## Endpoints

The following endpoints are available for making requests. 

All responses are in JSON format.

<br>

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

<br>

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
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /users/password` - Update user's password.  
  - Authorization-Level: `User`
  - Request:

        Request-Body:
          {
            "idUser": "efa7f593-e7a7-11ed-8236-0242ac180004",
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

<br>

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

<br>

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

- `GET /flights/origin` - Get all flights by airport's origin.  
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
          422 Unprocessable Entity, 
          500 Internal Server Error

- `GET /flights/destination` - Get all flights by airport's destination.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Query Params  | Value Example |
      | ------------- | ------------- |
      | destination   | NRT           |
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
          422 Unprocessable Entity, 
          500 Internal Server Error

- `GET /flights/direct` - Get all direct flights by airport's origin and destination.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Query Params  | Value Example |
      | ------------- | ------------- |
      | origin        | BUE           |
      | destination   | NRT           |
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
          422 Unprocessable Entity, 
          500 Internal Server Error

- `GET /flights/connection` - Get all connecting flights from airport's origin to destination.  
  - Authorization-Level: `Authenticated`
  - Request:

      | Query Params  | Value Example |
      | ------------- | ------------- |
      | origin        | MAD           |
      | destination   | MDQ           |
      | departure     | 2023-10-17    |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          [
            {
              "idFlight": 8,
              "idAirportOrigin": "MAD",
              "idAirportDestination": "BUE",
              "departureTime": "2023-10-17T06:30:00.000Z",
              "distance": 10045,
              "duration": 770,
              "price": 870,
              "airline": "Lufthansa",
              "airplane": {
                "model": "Airbus A310",
                "capacity": 200
                }
            }, {
              "idFlight": 9,
              "idAirportOrigin": "BUE",
              "idAirportDestination": "MDQ",
              "departureTime": "2023-10-17T22:45:00.000Z",
              "distance": 450,
              "duration": 65,
              "price": 92,
              "airline": "Aerolineas Argentinas",
              "airplane": {
                "model": "Airbus A340",
                "capacity": 375
              }
            }
          ], 
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          422 Unprocessable Entity, 
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

<br>

### Airplanes:

- `POST /airplanes` - Add new airplane.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "model": "Airbus A310",
            "capacity": 200
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "Airplane created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity
          500 Internal Server Error

- `GET /airplanes/id/:idairplane` - Get airplane by Airplane ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idairplane    | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idAirplane": 1,
          "model": "Airbus A310",
          "capacity": 200
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /airplanes/model/:airplanemodel` - Get airplane by Model name.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | airplanemodel | Airbus A310   |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idAirplane": 1,
          "model": "Airbus A310",
          "capacity": 200
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /airplanes` - Get all airplanes.  
  - Authorization-Level: `Admin`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idAirplane": 1,
            "model": "Airbus A310",
            "capacity": 200
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `PUT /airplanes` - Update airplane.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idAirplane": 1,
            "model": "Airbus A310",
            "capacity": 200
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Airplane updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /airplanes/:idairplane` - Delete airplane by Airplane ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idairplane    | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Airplane deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

<br>

### Tickets:

- `GET /tickets/id/:idticket` - Get ticket by Ticket ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idticket      | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idTicket": 1,
          "idFlight": 1,
          "email": "belen@gmail.com",
          "firstName": "Belen",
          "lastName": "Robledo",
          "idBooking": 1
        }

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /tickets/booking/:idbooking` - Get all tickets by Booking ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idbooking     | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idTicket": 1,
            "idFlight": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo",
            "idBooking": 1
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /tickets/user/:iduser` - Get all tickets by User ID.   
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | iduser        | efa7f593-e7a7-11ed-8236-0242ac180004 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idTicket": 1,
            "idFlight": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo",
            "idBooking": 1
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `POST /tickets` - Add new ticket.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idFlight": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo",
            "idBooking": 1
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "Flight created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `GET //tickets/flight/:idflight` - Get all tickets by Flight.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idflight      | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idTicket": 1,
            "idFlight": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo",
            "idBooking": 1
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `PUT /tickets` - Update ticket.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idTicket": 1,
            "idFlight": 1,
            "email": "belen@gmail.com",
            "firstName": "Belen",
            "lastName": "Robledo",
            "idBooking": 1
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Flight updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /tickets/:idticket` - Delete ticket by Ticket ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idticket      | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Ticket deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

<br>

### Bookings:

- `POST /bookings` - Generate booking: Add new booking, invoice and tickets.  
  - Authorization-Level: `Admin` | `Users`
  - Request:

        Request-Body:
          {
            "idUser": "efb5bc01-e7a7-11ed-8236-0242ac180004",
            "total": "3570",
            "paymentMethod": "creditCard",
            "idFlight": "1",
            "tickets": [{
              "email": "belen@gmail.com",
              "firstName": "Belen",
              "lastName": "Robledo"
            },
            ...
            ]
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        {
          "message": "Booking, Invoice and Tickets created",
          "idBooking": 1
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          409 Conflict - { "error": "Conflict - not enough available seats in the flight" }
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `GET /bookings/id/:idbooking` - Get booking by Booking ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idbooking     | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idBooking": 1,
          "idUser": "efb5bc01-e7a7-11ed-8236-0242ac180004",
          "idInvoice": 1
        }

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /bookings/user/:iduser` - Get all bookings by User ID.   
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | iduser        | efa7f593-e7a7-11ed-8236-0242ac180004 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idBooking": 1,
            "idUser": "efb5bc01-e7a7-11ed-8236-0242ac180004",
            "idInvoice": 1
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

<br>

### Invoices:

- `GET /invoices/id/:idinvoice` - Get invoice by Invoice ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idinvoice     | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idInvoice": 1,
          "issuedDate": "2023-05-01T06:19:00.000Z",
          "total": 3570,
          "paymentMethod": "creditCard"
        }

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /invoices/booking/:idbooking` - Get invoice by Booking ID.  
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idbooking     | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idInvoice": 1,
          "issuedDate": "2023-05-01T06:19:00.000Z",
          "total": 3570,
          "paymentMethod": "creditCard"
        }

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /invoices/user/:iduser` - Get all invoices by User ID.   
  - Authorization-Level: `Admin` | `User`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | iduser        | efa7f593-e7a7-11ed-8236-0242ac180004 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idInvoice": 1,
            "issuedDate": "2023-05-01T06:19:00.000Z",
            "total": 3570,
            "paymentMethod": "creditCard"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /invoices` - Get all invoices.   
  - Authorization-Level: `Admin`      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idInvoice": 1,
            "issuedDate": "2023-05-01T06:19:00.000Z",
            "total": 3570,
            "paymentMethod": "creditCard"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

<br>

### Employees:

- `POST /employees` - Add new employee.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "firstName": "Belen",
            "lastName": "Robledo",
            "position": "Air Traffic Controller",
            "idAirport": "BUE"
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        { message: "Employee created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity
          500 Internal Server Error

- `GET /employees/id/:idemployee` - Get employee by Employee ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | idemployee    | ef9e0a59-e7a7-11ed-8236-0242ac180004 |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "idEmployee": "ef9e0a59-e7a7-11ed-8236-0242ac180004",
          "firstName": "Belen",
          "lastName": "Robledo",
          "position": "Air Traffic Controller",
          "idAirport": "BUE"
        }

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /employees` - Get all employees.  
  - Authorization-Level: `Admin`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idEmployee": "ef9e0a59-e7a7-11ed-8236-0242ac180004",
            "firstName": "Belen",
            "lastName": "Robledo",
            "position": "Air Traffic Controller",
            "idAirport": "BUE"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /employees/airport/:idairport` - Get all employees by Airport ID.   
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | idairport     | BUE           |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "idEmployee": "ef9e0a59-e7a7-11ed-8236-0242ac180004",
            "firstName": "Belen",
            "lastName": "Robledo",
            "position": "Air Traffic Controller",
            "idAirport": "BUE"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `PUT /employees` - Update employee.  
  - Authorization-Level: `Admin`
  - Request:

        Request-Body:
          {
            "idEmployee": "ef9e0a59-e7a7-11ed-8236-0242ac180004",
            "firstName": "Belen",
            "lastName": "Robledo",
            "position": "Air Traffic Controller",
            "idAirport": "BUE"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Employee updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /employees/:idemployee` - Delete employee by Employee ID.  
  - Authorization-Level: `Admin`
  - Request:

      | Path Variable | Value Example                        |
      | ------------- | ------------------------------------ |
      | idemployee    | ef9e0a59-e7a7-11ed-8236-0242ac180004 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { "message": "Employee deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

<br>

### Locations:

- `GET /countries` - Get all countries.  
  - Authorization-Level: `Admin`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "name": "Argentina"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error

- `GET /cities` - Get all cities.  
  - Authorization-Level: `Admin`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "name": "Buenos Aires",
            "postalCode": "1802",
            "country": "Argentina"
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized, 
          403 Forbidden,
          404 Not found, 
          500 Internal Server Error  