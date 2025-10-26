import express from 'express';
import 'dotenv/config';

import { connectDB, getDB } from './config/database.js';

app.use(express.json());

connectDB()
  .then(() => app.listen(3000))
  .finally(() => console.log(getDB()));
