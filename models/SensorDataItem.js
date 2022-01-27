const { Schema, model } = require("mongoose")

const SensorDataSchema = new Schema({
    description: {
        type: String,
    },
    temperature: {
        type: Number
    },
    humidite: {
        type: Number
    },
    VCC: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rssi: {
        type: Number
    }

})

const SensorDataItem = model('Sensor_Temp_Hum', SensorDataSchema)
module.exports = SensorDataItem