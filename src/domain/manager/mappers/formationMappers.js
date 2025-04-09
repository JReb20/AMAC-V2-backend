import Formation from '../models/Formation';

export const mapFormation = (formationEntity) => {
    return new Formation(
        formationEntity.idformation,
        formationEntity.idfunction,
        formationEntity.name,
        formationEntity.deletedDate,
        formationEntity.description,
        formationEntity.required,
        formationEntity.price,
        formationEntity.url,
        formationEntity.icon_url
    );
};

export const mapFormations = (formationEntityList) => {
    return formationEntityList.map(mapFormation);
};
