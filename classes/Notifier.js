const notifier = require('node-notifier');
const open = require('open');
const path = require('path');

class Notifier {
    static notify(title, message) {
        this.notify(title, message, null);
    }
    static notify(title, message, url) {
        notifier.notify({
            title,
            message,
            sound: false,
            icon: path.join(__dirname, '/../img/spy.png'),
            wait: true
        }, (error, response) => {
            if(response === "activate" && url)
                open(url);
        });
    }
}

module.exports = Notifier;