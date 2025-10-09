// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   name: { type: String, default: 'Student' },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   wishlist: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
//   enrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
//   isAdmin: { type: Boolean, default: false }
// });
// module.exports = mongoose.model('User', UserSchema);




const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});
module.exports = mongoose.model('User', UserSchema);
