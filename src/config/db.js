import mongoose from 'mongoose';

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('MongoDB já está conectado!');
    return mongoose.connection;
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`MongoDB conectado!`);

    return connection;
  } catch (error) {
    console.error('Falha ao conectar MongoDB:', error.message);
    process.exit(1);
  }
}

export { connectDB };
