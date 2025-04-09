import { Auth } from '../models/auth';
import { UserJson } from '../models/UserJson';

export const mapAuth = (authJson) => {
    return new Auth(
        authJson.email,
        authJson.password,
        authJson.refreshTokenCode,
        authJson.updateDate,
        authJson.isActive
    );
};

export const mapAuthJson = (auth) => {
    return {
        email: auth.email,
        password: auth.password,
        refreshTokenCode: auth.refreshTokenCode,
        updateDate: auth.updateDate,
        isActive: auth.isActive
    };
};

export const mapAuthRegisterRequest = (authRegisterRequestJson) => {
    return {
        email: authRegisterRequestJson.email,
        dasId: authRegisterRequestJson.dasId,
        matricule: authRegisterRequestJson.matricule,
        firstName: authRegisterRequestJson.firstName,
        lastName: authRegisterRequestJson.lastName
    };
};

export const mapUserJson = (authRegisterRequest) => {
    return new UserJson(
        authRegisterRequest.dasId,
        authRegisterRequest.email,
        authRegisterRequest.firstName,
        authRegisterRequest.lastName,
    );
};

export const mapJsonToAuth = (authJson) => {
    return new Auth(
        authJson.email,
        authJson.password
    );
};