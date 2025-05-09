import express from 'express';
import dotenv from 'dotenv';
import ServerResponse from './utils/ServerResponse';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.disable('x-powered-by');
app.use(express.json());

app.use('/api/v1', router);

app.use((req, res, next) => {
  return ServerResponse.error(res, 'Route not found');
});

export default app;
