import dotenv from 'dotenv'
dotenv.config()

import express, { json } from 'express';
import cors from 'cors';
import router from './Routes/routes.js';

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});