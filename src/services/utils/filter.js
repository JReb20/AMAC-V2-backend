export const filterObject = (obj, fields) => {
    const filtered = {};
    fields.forEach(field => {
        if (obj.hasOwnProperty(field)) {
            filtered[field] = obj[field];
        }
    });
    return filtered;
};