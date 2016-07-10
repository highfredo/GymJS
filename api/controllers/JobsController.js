module.exports = {
   create,
   get,
   byChallenge
}

function create(req, res) {
   req.body.user = req.user
   delete req.body.result

   var job = new Jobs(req.body)
   job.save().then(function () {
      job.user = undefined
      res.send(job)
   }).catch(function (err) {
      res.serverError(err)
   })
}


function get(req, res) {
   Jobs.findOne({_id: req.param('id'), user: req.user}).then(function (job) {
      res.json(job)
   }).catch(function (err) {
      res.serverError(err)
   })
}


function byChallenge(req, res) {
   Jobs.find({challenge: req.param('id'), user: req.user}).then(function (jobs) {
      res.json(jobs)
   }).catch(function (err) {
      res.serverError(err)
   })
}
