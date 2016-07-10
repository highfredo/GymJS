module.exports = {
   attributes: { // Mongoose schema
      challenge : { type: mongoose.Schema.ObjectId, ref: "Challenges"},
      user      : { type: mongoose.Schema.ObjectId, ref: "Users"},
      source    : String,
      result    : { }
   },

   statics: {  // Scheme statics

   },

   methods: {  // Scheme methods

   },

   plugins: {}
}
