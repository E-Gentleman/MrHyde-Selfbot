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
        console.log(`${prefix} ${this.secure(message)}`);
    }

    static secure(message) {
        if(message.indexOf('token') > -1)
            return `${message.split(':')[0]}: (hidden)`;

        return message;
    }
}

module.exports = Logger;