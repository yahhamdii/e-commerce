import mongoose from 'mongoose';

const orderstatusSchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  statusid: { type: String, required: true },
}, {
  collection: 'orderstatus',
  timestamps: true,
});

const OrderStatus = mongoose.model('orderstatus', orderstatusSchema);
export default OrderStatus;
