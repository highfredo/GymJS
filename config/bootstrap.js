/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

   // var challenge = new Challenges({
   //    "name"        : "Challenge.01",
   //    "title"       : "Suma",
   //    "description" : "Implementa la suma",
   //    "tags"        : ["Aritmethic", "Numbers"],
   //    "dates"       : {
   //       "start" : new Date("27/06/2016T00:15:00"),
   //       "end"   : new Date("03/07/2016T00:00:00")
   //    },
   //    "statement" : {
   //       "parameters" : [{
   //          "type"        : "Number",
   //          "description" : "Primer sumando"
   //       }],
   //       "return" : {
   //          "type"        : "Number",
   //          "description" : "Segundo Sumando"
   //       }
   //    },
   //    "test" : {
   //       "checker" : "function (x, y, r) { return x+y===r; }",
   //       "test"    : [{
   //          "parameters" : [2, 2],
   //          "result"     : 4
   //       }],
   //       "benchmark" : [{
   //          "parameters" : [3, 2],
   //          "result"     : 5
   //       }]
   //    }
   // })
   //
   // challenge.save().then(function () {
   //    cb();
   // }).catch(function (err) {
   //    console.log(err)
   // });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
