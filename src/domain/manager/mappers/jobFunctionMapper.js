import JobFunction from '../models/JobFunction';

export const mapJobFunctionToJson = (jobFunction) => {
    return {
        id: jobFunction.getId(),
        name: jobFunction.getName()
    };
};

export const mapJsonToJobFunction = (jobFunctionJson) => {
    return new JobFunction(
        jobFunctionJson.id,
        jobFunctionJson.name
    );
};

export const mapJobFunctionListToJson = (jobFunctionList) => {
    return jobFunctionList.map(mapJobFunctionToJson);
};