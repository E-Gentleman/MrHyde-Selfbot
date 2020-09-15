const nodeFetch = require('node-fetch');

class Requester {
    static async discordRequest(uri, method, data, token) {
        return this.request(`https://discordapp.com/api/v6${uri}`, method, data, {
            Authorization: token
        });
    }

    static async request(url, method, data) {
        return this.request(url, method, data, {});
    }

    static async request(url, method, data, headers) {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        if(method !== 'GET') {
            options.body = JSON.stringify(data)
        }

        let res = await nodeFetch(url, options);

        if(res.size > 0)
            return await res.json();

        return {};
    }
}

module.exports = Requester;