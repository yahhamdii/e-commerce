import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  tarifdelivery: { type: String, required: true },
  deliverydate: Date,
  deliverymode: String,
}, {
  collection: 'delivery',
  timestamps: true,
});

const Delivery = mongoose.model('delivery', deliverySchema);
export default Delivery;
