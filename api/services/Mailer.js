var nodemailer = require('nodemailer');

/*
Usage:
 var mailer = new Mailer("Pepito Perez", "pepe@gmail.com", "mein_pass, "smtp.gmail.com")

 mailer.send("email de prueba", "<b>hola mundo</b>", "juan@outlook.com").then(function (info) {
 console.log(info)
 }).catch(function (err) {
 console.log(err)
 })
 */
class Mailer {
    constructor(fromName, fromMail, password, smtp) {
        console.log(fromName, fromMail, smtp)
        this.fromName = fromName
        this.fromMail = fromMail
        this.smtp = smtp
        var mailFormatted = fromMail.replace('@', '%40')
        this.transporter = nodemailer.createTransport(`smtps://${mailFormatted}:${password}@${smtp}`)
    }

    send(subject, body, toMails) {

        if(toMails) {
            toMails = Array.isArray(toMails) ? toMails : [toMails];
        } else {
            // TODO: get mails list
        }


        var mailOptions = {
            from: `"${this.fromName}" <${this.fromMail}>`,  // sender address
            to: toMails.join(', '),                         // list of receivers
            subject: subject,                               // Subject line
            html: body                                      // html body
        }
        
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                error ? reject(error) : resolve(info);
            });
        })
    }
}

module.exports = Mailer
