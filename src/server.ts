import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './shared/database';
import uploadConfig from './shared/config/upload';

import errorMiddleware from './shared/middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errorMiddleware);

app.listen(3335, () => {
  console.log('🚀 Server started on port 3335');
});
