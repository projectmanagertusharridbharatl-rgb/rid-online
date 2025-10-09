// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const CourseSchema = new Schema({
//   title: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   shortDesc: String,
//   description: String,
//   instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
//   category: { type: Schema.Types.ObjectId, ref: 'Category' },
//   price: { type: Number, default: 0 },
//   rating: { type: Number, default: 0 },
//   students: { type: Number, default: 0 },
//   badge: String,
//   createdAt: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('Course', CourseSchema);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDesc: String,
  description: String,
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  rating: Number,
  students: Number,
  badge: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Course', CourseSchema);
