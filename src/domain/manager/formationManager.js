import prisma from '../db';
import { mapFormations } from '../mappers/formationMapper';

class FormationManager {
    async fetchFormationsByFunction(IdFunction) {
        const formationEntities = await prisma.formation.findMany({
            where: {
                OR: [
                    { idfunction: IdFunction },
                    { isRequired: true }
                ]
            }
        });
        return mapFormations(formationEntities);
    }
}

const FormationManager = new FormationManager();

export default FormationManager;