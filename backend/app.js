const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.routes');
const sosRoutes = require('./routes/sos.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hellp  sidrat world");
});

app.use('/users', userRoutes);
app.use('/api/sos', sosRoutes);

module.exports = app;