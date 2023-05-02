CREATE DATABASE IF NOT EXISTS airproject;
USE airproject;

CREATE TABLE country (
	idCountry tinyint unsigned primary key auto_increment,
    name varchar(60) not null unique
);

CREATE TABLE city (
	idCity int primary key auto_increment,
    name varchar(100) not null unique,
    postalCode varchar(15) not null unique,
    idCountry tinyint unsigned not null,
    CONSTRAINT fk_idCountryC foreign key (idCountry) references country (idCountry)
);

CREATE TABLE address (
	idAddress int primary key auto_increment,
	addressLine1 varchar(100) not null,
    addressLine2 varchar(100),
    idCity int not null,
    CONSTRAINT fk_idCityA foreign key (idCity) references city (idCity)
);

CREATE TABLE airport (
	idAirport char(3) primary key,
	name varchar(100) not null unique,
    idAddress int not null,
    CONSTRAINT fk_idAddressA foreign key (idAddress) references address (idAddress)
);

CREATE TABLE employee (
	idEmployee char(36) primary key default (UUID()),
	firstName varchar(100) not null,
    lastName varchar(100) not null,
    position varchar(50) not null,
    idAirport char(3) not null,
    CONSTRAINT fk_idAirportE foreign key (idAirport) references airport (idAirport)
);

CREATE TABLE user (
	idUser char(36) primary key default (UUID()),
    isAdmin boolean not null default 0,
    email varchar(256) not null unique,
    password varchar(50) not null,
	firstName varchar(100) not null,
    lastName varchar(100) not null,
    birthDate date not null,
    phoneNumber varchar(15) not null,
    idAddress int not null,
    CONSTRAINT fk_idAddressU foreign key (idAddress) references address (idAddress)
);

CREATE TABLE airplane (
	idAirplane tinyint unsigned primary key auto_increment,
	model varchar(50) not null unique,
    capacity smallint not null
);

CREATE TABLE flight (
	idFlight int primary key auto_increment,
    idAirportOrigin char(3) not null,
    idAirportDestination char(3) not null,
    departureTime datetime not null,
    distance smallint unsigned not null,
    duration smallint unsigned not null,
    price float not null,
    airline varchar(50) not null,
    idAirplane tinyint unsigned,
    CONSTRAINT fk_idAirportFOrigin foreign key (idAirportOrigin) references airport (idAirport),
    CONSTRAINT fk_idAirportFDest foreign key (idAirportDestination) references airport (idAirport),
    CONSTRAINT fk_idAirplaneF foreign key (idAirplane) references airplane (idAirplane)
);

CREATE TABLE invoice (
	idInvoice int primary key auto_increment,
    issuedDate datetime not null default (now()),
    total float not null,
    paymentMethod varchar(50) not null
);

CREATE TABLE booking (
	idBooking int primary key auto_increment,
    idUser varchar(36) not null,
    idInvoice int not null,
    CONSTRAINT fk_idUserB foreign key (idUser) references user (idUser),
    CONSTRAINT fk_idInvoiceB foreign key (idInvoice) references invoice (idInvoice)
);

CREATE TABLE ticket (
	idTicket int primary key auto_increment,
    idFlight int not null,
    email varchar(256) not null,
	firstName varchar(100) not null,
    lastName varchar(100) not null,
    idBooking int not null,
    CONSTRAINT fk_idFlightT foreign key (idFlight) references flight (idFlight),
    CONSTRAINT fk_idBookingT foreign key (idBooking) references booking (idBooking)
);
/*--------------------------------------------------------------------------------------------------------------*/


/*STORED PROCEDURES*/
\d $$

/* COUNTRY */
CREATE PROCEDURE spAddCountry(name varchar(60))
BEGIN
  INSERT INTO country (name) VALUES (name);
END 
$$

CREATE PROCEDURE spGetCountryById(idCountry tinyint unsigned)
BEGIN
  SELECT *
  FROM country as c
  WHERE c.idCountry = idCountry;
END 
$$

CREATE PROCEDURE spGetCountryByName(name varchar(60))
BEGIN
  SELECT *
  FROM country as c
  WHERE c.name = name;
END 
$$

CREATE PROCEDURE spGetAllCountries()
BEGIN
  SELECT *
  FROM country;
END 
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* CITY */
CREATE PROCEDURE spAddCity(name varchar(60), postalCode varchar(15), idCountry tinyint unsigned)
BEGIN
  INSERT INTO city (name, postalCode, idCountry) VALUES (name, postalCode, idCountry);
END 
$$

CREATE PROCEDURE spGetCityById(idCity int)
BEGIN
  SELECT ci.idCity, ci.name, ci.postalCode, ci.idCountry, co.name as country
  FROM city as ci
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry 
  WHERE ci.idCity = idCity;
END 
$$

CREATE PROCEDURE spGetCityByName(name varchar(60))
BEGIN
  SELECT ci.idCity, ci.name, ci.postalCode,  ci.idCountry, co.name as country
  FROM city as ci
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry 
  WHERE ci.name = name;
END 
$$

CREATE PROCEDURE spGetAllCities()
BEGIN
  SELECT *
  FROM city;
END 
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* ADDRESS */
CREATE PROCEDURE spAddAddress(addressLine1 varchar(100), addressLine2 varchar(100), idCity int)
BEGIN
  INSERT INTO address (addressLine1, addressLine2, idCity) VALUES (addressLine1, addressLine2, idCity);
END 
$$

CREATE PROCEDURE spGetAddressById(idAddress int)
BEGIN
  SELECT a.idAddress, a.addressLine1, a.addressLine2, a.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM address as a
  INNER JOIN city as ci
  ON a.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry
  WHERE a.idAddress = idAddress;
END 
$$

CREATE PROCEDURE spUpdateAddress(idAddress int, addressLine1 varchar(100), addressLine2 varchar(100), idCity int)
BEGIN
  UPDATE address as a
  SET a.addressLine1 = addressLine1, a.addressLine2 = addressLine2, a.idCity = idCity
  WHERE a.idAddress = idAddress;
END 
$$

CREATE PROCEDURE spDeleteAddress(idAddress int)
BEGIN
  DELETE FROM address as a
  WHERE a.idAddress = idAddress;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* AIRPORT */
CREATE PROCEDURE spAddAirport(idAirport char(3), name varchar(100), addressLine1 varchar(100), addressLine2 varchar(100), idCity int)
BEGIN
  DECLARE addressLID int;
  CALL spAddAddress(addressLine1, addressLine2, idCity);
  SET addressLID = LAST_INSERT_ID();
  
  INSERT INTO airport (idAirport, name, idAddress) VALUES (idAirport, name, addressLID);
END
$$

CREATE PROCEDURE spGetAirportById(idAirport char(3))
BEGIN
  SELECT ai.idAirport, ai.name, ad.idAddress, ad.addressLine1, ad.addressLine2, ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM airport as ai
  INNER JOIN address as ad
  ON ai.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry
  WHERE ai.idAirport = idAirport;
END 
$$

CREATE PROCEDURE spGetAirportByCity(cityName varchar(60))
BEGIN
  SELECT ai.idAirport, ai.name, ad.idAddress, ad.addressLine1, ad.addressLine2, ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM airport as ai
  INNER JOIN address as ad
  ON ai.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry
  WHERE ci.name = cityName;
END 
$$

CREATE PROCEDURE spGetAllAirports()
BEGIN
  SELECT ai.idAirport, ai.name, ad.idAddress, ad.addressLine1, ad.addressLine2, ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM airport as ai
  INNER JOIN address as ad
  ON ai.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry;
END 
$$

CREATE PROCEDURE spUpdateAirport(idAirport char(3), name varchar(100))
BEGIN
  UPDATE airport as a
  SET a.name = name
  WHERE a.idAirport = idAirport;
END 
$$

CREATE PROCEDURE spDeleteAirport(idAirport char(3))
BEGIN
  DELETE FROM airport as a
  WHERE a.idAirport = idAirport;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* EMPLOYEE */
CREATE PROCEDURE spAddEmployee(firstName varchar(100), lastName varchar(100), position varchar(50), idAirport char(3))
BEGIN 
  INSERT INTO employee (firstName, lastName, position, idAirport) VALUES (firstName, lastName, position, idAirport);
END
$$

CREATE PROCEDURE spGetEmployeeById(idEmployee char(36))
BEGIN
  SELECT *
  FROM employee as e
  WHERE e.idEmployee = idEmployee;
END 
$$

CREATE PROCEDURE spGetAllEmployees()
BEGIN
  SELECT *
  FROM employee;
END 
$$

CREATE PROCEDURE spGetAllEmployeesByAirport(idAirport char(3))
BEGIN
  SELECT *
  FROM employee as e
  WHERE e.idAirport = idAirport;
END 
$$

CREATE PROCEDURE spUpdateEmployee(idEmployee char(36), firstName varchar(100), lastName varchar(100), position varchar(50), idAirport char(3))
BEGIN
  UPDATE employee as e
  SET e.firstName = firstName, e.lastName = lastName, e.position = position, e.idAirport = idAirport
  WHERE e.idEmployee = idEmployee;
END 
$$

CREATE PROCEDURE spDeleteEmployee(idEmployee char(36))
BEGIN
  DELETE FROM employee as e
  WHERE e.idEmployee = idEmployee;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* USER */
CREATE PROCEDURE spAddUser(isAdmin boolean, email varchar(256), password varchar(50), firstName varchar(100), lastName varchar(100), birthDate date, phoneNumber varchar(15),
							addressLine1 varchar(100), addressLine2 varchar(100), idCity int)
BEGIN 
  DECLARE addressLID int;
  CALL spAddAddress(addressLine1, addressLine2, idCity);
  SET addressLID = LAST_INSERT_ID();
  
  INSERT INTO user (isAdmin, email, password, firstName, lastName, birthDate, phoneNumber, idAddress) VALUES (isAdmin, email, password, firstName, lastName, birthDate, phoneNumber, addressLID);
END
$$

CREATE PROCEDURE spGetUserById(idUser char(36))
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.password, u.firstName, u.lastName, u.birthDate, u.phoneNumber, u.idAddress, ad.addressLine1, ad.addressLine2, 
		ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM user as u
  INNER JOIN address as ad
  ON u.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spGetUserByEmail(email varchar(256))
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.password, u.firstName, u.lastName, u.birthDate, u.phoneNumber, u.idAddress, ad.addressLine1, ad.addressLine2, 
		ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM user as u
  INNER JOIN address as ad
  ON u.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry
  WHERE u.email = email;
END 
$$

CREATE PROCEDURE spGetAllUsers()
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.password, u.firstName, u.lastName, u.birthDate, u.phoneNumber, u.idAddress, ad.addressLine1, ad.addressLine2, 
		ad.idCity, ci.name as city, ci.postalCode, ci.idCountry, co.name as country
  FROM user as u
  INNER JOIN address as ad
  ON u.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry;
END 
$$

CREATE PROCEDURE spUpdateUser(idUser char(36), isAdmin boolean, email varchar(256), password varchar(50), firstName varchar(100), lastName varchar(100), birthDate date, phoneNumber varchar(15))
BEGIN
  UPDATE user as u
  SET u.isAdmin = isAdmin, u.email = email, u.password = password, u.firstName = firstName, u.lastName = lastName, u.birthDate = birthDate, u.phoneNumber = phoneNumber, u.idAddress = idAddress
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spDeleteUser(idUser char(36))
BEGIN
  DELETE FROM user as u
  WHERE u.idUser = idUser;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* AIRPLANE */
CREATE PROCEDURE spAddAirplane(model varchar(50), capacity smallint)
BEGIN
  INSERT INTO airplane (model, capacity) VALUES (model, capacity);
END 
$$

CREATE PROCEDURE spGetAirplaneById(idAirplane tinyint unsigned)
BEGIN
  SELECT *
  FROM airplane as a
  WHERE a.idAirplane = idAirplane;
END 
$$

CREATE PROCEDURE spGetAirplaneByModel(model varchar(50))
BEGIN
  SELECT *
  FROM airplane as a
  WHERE a.model = model;
END 
$$

CREATE PROCEDURE spGetAllAirplanes()
BEGIN
  SELECT *
  FROM airplane;
END 
$$

CREATE PROCEDURE spUpdateAirplane(idAirplane tinyint unsigned)
BEGIN
  UPDATE airplane as a
  SET a.idAirplane = idAirplane, a.model = model, a.capacity = capacity
  WHERE a.idAirplane = idAirplane;
END 
$$

CREATE PROCEDURE spDeleteAirplane(idAirplane tinyint unsigned)
BEGIN
  DELETE FROM airplane as a
  WHERE a.idAirplane = idAirplane;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* INVOICE */
CREATE PROCEDURE spAddInvoice(total float, paymentMethod varchar(50))
BEGIN
  INSERT INTO invoice (total, paymentMethod) VALUES (total, paymentMethod);
END 
$$

CREATE PROCEDURE spGetInvoiceById(idInvoice int)
BEGIN
  SELECT *
  FROM invoice as i
  WHERE i.idInvoice = idInvoice;
END 
$$

CREATE PROCEDURE spGetAllInvoices()
BEGIN
  SELECT *
  FROM invoice;
END 
$$

CREATE PROCEDURE spUpdateInvoice(idInvoice int, issuedDate datetime, total float, paymentMethod varchar(50))
BEGIN
  UPDATE invoice as i
  SET i.issuedDate = issuedDate, a.total = total, a.paymentMethod = paymentMethod
  WHERE i.idInvoice = idInvoice;
END 
$$

CREATE PROCEDURE spDeleteInvoice(idInvoice int)
BEGIN
  DELETE FROM invoice as i
  WHERE i.idInvoice = idInvoice;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* FLIGHT */
CREATE PROCEDURE spAddFlight(idAirportOrigin char(3), idAirportDestination char(3), departureTime datetime, distance smallint unsigned, duration smallint unsigned,
								price float, airline varchar(50), idAirplane tinyint unsigned)
BEGIN
  INSERT INTO flight (idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane) 
  VALUES (idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane);
END 
$$

CREATE PROCEDURE spGetFlightById(idFlight int)
BEGIN
  SELECT idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, f.idAirplane, model, capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE f.idFlight = idFlight;
END 
$$

CREATE PROCEDURE spGetAllFlightsByOrigin(idAirportOrigin char(3), departure dateTime)
BEGIN
  SELECT idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, f.idAirplane, model, capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE f.idAirportOrigin = idAirportOrigin AND DATE(f.departureTime) = departure
  ORDER BY price;
END 
$$

CREATE PROCEDURE spGetAllFlightsByDestination(idAirportDestination char(3), departure dateTime)
BEGIN
  SELECT idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, f.idAirplane, model, capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE f.idAirportDestination = idAirportDestination AND DATE(f.departureTime) = departure
  ORDER BY price;
END 
$$

CREATE PROCEDURE spGetAllFlightsByOriginAndDestination(idAirportOrigin char(3), idAirportDestination char(3), departure dateTime)
BEGIN
  SELECT idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, f.idAirplane, model, capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE (f.idAirportOrigin = idAirportOrigin AND f.idAirportDestination = idAirportDestination) AND DATE(f.departureTime) = departure
  ORDER BY price;
END 
$$

CREATE PROCEDURE spGetAllFlights()
BEGIN
  SELECT idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, f.idAirplane, model, capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  ORDER BY departureTime, price;
END 
$$

CREATE PROCEDURE spUpdateFlight(idFlight int, idAirportOrigin char(3), idAirportDestination char(3), departureTime datetime, distance smallint unsigned, 
								duration smallint unsigned, price float, airline varchar(50), idAirplane tinyint unsigned)
BEGIN
  UPDATE flight as f
  SET f.idAirportOrigin = idAirportOrigin, f.idAirportDestination = idAirportDestination, f.departureTime = departureTime, f.distance = distance, 
	  f.duration = duration, f.price = price, f.airline = airline, f.idAirplane = idAirplane
  WHERE f.idFlight = idFlight;
END 
$$

CREATE PROCEDURE spDeleteFlight(idFlight int)
BEGIN
  DELETE FROM flight as f
  WHERE f.idFlight = idFlight;
END
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* BOOKING */



/*--------------------------------------------------------------------------------------------------------------*/


/* TICKET */
CREATE PROCEDURE spAddTicket(idFlight int, email varchar(256), firstName varchar(100), lastName varchar(100), idBooking int)
BEGIN
  INSERT INTO ticket (idFlight, email, firstName, lastName, idBooking) VALUES (idFlight, email, firstName, lastName, idBooking);
END 
$$

CREATE PROCEDURE spGetTicketById(idTicket int)
BEGIN
  SELECT *
  FROM ticket as t
  WHERE t.idTicket = idTicket;
END 
$$

CREATE PROCEDURE spGetAllTicketsByFlight(idFlight int)
BEGIN
  SELECT *
  FROM ticket as t
  WHERE t.idFlight = idFlight;
END 
$$

CREATE PROCEDURE spGetAllTicketsByBooking(idBooking int)
BEGIN
  SELECT *
  FROM ticket as t
  WHERE t.idBooking = idBooking;
END 
$$

CREATE PROCEDURE spUpdateTicket(idTicket int, idFlight int, email varchar(256), firstName varchar(100), lastName varchar(100), idBooking int)
BEGIN
  UPDATE ticket as t
  SET t.idFlight = idFlight, t.email = email, t.firstName = firstName, t.lastName = lastName, t.idBooking = idBooking
  WHERE t.idTicket = idTicket;
END 
$$

CREATE PROCEDURE spDeleteTicket(idTicket int)
BEGIN
  DELETE FROM ticket as t
  WHERE t.idTicket = idTicket;
END
$$

\d ;
/*--------------------------------------------------------------------------------------------------------------*/