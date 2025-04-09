class UserJson {
    constructor(userId, firstName, lastName, email, phoneNumber, isAdmin, isActive, updateDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.updateDate = updateDate;
    }
}

export default UserJson;