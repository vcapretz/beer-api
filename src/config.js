const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/beer-api';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/beer-api';

module.exports.databaseConfig = (process.env.NODE_ENV === 'production') ? dBproduction : dBdevelopment;