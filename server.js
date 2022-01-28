const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose")
const { mongoUri } = require('./config')
//const SensorDataRoutes = require('./routes/api/temp_hum_route')
const SensorDataRoutes = require('./routes/api/gps_route')

const path = require("path")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("MongoDB database connected"))
    .catch((err) => console.log(err))

app.use('/api/SensorDataList', SensorDataRoutes)



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});