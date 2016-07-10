module.exports = {
   attributes: { // Mongoose schema
      login: { type: String, unique: true },
      password: String,
      name: String,
      email: { type: String, unique: true },
      twitter: { type: String },
      avatar: String,
      extra: {
         skills: [{
            skill: String,
            level: String
         }],
         tags: [String],
         years: Number
      }
   },

   statics: {  // Scheme statics

   },

   methods: {  // Scheme methods
      toJSON: function () {
         delete this.password
         return this;
      }
   },

   plugins: {}
}
