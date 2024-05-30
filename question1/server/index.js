import express from 'express'
import cors from 'cors';
import Routes from './controllers/Routes.js';

const app = express();
app.use(express.json());
app.use('/', Routes);
app.use(cors());
const port =3000;
app.listen(port, () => console.log(`Server running on port ${port}`));