import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import auth from './routes/auth.js'
import transaction from './routes/transaction.js'
import { fileURLToPath } from 'url';
const app = express()
const port = 3000


app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config( {path: path.join(__dirname, '.env')});
console.log(process.env.MONGO_URI);
await mongoose.connect(process.env.MONGO_URI);
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//linking the routes
app.use('/api/auth',auth);
app.use('/api/transaction',transaction);
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})