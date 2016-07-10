module.exports = {
   create,
   auth
}

function create(req, res) {
   var user = new Users(req.body)

   user.save().then(function () {
      res.status(201).send(user.toJSON())
   }).catch(function (err) {
      res.status(500).send(err);
   })
}


function auth(req, res) {
   AuthTokens.generateToken(req.body.login, req.body.pass).then(function (token) {
      res.status(201).send({token: token});
   }).catch(function () {
      res.status(401).send();
   })
}
