import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(`${process.env.MONGO_URL}`);
console.log()
mongoose.Promise = global.Promise;

export const connectDb = async () => {
  try {
      await mongoose.connect(''+process.env. MONGO_URL)

      console.info(`Connected to database on Worker process: ${process.pid}`)
  } catch (error: any) {
      console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
      process.exit(1)
  }
}

export default mongoose;