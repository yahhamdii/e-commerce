import mongoose from 'mongoose';

const { Schema } = mongoose;
const deliverySchema = new mongoose.Schema({
  idorder: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  tarifdelivery: { type: Number, required: true },
  deliverydate: Date,
  deliverymode: String,
}, {
  collection: 'delivery',
  timestamps: true,
});

const Delivery = mongoose.model('delivery', deliverySchema);
export default Delivery;
