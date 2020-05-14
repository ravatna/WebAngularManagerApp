'user strict';

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Clexpert',
        database: 'webangularmanagerapp'
    },
    pool: { min: 0, max: 1000 },
    asyncStackTraces: true,
    debug: true,
    acquireConnectionTimeout: 10000,
    useNullAsDefault: true
}

const knex = require('knex')(options);

module.exports = knex;