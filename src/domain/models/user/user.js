class User {
    constructor(
        idUser,
        idUserTeamLeader,
        isTeamLeader,
        jobFunction,
        deletedDate,
        firstName,
        lastName,
        email,
        hashPassword,
        phoneNumber,
        pictureUrl,
        dasId,
        matricule,
        description,
        isAdmin,
        isActive,
        token,
        tokenDate,
        lastUpdate,
        contacts = new Set()
    ) {
        this.idUser = idUser;
        this.idUserTeamLeader = idUserTeamLeader;
        this.isTeamLeader = isTeamLeader;
        this.jobFunction = jobFunction;
        this.deletedDate = deletedDate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashPassword = hashPassword;
        this.phoneNumber = phoneNumber;
        this.pictureUrl = pictureUrl;
        this.dasId = dasId;
        this.matricule = matricule;
        this.description = description;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.token = token;
        this.tokenDate = tokenDate;
        this.lastUpdate = lastUpdate;
        this.contacts = contacts;
    }

    getIsActive() {
        return this.isActive;
    }

    setIsActive(active) {
        this.isActive = active;
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }

    getTokenDate() {
        return this.tokenDate;
    }

    setTokenDate(tokenDate) {
        this.tokenDate = tokenDate;
    }

    getHashPassword() {
        return this.hashPassword;
    }

    setHashPassword(hashPassword) {
        this.hashPassword = hashPassword;
    }

    getIdUser() {
        return this.idUser;
    }

    setIdUser(id_user) {
        this.idUser = id_user;
    }

    getIdUserTeamLeader() {
        return this.idUserTeamLeader;
    }

    setIdUserTeamLeader(id_user_team_leader) {
        this.idUserTeamLeader = id_user_team_leader;
    }

    getIsTeamLeader() {
        return this.isTeamLeader;
    }

    setIsTeamLeader(is_team_leader) {
        this.isTeamLeader = is_team_leader;
    }

    getJobFunction() {
        return this.jobFunction;
    }

    setJobFunction(job_function) {
        this.jobFunction = job_function;
    }

    getDeletedDate() {
        return this.deletedDate;
    }

    setDeletedDate(deleted_date) {
        this.deletedDate = deleted_date;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(first_name) {
        this.firstName = first_name;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(last_name) {
        this.lastName = last_name;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phone_number) {
        this.phoneNumber = phone_number;
    }

    getPictureUrl() {
        return this.pictureUrl;
    }

    setPictureUrl(picture_url) {
        this.pictureUrl = picture_url;
    }

    getDasId() {
        return this.dasId;
    }

    setDasId(das_id) {
        this.dasId = das_id;
    }

    getMatricule() {
        return this.matricule;
    }

    setMatricule(matricule) {
        this.matricule = matricule;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    setIsAdmin(is_admin) {
        this.isAdmin = is_admin;
    }

    getLastUpdate() {
        return this.lastUpdate;
    }

    setLastUpdate(last_update) {
        this.lastUpdate = last_update;
    }

    getContacts() {
        return this.contacts;
    }

    setContacts(contacts) {
        this.contacts = contacts;
    }

    addContact(contact) {
        this.contacts.add(contact);
    }

    removeContact(contact) {
        this.contacts.delete(contact);
    }
}

export default User;