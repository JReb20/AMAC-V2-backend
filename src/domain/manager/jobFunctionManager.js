import jobFunctionDao from './dao/jobFunctionDao';
import { mapJobFunctionListToJobFunctionList } from '../mappers/jobFunctionMapper';

class JobFunctionManager {
    async fetchJobFunctions() {
        return await jobFunctionDao.findMany();
    }
    async getAllJobFunction() {
        const jobFunctionEntities = await jobFunctionDao.findAll();
        return mapJobFunctionListToJobFunctionList(jobFunctionEntities);
    }
}

export default new JobFunctionManager();