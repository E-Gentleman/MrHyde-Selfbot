const nodeFetch = require('node-fetch');

class Requester {
    static async request(url, method, data) {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if(method !== 'GET') {
            options.body = JSON.stringify(data)
        }

        let res = await nodeFetch(url, options);

        return await res.json();
    }
}

module.exports = Requester;