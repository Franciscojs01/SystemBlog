import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
// import errorHandler from './middlewares/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(express.json());

app
  .use('/auth', authRoutes)
  .use('/users', userRoutes)
  .use('/posts', postRoutes)
  // .use(errorHandler)
  .use((req, res, next) => {
    res.status(404).json({ messagem: 'A rota solicitada não existe.' });
  });

await connectDB();
app.listen(3000);
