const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Load env variables here

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // skips origin policy and accesses resources from remotehost
app.use(express.json()) // to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const itemsRouter = require('./routers/todoItem');
const listRouter = require('./routers/todoList');

app.use('/items', itemsRouter);
app.use('/lists', listRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})