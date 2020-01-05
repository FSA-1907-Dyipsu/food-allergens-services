const connection = require('./connection');
const seeder = require('./seeds/seeder');
const seedWriter = require('./seeds/seedWriter')
const models = require('./models')

const sync = async (force = true) => {
    await connection.sync({ force });

    if (force) {
        seeder();
    }
};

module.exports = {
    sync,
    models
}
