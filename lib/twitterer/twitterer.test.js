
var Twitterer = require('./index')


var twitterer = new Twitterer(
    "H2eQk8znbcCTgsvayKeYaNNCS", "XlFpu0kOKkRxK4jVOYrRKxhysSrjGdVVAXWwOIrLlLgpc0yAIO",
    "access_token", "access_token_secret"
)

twitterer.send("Hola desde el hack mas dificil con id", "288229911").then(function (data) {
    console.log(data)
}).catch(function (err) {
    console.log(err)
})