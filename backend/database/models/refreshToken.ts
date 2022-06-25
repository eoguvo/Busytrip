import mongoose from 'mongoose';

function createSchema() {
  const schema = new mongoose.Schema({
    token: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    expiryDate: Date,
  });

  schema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

  return schema;
}

const schema = createSchema();

export default mongoose.model('RefreshToken', schema);
