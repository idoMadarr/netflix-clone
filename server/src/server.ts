import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes';

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u7odt.mongodb.net/${process.env.DB_NAME}`;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    throw new Error(`Error ${500}: ${err.message || 'An unknown error occurred'}`);
})

connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})
.catch(err => console.log(err))