class AuthJson {
    constructor(email, password, refreshTokenCode, updateDate, isActive) {
        this.email = email;
        this.password = password;
        this.refreshTokenCode = refreshTokenCode;
        this.updateDate = updateDate;
        this.isActive = isActive;
    }
}

export default AuthJson;