import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes';
import { postRouter } from './modules/medicine/medicine.routes';
import { orderRouter } from './modules/order/order.routes';
import { userRouter } from './modules/users/users.routes';
import { stripeRouter } from './modules/stripe/stripe.router';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1', router);

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/order", orderRouter);
app.use("/users", userRouter);
app.use("/stripe", stripeRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Medivault is running');
});

export default app;
