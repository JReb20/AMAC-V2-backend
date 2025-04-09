class Formation {
    constructor(idformation, idfunction, name, deletedDate, description, isRequired, price, url, icon_url) {
        this.idformation = idformation;
        this.idfunction = idfunction;
        this.name = name;
        this.deletedDate = deletedDate;
        this.description = description;
        this.isRequired = isRequired;
        this.price = price;
        this.url = url;
        this.icon_url = icon_url;
    }

    getIdFormation() {
        return this.idformation;
    }

    setIdFormation(idformation) {
        this.idformation = idformation;
    }

    getIdFunction() {
        return this.idfunction;
    }

    setIdFunction(idfunction) {
        this.idfunction = idfunction;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getDeletedDate() {
        return this.deletedDate;
    }

    setDeletedDate(deletedDate) {
        this.deletedDate = deletedDate;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getRequired() {
        return this.isRequired;
    }

    setRequired(isRequired) {
        this.isRequired = isRequired;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
    }

    getIconUrl() {
        return this.icon_url;
    }

    setIconUrl(icon_url) {
        this.icon_url = icon_url;
    }
}

export default Formation;