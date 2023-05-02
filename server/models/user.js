class User {

    constructor(idUser = "", isAdmin = false, email, password, firstName, lastName, birthDate, phoneNumber, idAddress){
        this.idUser = idUser;
        this.isAdmin = isAdmin;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.idAddress = idAddress;
    }

}