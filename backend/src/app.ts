import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes';
import { postRouter } from './modules/medicine/medicine.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1', router);

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Medivault is running');
});

export default app;
