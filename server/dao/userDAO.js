const connection = require('../databases/connection');

connection.query('SHOW DATABASES', (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('List of databases:', results);
});


const users = [{
    "id": "20d7c49c-0e3c-4784-8fee-dcd2973746e2",
    "role": "admin",
    "email": "belen@gmail.com",
    "password": "123"
    }, {
    "id": "24bce4e6-0439-4354-a780-4fe984a7f074",
    "role": "admin",
    "email": "george@gmail.com",
    "password": "BBHRulko"
    }, {
    "id": "56cf59ad-9919-4050-bcb0-660484391906",
    "role": "user",
    "email": "timi@gmail.com",
    "password": "2ApRjme"
    }, {
    "id": "2716dba2-2336-4e43-80bb-3ff9ab0e60ef",
    "role": "user",
    "email": "katherine@gmail.com",
    "password": "ICIrSR0HYh"
    }, {
    "id": "1006d411-985e-4c47-a260-6d03e0565d13",
    "role": "user",
    "email": "john@gmail.com",
    "password": "ldyGIYx"
}]

async function getUserByEmail(email) {
    const user = users.find(user => user.email === email);
    return user ? Promise.resolve(user) : Promise.reject('User not found.');
}

module.exports = {getUserByEmail};