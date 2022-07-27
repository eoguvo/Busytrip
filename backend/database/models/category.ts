import mongoose from '..';

function createSchema() {
  return new mongoose.Schema({
    icon: String,
    name: {
      type: String,
      default: 'Geral'
    }
  })
}

const schema = createSchema();
export default mongoose.model('Category', schema);
