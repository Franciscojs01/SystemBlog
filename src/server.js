import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/user.routes.js';
import postsRoutes from './routes/post.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import { connectDB } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(express.json());

app.use('/users', usersRoutes).use('/posts', postsRoutes).use(errorHandler);

await connectDB();
app.listen(3000);
