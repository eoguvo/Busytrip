import mongoose from '..';

function createSchema() {
  const schema = new mongoose.Schema({
    token: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    expiryDate: Date,
  }, { timestamps: true });

  schema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

  return schema;
}

const schema = createSchema();

export default mongoose.model('RefreshToken', schema);
