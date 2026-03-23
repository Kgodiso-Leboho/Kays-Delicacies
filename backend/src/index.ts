import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors'

app.use(cors())
app.use(express.json())

let PORT: number = process.env.PORT;

if (!PORT) {
    PORT = 5432;
}

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})