const colors = require('colors');
const prefix = `[Mr.Hyde]`.red.bold;

class Logger {
    static debug(message) {
        this.log(message);
    }
    static info(message) {
        this.log(message.yellow);
    }
    static success(message) {
        this.log(message.green);
    }
    static error(message) {
        this.log(message.red);
    }

    static log(message) {
        console.log(`${prefix} ${message}`);
    }
}

module.exports = Logger;