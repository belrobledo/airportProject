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
    terminals varchar(50),
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
    idFlight int not null,
    idUser varchar(36) not null,
    email varchar(256) not null,
	firstName varchar(100) not null,
    lastName varchar(100) not null,
    idInvoice int not null,
    CONSTRAINT fk_idFlightB foreign key (idFlight) references flight (idFlight),
    CONSTRAINT fk_idUserB foreign key (idUser) references user (idUser),
    CONSTRAINT fk_idInvoiceB foreign key (idInvoice) references invoice (idInvoice)
);

/*--------------------------------------------------------------------------------------------------------------*/
/*STORED PROCEDURES*/

DELIMITER $$
CREATE PROCEDURE spGetCountryByName(name varchar(60))
BEGIN
  SELECT *
  FROM country as c
  WHERE c.name = name;
END 
$$

DELIMITER $$
CREATE PROCEDURE spAddCountry(countryName varchar(60))
BEGIN
  INSERT INTO country (name) VALUES (name);
END 
$$