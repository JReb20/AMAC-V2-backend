import formationServiceImpl from '../../../services/formationServiceImpl';
import { mapFormations } from '../../../services/mappers/formationMapper';
import { corsMiddleware } from '../../../../utils/cors';
import { filterObject } from '../../../../utils/filter';

const handler = async (req, res) => {
    const { method } = req;
    const { IdFunction } = req.query;

    if (method === 'GET') {
        if (!IdFunction) {
            return res.status(400).json({ message: 'IdFunction est requis' });
        }

        try {
            const formations = await formationServiceImpl.fetchFormationsByFunction(IdFunction);
            const mappedFormations = mapFormations(formations);
            const filteredFormations = mappedFormations.map(formation =>
                filterObject(formation, ['idformation', 'name', 'description'])
            );
            res.status(200).json(filteredFormations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des formations' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default corsMiddleware(handler);