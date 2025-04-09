class PersonContact {
    constructor(id, idPerson, idContact) {
        this.id = id;
        this.idPerson = idPerson;
        this.idContact = idContact;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getIdPerson() {
        return this.idPerson;
    }

    setIdPerson(idPerson) {
        this.idPerson = idPerson;
    }

    getIdContact() {
        return this.idContact;
    }

    setIdContact(idContact) {
        this.idContact = idContact;
    }
}

export default PersonContact;