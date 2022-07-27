import mongoose from '..';

function createSchema() {
  return new mongoose.Schema({
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    ratings: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    body: {
      type: String,
      required: true,
      maxLength: 140
    }
  });
}

const schema = createSchema();
export default mongoose.model('Feedback', schema);
