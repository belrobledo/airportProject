# Airport API Project

Airport API built using Express and MySQL developed for Solvd NodeJS Internship Course. Allows Users to buy flight tickets as well as get information about airports, flights, routes and pricing.  
<br>

## Table of Contents
[Installing this Project](https://github.com/belrobledo/airportProject#installing-this-project)

[Roles and Functionalities](https://github.com/belrobledo/airportProject#roles-and-functionalities)

[OAuth 2.0 Authorization Protocol](https://github.com/belrobledo/airportProject#oauth-20-authorization-protocol)  
* [OAuth 2.0 Flow](https://github.com/belrobledo/airportProject#oauth-20-flow)
* [OAuth 2.0 Authorization Levels](https://github.com/belrobledo/airportProject#oauth-20-authorization-levels)

[API Documentation](https://github.com/belrobledo/airportProject#api-documentation) 

[Database Documentation](https://github.com/belrobledo/airportProject#database-documentation)

[Built With](https://github.com/belrobledo/airportProject#built-with)

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

### OAuth 2.0 Authorization Levels
The server has four possible levels of authorization:
1. `Not Authenticated` - Not logged in.
2. `Authenticated` - Any logged in User.
3. `Admin` - Any logged in User with Admin role.
4. `User` - Logged in User matching the requested resource's owner user ID.

<br>

## API Documentation

To see base URL, available endpoints and all the details about the API documentation, please refer to [documentation-api.md](https://github.com/belrobledo/airportProject/blob/main/documentation-api.md) file.

<br>

## Database Documentation

To see Entity-Relationship Diagram, tables, relationships and all the details about the database documentation, please refer to [documentation-database.md](https://github.com/belrobledo/airportProject/blob/main/documentation-database.md) file.

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
