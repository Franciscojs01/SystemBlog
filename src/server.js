import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.routes.js';

import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

await connectDB();
app.listen(3000);
