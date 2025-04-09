import formationRepository from './repositories/formationRepository';

class FormationService {
    async fetchFormationsByFunction(IdFunction) {
        return await formationRepository.fetchFormationsByFunction(IdFunction);
    }
}

const formationService = new FormationService();

export default formationService;