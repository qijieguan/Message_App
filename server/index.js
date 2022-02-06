const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const usersRouter = require('./routes/users');
const friendsRouter = require('./routes/friends');
const textsRouter = require('./routes/texts');

app.use('/users', usersRouter);
app.use('/friends', friendsRouter);
app.use('/texts', textsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}!`);
});
