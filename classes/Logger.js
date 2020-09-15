const fs = require('fs');
const colors = require('colors');
const prefix = '[Mr.Hyde]';

class Logger {
    constructor(verbose) {
        this.verbose = verbose;
        this.hasLogfileAccess = false;
    }


    debug(message) {
        if(this.verbose)
            return this.log(message, 'white');

        this._store(message);
    }
    info(message) {
        this.log(message, 'yellow');
    }
    success(message) {
        this.log(message, 'green');
    }
    error(message) {
        this.log(message, 'red');
    }

    log(message, color) {
        const output = `${prefix} ${message}`;
        console.log(`${prefix.red.bold} ${color ? colors[color](message) : message}`);
        this._store(output);
    }


    initializeLogFile() {
        try {
            fs.writeFileSync('logs.log', 'Logfile start ---');
            this.hasLogfileAccess = true;
        } catch (e) {
            this.error("Cannot write to logfile, logs will only be hold by console.");
        }
    }

    _store(message) {
        if(!this.hasLogfileAccess)
            return;

        fs.appendFileSync('logs.log', `\n${message}`);
    }
}

module.exports = Logger;