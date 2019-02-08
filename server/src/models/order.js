import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userid: String,
  poids: String,
  totalPrice: String,
  comment: String,
  validatingDate: Date,
  validatorid: String,
}, {
  collection: 'order',
  timestamps: true,
});

export default mongoose.model('order', orderSchema);
