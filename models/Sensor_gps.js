const { Schema, model } = require("mongoose")

const SensorDataSchema = new Schema({
    description: {
        type: String,
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    altitude:{
        type: Number
    },/*
    VCC: {
        type: Number
    },*/
    date: {
        type: Date,
        default: Date.now,
    },
    rssi: {
        type: Number
    }

})

const SensorDataItem = model('Sensor_gps', SensorDataSchema)
module.exports = SensorDataItem