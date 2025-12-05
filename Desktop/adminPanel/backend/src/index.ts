import express from 'express';
import cors from 'cors';
import productsRouter from '../src/routes/productsRouter'

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
