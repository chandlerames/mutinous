const db = require('./db');

const healthCheck = () => {
    return db.execute('SELECT S.pid FROM pg_stat_activity S')
        .then(results => {
            return results.length ? 'Communication with the database successful' : 'Unsuccessful Communication with the database';
        })
        .catch(er => {
            return 'Unsuccessful Communication with the database';
        });
}

const getPeople = (params) => {
    let query = 'SELECT id, firstName, lastName, email FROM person';
    if (params && params.firstName) {
        query += ' WHERE firstName = \'' + params.firstName + '\'';
    }

    return db.execute(query);
}

module.exports = {
    healthCheck: healthCheck,
    getPeople: getPeople
};