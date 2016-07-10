module.exports = {
   attributes: { // Mongoose schema
      name: String,
      title: String,
      description: String,
      tags: [String],
      dates: {
         start: Date,
         end: Date
      },
      statement: {
         parameters: [{
            type: {type: String},
            description: String
         }],
         return: {
            type: {type: String},
            description: String
         }
      },
      test: {
         checker: String,
         test: [{
            parameters: [],
            result: {}
         }],
         benchmark: [{
            parameters: [],
            result: {}
         }]
      }
   },

   statics: {  // Scheme statics

   },

   methods: {  // Scheme methods

   },

   plugins: {}
}
