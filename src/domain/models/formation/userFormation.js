class UserFormation {
    constructor(idUser, idFormation, progression) {
        this.idUser = idUser;
        this.idFormation = idFormation;
        this.progression = progression;
    }

    setIdUser(idUser) {
        this.idUser = idUser;
    }

    getIdUser() {
        return this.idUser;
    }

    getIdFormation() {
        return this.idFormation;
    }

    setIdFormation(idFormation) {
        this.idFormation = idFormation;
    }

    getProgression() {
        return this.progression;
    }

    setProgression(progression) {
        this.progression = progression;
    }
}

export default UserFormation;