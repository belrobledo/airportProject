# Airport Project's Database Documentation

## Introduction

The database was built using MySQL and set up inside a Docker container, using the official MySQL docker image. It will be accessed by the server-side application through the specified API Endpoints in the README file. To easily access and manage the data in development, a separate container running PhpMyAdmin was also set up. 

This documentation provides an overview of the database structure, including the entities and their relationships, as well as a description of the attributes of each entity.

## Entity-Relantionship Diagram

(Open the images for better visualization)  

![ERD](https://i.imgur.com/YDooEGs.png)
![ERD-tables](https://i.imgur.com/s1PwYyZ.png)

## Database Structure

### Entities
As it can be seen in the diagrams, this database has 9 entities: Airport, User, Employee, Address, City, Country, Flight, Airplane and Invoice, and a total of 10 tables (including the many-to-many relationship between Flight and User: Booking).   
It was designed this way to achieve normalization and minimize redundancy and dependency in the tables.

- Address, City and Country: To store the address of the airports and the users and keep it normalized, it was divided in three entities: Address (which is the street address), City (to avoid repeated values of the city names) and Country (for the same reason).  

- Airport: Contains the information about each airport, with its international three-letters code, its name, terminals and address id.  
- Employee: Contains the first name, last name and position of the people who works in each airport.  
- User: To store the data about the application's users, such as their privileges and login credentials (email and password), their name, birthdate, phone number and address.  
- Flight: Contains the details about each flight: origin, destination, departure time, distance (in KM), duration (in minutes), price (usd), airline and airplane.  
- Airplane: Has the model name and the capacity for each airplane. This is important to know how many passenger tickets can be sell for an specific flight.
- Invoice: Contains the invoice information about each ticket sell made in a booking.
- Booking: It is not an entity but the relationship between Flight and User. Contains the data about each ticket reservation (such as flight id, id of the user that made the reservation, email and full name of the passenger that will travel).

### Relationships
- Address has a many-to-one relationship with City because many addresses are located in one city. City has the same relationship with Country, as many cities belongs to one country. Also, Address has a one-to-one relationship with Airport and User since only one airport/house can exists in one address, and each airport and user will only have one address.

- Airport has a one-to-many relationship with Employee since an airport usually has many employee but an employee only works for one place. Also, Airport has a one-to-one relationship with Address and a one-to-many relationship with Flight because every airport has several flights arriving and departing from it.

- User has a many-to-many relationship with Flight, since a flight can be booked by many people and an user can book many flights. This relationship is called Booking, which has its own table to represent it. Also, User has a one-to-one relationship with Address.

- Flight has a many-to-one relationship with Airplane because the same airplane usually realizes more than one flight but a flight is only made by one airplane. Also, Flight has a many-to-one relationship with Airport and a many-to-many relationship with User, as explained before.

- Invoice has a many-to-one relationship with Booking (the relationship between Flight and User) because an user can make several ticket reservations and paid all of them together in the same invoice.