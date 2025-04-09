class AuthRegisterRequestJson {
    constructor(email, dasId, matricule, firstName, lastName) {
        this.email = email;
        this.dasId = dasId;
        this.matricule = matricule;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default AuthRegisterRequestJson;