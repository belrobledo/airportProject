const connection = require('../databases/connection');
const User = require('../models/user');
const argon2 = require('argon2');


function addUser(isAdmin, email, passwordHash, firstName, lastName) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddUser(?, ?, ?, ?, ?);', [isAdmin, email, passwordHash, firstName, lastName], (error, results) => {
      if (error) {
        reject(error);
      }

      console.log(results);

      resolve(results);
      });
  });
}

function getUserById(idUser) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetUserById(?);', idUser, (error, results) => {
      if (error) {
        reject(error);
      }

      let user;
      if(results[0] && results[0].length){
        user = new User(results[0][0].idUser, results[0][0].isAdmin, results[0][0].email, results[0][0].firstName, results[0][0].lastName);
      }
      resolve(user);
    });
  });
}

function getUserByBooking(idBooking) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetUserByBooking(?);', idBooking, (error, results) => {
      if (error) {
        reject(error);
      }

      let user;
      if(results[0] && results[0].length){
        user = new User(results[0][0].idUser, results[0][0].isAdmin, results[0][0].email, results[0][0].firstName, results[0][0].lastName);
      }
      resolve(user);
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllUsers();', (error, results) => {
      if (error) {
        reject(error);
      }

      let users = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let user = new User(result.idUser, result.isAdmin, result.email, result.firstName, result.lastName);
          users.push(user);
        });
      }
      resolve(users);
    });
  });
}

function updateUser(idUser, isAdmin, email, firstName, lastName) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateUser(?, ?, ?, ?, ?);', [idUser, isAdmin, email, firstName, lastName], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}

function getPasswordHashById(idUser) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetPasswordHashById(?);', idUser, (error, results) => {
      if (error) {
        reject(error);
      }

      let passwordHash = null;
      if(results[0] && results[0].length){
        passwordHash = results[0][0].passwordHash;
      }
      resolve(passwordHash);
    });
  });
}

function updateUserPassword(idUser, newPasswordHash) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spUpdateUserPassword(?, ?);', [idUser, newPasswordHash], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}
  
function deleteUser(idUser) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteUser(?);', idUser, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}

function userLogin(email) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spUserLogin(?);', email, (error, results) => {
      if (error) {
        reject(error);
      }

      let user;
      if(results[0] && results[0].length){
        user = {idUser: results[0][0].idUser, isAdmin: results[0][0].isAdmin, email: results[0][0].email, passwordHash: results[0][0].passwordHash};
      }
      resolve(user);
    });
  });
}

function getIdUserbyInvoice(idInvoice) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetIdUserByInvoice(?);', idInvoice, (error, results) => {
      if (error) {
        reject(error);
      }

      let idUser = null;
      if(results[0] && results[0].length){
        idUser = results[0][0].idUser;
      }
      resolve(idUser);
    });
  });
}

function getIdUserbyBooking(idBooking) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetIdUserByBooking(?);', idBooking, (error, results) => {
      if (error) {
        reject(error);
      }

      let idUser = null;
      if(results[0] && results[0].length){
        idUser = results[0][0].idUser;
      }
      resolve(idUser);
    });
  });
}

function getIdUserByTicket(idTicket) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetIdUserByTicket(?);', idTicket, (error, results) => {
      if (error) {
        reject(error);
      }

      let idUser = null;
      if(results[0] && results[0].length){
        idUser = results[0][0].idUser;
      }
      resolve(idUser);
    });
  });
}

//only execute once when creating db
async function loadUsers() {
  const users = [{
    "isAdmin": 1,
    "email": "belen@gmail.com",
    "password": "123",
    "firstName": "Belen",
    "lastName": "Robledo"
    }, {
    "isAdmin": 1,
    "email": "george@gmail.com",
    "password": "BBHRulko",
    "firstName": "George",
    "lastName": "De Maine"
    }, {
    "isAdmin": 0,
    "email": "tim@gmail.com",
    "password": "2ApRjme",
    "firstName": "Tim",
    "lastName": "Paoletto"
    }, {
    "isAdmin": 0,
    "email": "katherine@gmail.com",
    "password": "ICIrSR0HYh",
    "firstName": "Katherine",
    "lastName": "Diche"
    }, {
    "isAdmin": 0,
    "email": "john@gmail.com",
    "password": "ldyGIYx",
    "firstName": "John",
    "lastName": "Heasley"
  }];

  try {
    for (const user of users) {
      user.password = await argon2.hash(user.password);

      await new Promise((resolve, reject) => {
        connection.query('CALL spAddUser(?, ?, ?, ?, ?);', [user.isAdmin, user.email, user.password, user.firstName, user.lastName], (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            reject(error);
          } else {
            console.log('Insert result', results);
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error('Error populating table:', error);
  }
}


module.exports = { 
  addUser, 
  getUserById, 
  getUserByBooking, 
  getAllUsers, 
  updateUser, 
  getPasswordHashById, 
  updateUserPassword, 
  deleteUser, 
  userLogin, 
  getIdUserbyInvoice, 
  getIdUserbyBooking, 
  getIdUserByTicket, 
  loadUsers };