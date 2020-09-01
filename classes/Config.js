const fs = require('fs');

class Config {
    constructor() {
        Object.assign(this, require('../config.json'));
    }

    //Set in-memory config value
    set(key, value) {
        let temp = this,
            keys = key.split('.');

        for(let i = 0; i < keys.length; i++) {
            if(i === keys.length - 1) {
                temp[keys[i]] = value;
            } else {
                if(!temp[keys[i]])
                    temp[keys[i]] = {};

                temp = temp[keys[i]];
            }
        }

        return this;
    }

    //Async save in-memory config to file
    save() {
        fs.writeFile('./config.json', JSON.stringify(this, null, 4), (err) => {
            if(err)
                console.error(err);
        });
    }
}

module.exports = Config;