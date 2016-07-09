
var Mailer = require('./index')


var mailer = new Mailer("Alfredo Arellano", "highfredo@gmail.com", require("./config.json").pass, "smtp.gmail.com")

mailer.send("email de prueba", "<b>hola mundo</b>", "highfredo@outlook.com").then(function (info) {
    console.log(info)
}).catch(function (err) {
    console.log(err)
})