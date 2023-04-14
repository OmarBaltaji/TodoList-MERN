require('express-async-errors');

const express = require('express');
const cors = require('cors');
const { NotFoundMiddleware, ErrorHandlerMiddleware } = require('./middleware');
const connectDB = require('./db/connect');

require('dotenv').config(); // Load env variables here

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // skips origin policy and accesses resources from remotehost
app.use(express.json()) // to parse json

const itemsRouter = require('./routers/todoItem');
const listRouter = require('./routers/todoList');

app.use('/api/v1/items', itemsRouter);
app.use('/api/v1/lists', listRouter);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);


const start = async() => {
    try {
        await connectDB(process.env.ATLAS_URI);
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        })
    } catch (error) {
        console.error(error);
    }
}

start();