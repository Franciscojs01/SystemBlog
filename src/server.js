import express from 'express';
import 'dotenv/config';

import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

await connectDB();
app.listen(3000);
