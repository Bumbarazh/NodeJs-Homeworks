const emailAction = require('../constants/email-actions.enum');

module.exports = {
    [emailAction.WELCOME]: {
        subject: 'Hi, we are glad to see you on our site',
        templateName: 'welcome'
    },
    [emailAction.GOODBYE]: {
        subject: 'We will be miss you',
        templateName: 'goodbye'
    }
};
