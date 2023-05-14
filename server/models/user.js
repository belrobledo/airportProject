class User {

    constructor(idUser = null, isAdmin = false, email, firstName, lastName){
        this.idUser = idUser;
        this.isAdmin = isAdmin;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

module.exports = User;