// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const InstructorSchema = new Schema({
//   name: { type: String, required: true },
//   bio: String,
//   avatar: String
// });
// module.exports = mongoose.model('Instructor', InstructorSchema);




const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InstructorSchema = new Schema({
  name: { type: String, required: true },
  bio: String,
  avatar: String
});
module.exports = mongoose.model('Instructor', InstructorSchema);
