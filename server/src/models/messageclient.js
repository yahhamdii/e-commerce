import mongoose from 'mongoose';

const messageclientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  object: { type: String, required: true },
  message: { type: String, required: true },
}, {
  collection: 'messageclient',
  timestamps: true,
});

const MessageClient = mongoose.model('messageclient', messageclientSchema);
export default MessageClient;
