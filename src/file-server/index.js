import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.static('./../assets/zkproof'));
app.listen(8000, () => console.log('Serving at http://localhost:8000!'));
