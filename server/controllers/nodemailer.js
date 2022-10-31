var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'jobboard.tek@outlook.com',
        pass: 'SuperProjet&1997'}
});

module.exports = transporter;