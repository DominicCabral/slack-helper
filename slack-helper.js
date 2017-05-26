`use strict`
const request = require('request');

function Slack(conf) {
    var self = this;
    self.uri = conf.uri;
    self.channel = conf.channel;
    self.method = 'POST';
}

Slack.prototype.sendMessageFailure = function(taskName, err, callback) {
    var self = this;

    var slackOptions = {
        uri: self.uri,
        json: {
            channel: self.channel,
            attachments: [{
                title: 'Error',
                color: 'danger',
                text: taskName + ' has encountered error: ' + err
            }]
        },
        method: self.method
    }
    request(slackOptions, callback);
}

Slack.prototype.sendMessageSuccess = function(taskName, callback) {
    var self = this;

    var slackOptions = {
        uri: self.uri,
        json: {
            channel: self.channel,
            attachments: [{
                title: 'Success',
                color: 'good',
                text: taskName + ' success'
            }]
        },
        method: self.method
    }
    request(slackOptions, callback);
}

exports.createClient = function(conf) {
    return new Slack(conf);
}