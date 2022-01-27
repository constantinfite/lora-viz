const { Router } = require('express')

const SensorDataItem = require('../../models/SensorDataItem')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const sensorDataItems = await SensorDataItem.find()
        if (!sensorDataItems) throw new Error('No data')
        const sorted = sensorDataItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    
    console.log("req = ", req.body.uplink_message.rx_metadata[0])
    console.log("req = ", req.body.uplink_message)


    const raw_date = req.body.uplink_message.rx_metadata[0]['time']


    const formated_date = new Date(raw_date.substring(0, 23) + 'Z')

    /*var new_date = formated_date.setHours(formated_date.getHours() + 2)
    console.log(new_date)*/

    const newSensorDataItem = new SensorDataItem({
        temperature: req.body.uplink_message.decoded_payload.degreesC,
        humidite: req.body.uplink_message.decoded_payload.humidity,
        VCC: req.body.uplink_message.decoded_payload.vcc,
        date: formated_date,
        rssi: req.body.uplink_message.rx_metadata[0]['rssi']
    }
    )
    try {
        const SensorDataList = await newSensorDataItem.save()
        if (!SensorDataList) throw new Error('Something wrong saving the data')
        res.status(200).json(SensorDataList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router