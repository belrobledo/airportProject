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
    CONSTRAINT fk_idCountryC foreign key (idCountry) references country (idCountry) on delete cascade
);

CREATE TABLE address (
	idAddress int primary key auto_increment,
	addressLine1 varchar(100) not null,
    addressLine2 varchar(100),
    idCity int not null,
    CONSTRAINT fk_idCityA foreign key (idCity) references city (idCity) on delete cascade
);

CREATE TABLE airport (
	idAirport char(3) primary key,
	name varchar(100) not null unique,
    idAddress int not null,
    CONSTRAINT fk_idAddressA foreign key (idAddress) references address (idAddress) on delete cascade
);

CREATE TABLE employee (
	idEmployee char(36) primary key default (UUID()),
	firstName varchar(100) not null,
    lastName varchar(100) not null,
    position varchar(50) not null,
    idAirport char(3) not null,
    CONSTRAINT fk_idAirportE foreign key (idAirport) references airport (idAirport) on delete cascade
);

CREATE TABLE user (
	idUser char(36) primary key default (UUID()),
    isAdmin boolean not null default 0,
    email varchar(256) not null unique,
    passwordHash char(97) not null,
	firstName varchar(100) not null,
    lastName varchar(100) not null
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
    CONSTRAINT fk_idAirportFOrigin foreign key (idAirportOrigin) references airport (idAirport) on delete cascade,
    CONSTRAINT fk_idAirportFDest foreign key (idAirportDestination) references airport (idAirport) on delete cascade,
    CONSTRAINT fk_idAirplaneF foreign key (idAirplane) references airplane (idAirplane) on delete restrict
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
    CONSTRAINT fk_idFlightT foreign key (idFlight) references flight (idFlight) on delete restrict,
    CONSTRAINT fk_idBookingT foreign key (idBooking) references booking (idBooking) on delete restrict
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

CREATE PROCEDURE spGetAllCountries()
BEGIN
  SELECT name
  FROM country;
END 
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* CITY */
CREATE PROCEDURE spAddCity(name varchar(60), postalCode varchar(15), country varchar(60))
BEGIN
  DECLARE idCountry tinyint unsigned;
  
  SELECT c.idCountry INTO idCountry
  FROM country as c
  WHERE c.name = country;

  INSERT INTO city (name, postalCode, idCountry) VALUES (name, postalCode, idCountry);
END 
$$

CREATE PROCEDURE spGetAllCities()
BEGIN
  SELECT ci.name, postalCode, co.name as country
  FROM city as ci
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry;
END 
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* ADDRESS */
CREATE PROCEDURE spAddAddress(addressLine1 varchar(100), addressLine2 varchar(100), city varchar(60))
BEGIN
  DECLARE idCity int;
  
  SELECT c.idCity INTO idCity
  FROM city as c
  WHERE c.name = city;

  INSERT INTO address (addressLine1, addressLine2, idCity) VALUES (addressLine1, addressLine2, idCity);
END 
$$

CREATE PROCEDURE spUpdateAddress(idAddress int, addressLine1 varchar(100), addressLine2 varchar(100), city varchar(60))
BEGIN
  DECLARE idCity int;
  
  SELECT c.idCity INTO idCity
  FROM city as c
  WHERE c.name = city;

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
CREATE PROCEDURE spAddAirport(idAirport char(3), name varchar(100), addressLine1 varchar(100), addressLine2 varchar(100), city varchar(60))
BEGIN
  DECLARE addressLID int;
  CALL spAddAddress(addressLine1, addressLine2, city);
  SET addressLID = LAST_INSERT_ID();
  
  INSERT INTO airport (idAirport, name, idAddress) VALUES (idAirport, name, addressLID);
END
$$

CREATE PROCEDURE spGetAirportById(idAirport char(3))
BEGIN
  SELECT ai.idAirport, ai.name, ai.idAddress, ad.addressLine1, ad.addressLine2, ci.name as city, ci.postalCode, co.name as country
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
  SELECT ai.idAirport, ai.name, ai.idAddress, ad.addressLine1, ad.addressLine2, ci.name as city, ci.postalCode, co.name as country
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
  SELECT ai.idAirport, ai.name, ai.idAddress, ad.addressLine1, ad.addressLine2, ci.name as city, ci.postalCode, co.name as country
  FROM airport as ai
  INNER JOIN address as ad
  ON ai.idAddress = ad.idAddress
  INNER JOIN city as ci
  ON ad.idCity = ci.idCity
  INNER JOIN country as co
  ON ci.idCountry = co.idCountry;
END 
$$

CREATE PROCEDURE spUpdateAirport(idAirport char(3), name varchar(100), idAddress int, addressLine1 varchar(100), addressLine2 varchar(100), city varchar(60))
BEGIN
  UPDATE airport as a
  SET a.name = name
  WHERE a.idAirport = idAirport;
  
  CALL spUpdateAddress(idAddress, addressLine1, addressLine2, city);
END 
$$

CREATE PROCEDURE spDeleteAirport(idAirport char(3))
BEGIN
  DECLARE idAddress int;
  
  SELECT a.idAddress INTO idAddress
  FROM airport as a
  WHERE a.idAirport = idAirport;
  
  CALL spDeleteAddress(idAddress);
  
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
CREATE PROCEDURE spAddUser(isAdmin boolean, email varchar(256), passwordHash char(97), firstName varchar(100), lastName varchar(100))
BEGIN
  INSERT INTO user (isAdmin, email, passwordHash, firstName, lastName) VALUES (isAdmin, email, passwordHash, firstName, lastName);
END
$$

CREATE PROCEDURE spGetUserById(idUser char(36))
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.firstName, u.lastName
  FROM user as u
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spGetUserByBooking(idBooking int)
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.firstName, u.lastName
  FROM user as u
  INNER JOIN booking as b
  ON u.idUser = b.idUser
  WHERE b.idBooking = idBooking;
END 
$$

CREATE PROCEDURE spGetAllUsers()
BEGIN
  SELECT idUser, isAdmin, email, firstName, lastName
  FROM user;
END 
$$

CREATE PROCEDURE spUpdateUser(idUser char(36), isAdmin boolean, email varchar(256), firstName varchar(100), lastName varchar(100))
BEGIN
  UPDATE user as u
  SET u.isAdmin = isAdmin, u.email = email, u.firstName = firstName, u.lastName = lastName
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spGetPasswordHashById(idUser char(36))
BEGIN
  SELECT u.passwordHash
  FROM user as u
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spUpdateUserPassword(idUser char(36), newPasswordHash char(97))
BEGIN
  UPDATE user as u
  SET u.passwordHash = newPasswordHash
  WHERE u.idUser = idUser;
END 
$$

CREATE PROCEDURE spDeleteUser(idUser char(36))
BEGIN
  DELETE FROM user as u
  WHERE u.idUser = idUser;
END
$$

CREATE PROCEDURE spUserLogin(email varchar(256))
BEGIN
  SELECT u.idUser, u.isAdmin, u.email, u.passwordHash
  FROM user as u
  WHERE u.email = email;
END
$$

CREATE PROCEDURE spGetIdUserByInvoice(idInvoice int)
BEGIN
  SELECT idUser
  FROM booking as b
  INNER JOIN invoice as i
  ON b.idInvoice = i.idInvoice
  WHERE i.idInvoice = idInvoice;
END 
$$

CREATE PROCEDURE spGetIdUserByBooking(idBooking int)
BEGIN
  SELECT idUser
  FROM booking as b
  WHERE b.idBooking = idBooking;
END 
$$

CREATE PROCEDURE spGetIdUserByTicket(idTicket int)
BEGIN
  SELECT idUser
  FROM booking as b
  INNER JOIN ticket as t
  ON b.idBooking = t.idBooking
  WHERE t.idTicket = idTicket;
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

CREATE PROCEDURE spUpdateAirplane(idAirplane tinyint unsigned, model varchar(50), capacity smallint)
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


/* FLIGHT */
CREATE PROCEDURE spAddFlight(idAirportOrigin char(3), idAirportDestination char(3), departureTime datetime, distance smallint unsigned, duration smallint unsigned,
								price float, airline varchar(50), idAirplane tinyint unsigned)
BEGIN
  INSERT INTO flight (idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane) 
  VALUES (idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane);
END 
$$

CREATE PROCEDURE spGetAvailableSeats(idFlight int)
BEGIN
  DECLARE numTickets int default 0;

  SELECT COUNT(*) INTO numTickets
  FROM ticket as t
  WHERE t.idFlight = idFlight;

  SELECT a.capacity - numTickets AS availableSeats
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE f.idFlight = idFlight;
END 
$$

CREATE PROCEDURE spGetFlightById(idFlight int)
BEGIN
  SELECT f.idFlight, f.idAirportOrigin, f.idAirportDestination, f.departureTime, f.distance, f.duration, f.price, f.airline, a.model, a.capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE f.idFlight = idFlight;
END 
$$

CREATE PROCEDURE spGetAllFlightsByOrigin(origin char(3), departure dateTime)
BEGIN
  SELECT f.idFlight, f.idAirportOrigin, f.idAirportDestination, f.departureTime, f.distance, f.duration, f.price, f.airline, a.model, a.capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE (f.idAirportOrigin = origin) 
	AND (DATE(f.departureTime) BETWEEN DATE_SUB(DATE(departure), INTERVAL 1 DAY) AND DATE_ADD(DATE(departure), INTERVAL 1 DAY))
  ORDER BY departureTime, price;
END 
$$

CREATE PROCEDURE spGetAllFlightsByDestination(destination char(3), departure dateTime)
BEGIN
  SELECT f.idFlight, f.idAirportOrigin, f.idAirportDestination, f.departureTime, f.distance, f.duration, f.price, f.airline, a.model, a.capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE (f.idAirportDestination = destination) 
	AND (DATE(f.departureTime) BETWEEN DATE_SUB(DATE(departure), INTERVAL 1 DAY) AND DATE_ADD(DATE(departure), INTERVAL 1 DAY))
  ORDER BY departureTime, price;
END 
$$

CREATE PROCEDURE spGetAllDirectFlights(origin char(3), destination char(3), departure dateTime)
BEGIN
  SELECT f.idFlight, f.idAirportOrigin, f.idAirportDestination, f.departureTime, f.distance, f.duration, f.price, f.airline, a.model, a.capacity
  FROM flight as f
  INNER JOIN airplane as a
  ON f.idAirplane = a.idAirplane
  WHERE (f.idAirportOrigin = origin AND f.idAirportDestination = destination)
	AND (DATE(f.departureTime) BETWEEN DATE_SUB(DATE(departure), INTERVAL 1 DAY) AND DATE_ADD(DATE(departure), INTERVAL 1 DAY))
  ORDER BY departureTime, price;
END 
$$

CREATE PROCEDURE spGetAllConnectingFlights(origin char(3), destination char(3), departure dateTime)
BEGIN
  SELECT f1.idFlight as idFlight1, f1.idAirportOrigin as idAirportOrigin1, f1.idAirportDestination as idAirportDestination1, f1.departureTime as departureTime1,
			f1.distance as distance1, f1.duration as duration1, f1.price as price1, f1.airline as airline1, a1.model as model1, a1.capacity as capacity1, 
		f2.idFlight as idFlight2, f2.idAirportOrigin as idAirportOrigin2, f2.idAirportDestination as idAirportDestination2, f2.departureTime as departureTime2, 
			f2.distance as distance2, f2.duration as duration2, f2.price as price2, f2.airline as airline2, a2.model as model2, a2.capacity as capacity2
  FROM flight as f1
  INNER JOIN airplane as a1
  ON f1.idAirplane = a1.idAirplane
  JOIN flight as f2
  INNER JOIN airplane as a2
  ON f2.idAirplane = a2.idAirplane 
  ON f1.idAirportDestination = f2.idAirportOrigin
  WHERE f1.idAirportOrigin = origin AND f2.idAirportDestination = destination
	AND (DATE(f1.departureTime) BETWEEN DATE_SUB(DATE(departure), INTERVAL 1 DAY) AND DATE_ADD(DATE(departure), INTERVAL 1 DAY))
  ORDER BY f1.departureTime;
END 
$$

CREATE PROCEDURE spGetAllFlights()
BEGIN
  SELECT f.idFlight, f.idAirportOrigin, f.idAirportDestination, f.departureTime, f.distance, f.duration, f.price, f.airline, a.model, a.capacity
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


/* INVOICE */
CREATE PROCEDURE spAddInvoice(IN total float, IN paymentMethod varchar(50), OUT idInvoice int)
BEGIN
  INSERT INTO invoice (total, paymentMethod) VALUES (total, paymentMethod);
  SET idInvoice = LAST_INSERT_ID();
END 
$$

CREATE PROCEDURE spGetInvoiceById(idInvoice int)
BEGIN
  SELECT *
  FROM invoice as i
  WHERE i.idInvoice = idInvoice;
END 
$$

CREATE PROCEDURE spGetInvoiceByBooking(idBooking int)
BEGIN
  SELECT i.idInvoice, i.issuedDate, i.total, i.paymentMethod
  FROM invoice as i
  INNER JOIN booking as b
  ON i.idInvoice = b.idInvoice
  WHERE b.idBooking = idBooking;
END 
$$

CREATE PROCEDURE spGetAllInvoices()
BEGIN
  SELECT *
  FROM invoice;
END 
$$

CREATE PROCEDURE spGetAllInvoicesByUser(idUser char(36))
BEGIN
  SELECT i.idInvoice, i.issuedDate, i.total, i.paymentMethod
  FROM invoice as i
  INNER JOIN booking as b
  ON i.idInvoice = b.idInvoice
  WHERE b.idUser = idUser;
END 
$$
/*--------------------------------------------------------------------------------------------------------------*/


/* BOOKING */
CREATE PROCEDURE spAddBooking(IN idUser varchar(36), IN idInvoice int, OUT idBooking int)
BEGIN
  INSERT INTO booking (idUser, idInvoice) VALUES (idUser, idInvoice);
  SET idBooking = LAST_INSERT_ID();
END 
$$

CREATE PROCEDURE spGetBookingById(idBooking int)
BEGIN
  SELECT b.idBooking, b.idUser, b.idInvoice
  FROM booking as b
  WHERE b.idBooking = idBooking;
END 
$$

CREATE PROCEDURE spGetAllBookingsByUser(idUser char(36))
BEGIN
  SELECT b.idBooking, b.idUser, b.idInvoice
  FROM booking as b
  WHERE b.idUser = idUser;
END 
$$
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

CREATE PROCEDURE spGetAllTicketsByUser(idUser char(36))
BEGIN
  SELECT t.idTicket, t.idFlight, t.email, t.firstName, t.lastName, t.idBooking
  FROM ticket as t
  INNER JOIN booking as b
  ON t.idBooking = b.idBooking
  WHERE b.idUser = idUser;
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


/* DATA INSERTS */

INSERT INTO `country` (`idCountry`, `name`) VALUES
(1, 'Argentina'),
(2, 'Australia'),
(3, 'Belarus'),
(4, 'Brazil'),
(5, 'Canada'),
(6, 'China'),
(7, 'Colombia'),
(8, 'England'),
(9, 'France'),
(10, 'Germany'),
(11, 'Italy'),
(12, 'Japan'),
(13, 'Korea'),
(14, 'Mexico'),
(15, 'Poland'),
(16, 'Portugal'),
(21, 'Russia'),
(17, 'Saudi Arabia'),
(18, 'Spain'),
(19, 'Ukraine'),
(20, 'United States');

INSERT INTO `city` (`idCity`, `name`, `postalCode`, `idCountry`) VALUES
(1, 'Buenos Aires', '1802', 1),
(2, 'London', 'N17 9EZ', 8),
(3, 'Tokyo', '100-0005', 12),
(4, 'Madrid', '28292', 18),
(5, 'Berlin', '10117', 10),
(6, 'Los Angeles', '90002', 20),
(7, 'Minsk', '220004', 3),
(8, 'Mar Del Plata', '7600', 1);

INSERT INTO `address` (`idAddress`, `addressLine1`, `addressLine2`, `idCity`) VALUES
(1, 'Autopista Teniente General Ricchieri', 'KM. 33,5', 1),
(2, 'Nelson Road, Hounslow Middlesex, TW6 2GW', 'The Compass Centre', 2),
(3, '1 World Way', '', 6),
(4, '1-1 Furugome, Narita', 'Chiba 282-0004', 3),
(5, 'Melli-Beese-Ring 1', '12529 Schönefeld', 5),
(6, 'Av. de la Hispanidad', 's/n, 28042', 4),
(7, 'M2 Minsk 220054', '', 7),
(8, 'Autovia 2', 'Km 398.5', 8);

INSERT INTO `airport` (`idAirport`, `name`, `idAddress`) VALUES
('BER', 'Berlin Brandenburg Airport', 5),
('BUE', 'Aeropuerto Internacional Ezeiza', 1),
('LAX', 'Los Angeles International Airport', 3),
('LHR', 'London-Heathrow Airport', 2),
('MAD', 'Aeropuerto Adolfo Suárez Madrid-Barajas', 6),
('MDQ', 'Aeropuerto Internacional Astor Piazzolla', 8),
('MSQ', 'Minsk National Airport', 7),
('NRT', 'Narita International Airport', 4);

INSERT INTO `employee` (`idEmployee`, `firstName`, `lastName`, `position`, `idAirport`) VALUES
('ef9e0a59-e7a7-11ed-8236-0242ac180004', 'Christian', 'Zarate', 'Air Traffic Controller', 'LHR'),
('ef9e8c75-e7a7-11ed-8236-0242ac180004', 'Ricardo', 'Bardotelli', 'Avionics Technician', 'BUE'),
('ef9efc4e-e7a7-11ed-8236-0242ac180004', 'Hernan', 'Mekuncio', 'Flight Attendant', 'LHR'),
('ef9f6c9b-e7a7-11ed-8236-0242ac180004', 'Lukas', 'Trevi', 'Reservation Agent', 'LAX'),
('ef9ff205-e7a7-11ed-8236-0242ac180004', 'Luc', 'Kennedy', 'Reservation Agent', 'NRT');

INSERT INTO `airplane` (`idAirplane`, `model`, `capacity`) VALUES
(1, 'Airbus A310', 200),
(2, 'Airbus A340', 375),
(3, 'Airbus A330', 335),
(4, 'Airbus A380', 550);

INSERT INTO `flight` (`idFlight`, `idAirportOrigin`, `idAirportDestination`, `departureTime`, `distance`, `duration`, `price`, `airline`, `idAirplane`) VALUES
(1, 'BUE', 'NRT', '2023-12-26 19:30:00', 18362, 1830, 1190, 'Aerolineas Argentinas', 2),
(2, 'BUE', 'MAD', '2023-11-20 06:30:00', 10039, 753, 790, 'Iberia', 1),
(3, 'MAD', 'MSQ', '2023-11-20 23:00:00', 3403, 323, 510, 'Iberia', 3),
(4, 'NRT', 'BUE', '2023-12-29 09:10:00', 18362, 1830, 1310, 'Japan Airlines', 4),
(5, 'LHR', 'LAX', '2023-09-03 11:45:00', 8756, 628, 398, 'British Airways', 2),
(6, 'LHR', 'BER', '2023-09-03 21:20:00', 932, 100, 137, 'Lufthansa', 3),
(7, 'BER', 'MAD', '2023-10-17 01:30:00', 1869, 180, 185, 'Lufthansa', 1),
(8, 'MAD', 'BUE', '2023-10-17 06:30:00', 10045, 770, 870, 'Lufthansa', 1),
(9, 'BUE', 'MDQ', '2023-10-17 22:45:00', 450, 65, 92, 'Aerolineas Argentinas', 2);

INSERT INTO `user` (`idUser`, `isAdmin`, `email`, `passwordHash`, `firstName`, `lastName`) VALUES
('efa7f593-e7a7-11ed-8236-0242ac180004', 1, 'belen@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$6QkXuDwGweN8F3ygqdj+xQ$QjtZUl+P+837vwYxNsivtH9wuXheGg36uDQGu5So1tY', 'Belen', 'Robledo'),
('efaf013b-e7a7-11ed-8236-0242ac180004', 1, 'george@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$V0N+2LvV/2QoqNcJfEyO7g$ZeRNeIXJ62wNHQGUljmy+Oty5qnZI1B5dyzb7p2fwfo', 'George', 'De Maine'),
('efb5bc01-e7a7-11ed-8236-0242ac180004', 0, 'tim@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$R2UR3HtKKdxT2PuiZBFVPA$DXIEqAkdSlfORnxq5HJhRHe+KPrzmnjuWbunrvUoluE', 'Tim', 'Paoletto'),
('efbca663-e7a7-11ed-8236-0242ac180004', 0, 'katherine@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$reFBc8VWORl6KiBm9GKGUg$c3QAP2CmCYDGlLKund9O8IIAW7isdScP9Z1hMcxuxdg', 'Katherine', 'Diche'),
('efc38e21-e7a7-11ed-8236-0242ac180004', 0, 'john@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$9M3Wj72m4uPBa3y3VZV9uw$vSRvg33rAt50Y/ev7bRyUv9pRygQX4zjKRSlIZdLcZM', 'John', 'Heasley');

/*--------------------------------------------------------------------------------------------------------------*/