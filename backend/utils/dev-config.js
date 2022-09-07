const { PORT = 3001, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

module.exports = { PORT, MONGO_URL };
