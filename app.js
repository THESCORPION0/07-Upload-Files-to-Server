import dotenv from 'dotenv';
import 'express-async-errors'
// Extra Security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';
import express from 'express';
import startServer from './utils/startServer.js';
import mountRoutes from './routes/index.js';

const app = express();
dotenv.config();

app.set('trust proxy', 1)
app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  }
));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

mountRoutes(app);
startServer(app);