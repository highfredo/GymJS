module.exports = {
   get
}


function get(req, res) {
   Challenges.findOne(req.param('id')).then(function (challenge) {
      res.json(challenge)
   }).catch(function (err) {
      res.serverError(err)
   })
}
