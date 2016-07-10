var uuid = require('node-uuid')

module.exports = {
   attributes: { // Mongoose schema
      token :  String,
      user  : { type: mongoose.Schema.ObjectId, ref: "Users"}
   },

   statics: {  // Scheme statics
      getUserByToken: function (token) {
         if(!token) return;
         
         return AuthTokens.findOne({ 'token': token }).populate('user').exec().then(function (data) {
            if(!data) return;
            
            return data.user;
         });
      },
      generateToken: function (login, pass) {

         return Users.findOne({ login: login, pass: pass }).exec().then(function (user) {
            if(!user)
               throw new Error("NO_USER_FOUND")

            var token = uuid.v4();
            return new AuthTokens({
               token: token,
               user: user
            }).save().then(function () {
               return token;
            });
         })
      }
   },

   methods: {  // Scheme methods

   },

   plugins: {}
}
