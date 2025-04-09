import { User } from '../models/User';
import { UserJson } from '../models/UserJson';
import { JobFunction } from '../models/JobFunction';
import { JobFunctionJson } from '../models/JobFunctionJson';

export const mapUserToJson = (user) => {
    return new UserJson(
        user.idUser,
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
        user.pictureUrl,
        user.dasId,
        user.matricule,
        user.isAdmin,
        user.isActive
    );
};

export const mapJsonToUser = (userJson) => {
    return new User(
        userJson.userId,
        userJson.firstName,
        userJson.lastName,
        userJson.email,
        userJson.phoneNumber,
        userJson.pictureUrl,
        userJson.dasId,
        userJson.matricule,
        userJson.isAdmin,
        userJson.isActive
    );
};

export const mapsToJson = (users) => {
    return users.map(mapUserToJson);
};

export const mapJobFunctionToJson = (jobFunction) => {
    return new JobFunctionJson(
        jobFunction.id,
        jobFunction.name
    );
};

export const mapJsonToJobFunction = (jobFunctionJson) => {
    return new JobFunction(
        jobFunctionJson.id,
        jobFunctionJson.name
    );
};

export const mapJobFunctionsToJson = (jobFunctions) => {
    return jobFunctions.map(mapJobFunctionToJson);
};