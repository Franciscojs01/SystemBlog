import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://arthurpinheiro703_db_user:OCufxFWC9a4OONQQ@backend-blog.dg27q98.mongodb.net/?appName=backend-blog';

const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('blog');

    console.log('Conectado com sucesso ao banco de dados.');
  } catch (error) {
    console.error('Falha ao conectar ao banco de dados', error);
    process.exit(1);
  }
}

const getDB = () => db;

export { connectDB, getDB };
