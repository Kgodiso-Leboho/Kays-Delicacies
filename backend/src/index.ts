import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.Routes";

dotenv.config()

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

let PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})