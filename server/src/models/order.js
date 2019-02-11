import mongoose from 'mongoose';

const { Schema } = mongoose;
const orderSchema = new mongoose.Schema({
  iduser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  poids: Number,
  totalPrice: Number,
  comment: String,
  validatingDate: Date,
  validatorid: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, {
  collection: 'order',
  timestamps: true,
});

export default mongoose.model('order', orderSchema);
