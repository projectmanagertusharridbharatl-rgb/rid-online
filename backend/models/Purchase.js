// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const PurchaseSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User' },
//   course: { type: Schema.Types.ObjectId, ref: 'Course' },
//   amount: Number,
//   createdAt: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('Purchase', PurchaseSchema);





const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Purchase', PurchaseSchema);
