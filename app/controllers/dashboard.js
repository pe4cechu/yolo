import { multipleMongooseToObject } from "@/app/utils/mongoose";
import Sensor from "@/app/models/Sensor";
import mqtt from "mqtt";
import { Server } from "socket.io";
import EventEmitter from "events";

class DashboardController extends EventEmitter {
    constructor(io, mqttClient) {
        super();
        this.io = io;
        this.mqttClient = mqttClient;

        this.updateled = this.updateled.bind(this);
        this.enterkey = this.enterkey.bind(this);

        this.mqttClient.on("connect", () => {
            console.log("Connected to Adafruit MQTT broker");
            // this.mqttClient.subscribe("Peac4Phan/feeds/microbit-temperature");
            // this.mqttClient.subscribe("Peac4Phan/feeds/microbit-humi");
            // this.mqttClient.subscribe("Peac4Phan/feeds/microbit-lux");
            // this.mqttClient.subscribe("Peac4Phan/feeds/microbit-rgb");
            // this.mqttClient.subscribe("Peac4Phan/feeds/microbit-pwd");
        });

        this.mqttClient.on("message", async (topic, message) => {
            console.log("Received message:", message.toString(), "from topic:", topic);

            const data = message.toString();

            try {
                let sensor;
                switch (topic) {
                    case "Peac4Phan/feeds/Yolohome_Temperature":
                        sensor = await Sensor.findOne({ sensor_name: "temperatureSensor" });
                        sensor.temperature = data;
                        break;
                    case "Peac4Phan/feeds/Yolohome_Humid":
                        sensor = await Sensor.findOne({ sensor_name: "humiSensor" });
                        sensor.humidity = data;
                        break;
                    case "Peac4Phan/feeds/Yolohome_Lux":
                        sensor = await Sensor.findOne({ sensor_name: "luxSensor" });
                        sensor.lux = data;
                        break;
                    case "Peac4Phan/feeds/Yolohome_RGB":
                        sensor = await Sensor.findOne({ sensor_name: "lightSensor" });
                        sensor.light = data;
                        break;
                    default:
                        console.error("Unknown topic:", topic);
                        return;
                }

                if (!sensor) {
                    console.error("Sensor not found");
                    return;
                }

                await sensor.save();
                console.log("Sensor data saved to MongoDB");
                this.emitSensorData();
            } catch (err) {
                console.error("Error saving sensor data:", err);
            }
        });
    }

    async emitSensorData() {
        try {
            const sensors = await Sensor.find({});
            this.io.emit("sensorDataUpdated", multipleMongooseToObject(sensors));
        } catch (err) {
            console.error("Error fetching sensor data:", err);
        }
    }

    async dashboard(req, res) {
        try {
            const sensors = await Sensor.find({});
            res.status(200).json({ sensors: multipleMongooseToObject(sensors) });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch sensor data" });
        }
    }

    async updateled(req, res) {
        try {
            const { action } = req.body;
            if (action === "updateLed") {
                const lightSensor = await Sensor.findOne({ sensor_name: "lightSensor" });
                lightSensor.light = lightSensor.light === 0 ? 1 : 0;
                await lightSensor.save();

                this.mqttClient.publish(
                    "Peac4Phan/feeds/microbit-rgb",
                    lightSensor.light.toString()
                );

                res.status(200).json({
                    success: true,
                    message: "LED state updated successfully",
                    lightState: lightSensor.light,
                });
            } else {
                res.status(400).json({ success: false, message: "Invalid action" });
            }
        } catch (error) {
            console.error("Error updating LED:", error);
            res.status(500).json({ success: false, message: "An error occurred" });
        }
    }

    async enterkey(req, res) {
        try {
            const { action, enteredNumber } = req.body;
            if (action === "enterKey") {
                const digit = enteredNumber.toString().slice(-1);

                let passwordSensor = await Sensor.findOne({
                    sensor_name: "passwordSensor",
                });

                if (!passwordSensor) {
                    passwordSensor = new Sensor({
                        sensor_name: "passwordSensor",
                        pwd: digit,
                    });
                } else {
                    passwordSensor.pwd = digit;
                }

                await passwordSensor.save();
                this.mqttClient.publish("Peac4Phan/feeds/microbit-pwd", digit);

                res.status(200).json({
                    success: true,
                    message: "Password state updated successfully",
                    passwordState: enteredNumber,
                });
            } else {
                res.status(400).json({ success: false, message: "Invalid action" });
            }
        } catch (error) {
            console.error("Error updating password:", error);
            res.status(500).json({ success: false, message: "An error occurred" });
        }
    }
}

const mqttClient = mqtt.connect("mqtt://io.adafruit.com", {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: "my-client-id",
    clean: true,
});

const io = new Server();

const dashboardController = new DashboardController(io, mqttClient);

export default dashboardController;
