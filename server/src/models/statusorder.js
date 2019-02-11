import mongoose from 'mongoose';

const { Schema } = mongoose;
const orderstatusSchema = new mongoose.Schema({
  idorder: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  idstatus: {
    type: Schema.Types.ObjectId,
    ref: 'status',
    required: true,
  },
}, {
  collection: 'orderstatus',
  timestamps: true,
});

const OrderStatus = mongoose.model('orderstatus', orderstatusSchema);
export default OrderStatus;
