const mongoose = require('mongoose');

class Database {
    constructor(client) {
        this.client = client;
    }

    async connect() {
        await mongoose.connect(this.client.config.db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        const db = mongoose.connection;

        db.on('error', () => console.error.bind(console, 'Connection error'));
        db.on('open', () => client.logger.log("Database initialized"));

        this.client.logger.log("Database initialized.");
    }
}

module.exports = Database;