import prisma from '../db';
import { JobFunction } from '../models/JobFunction';

class JobFunctionDao {
    async findAll() {
        const jobFunctions = await prisma.jobFunction.findMany();
        return jobFunctions.map(jobFunction => new JobFunction(jobFunction.id, jobFunction.name));
    }

    async findById(id) {
        const jobFunction = await prisma.jobFunction.findUnique({
            where: { id }
        });
        return jobFunction ? new JobFunction(jobFunction.id, jobFunction.name) : null;
    }

    async create(jobFunction) {
        const createdJobFunction = await prisma.jobFunction.create({
            data: jobFunction
        });
        return new JobFunction(createdJobFunction.id, createdJobFunction.name);
    }

    async update(jobFunction) {
        const updatedJobFunction = await prisma.jobFunction.update({
            where: { id: jobFunction.id },
            data: jobFunction
        });
        return new JobFunction(updatedJobFunction.id, updatedJobFunction.name);
    }

    async delete(id) {
        await prisma.jobFunction.delete({
            where: { id }
        });
    }
}

export default new JobFunctionDao();