const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { EMAIL_ADDRESS, EMAIL_PASS, EMAIL_SERVICE } = require('../../configs/config');
const templatesInfo = require('../../email-templates');

const transporter = mailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        pass: EMAIL_PASS,
        user: EMAIL_ADDRESS
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const sendMail = async (userEmail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new Error('Wrong template name');
        }

        const html = await emailTemplates.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'No reply',
            to: userEmail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
