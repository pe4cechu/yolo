import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
    {
        sensor_name: { type: String, maxLength: 255, required: true },
        energy: { type: Number, maxLength: 255, required: true },
        temperature: { type: Number, maxLength: 255, required: true },
        humidity: { type: Number, maxLength: 255, required: true },
        lux: { type: Number, maxLength: 255, required: true },
        light: { type: Number, maxLength: 255, required: true },
        pwd: { type: String, maxLength: 255, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Sensor ||
mongoose.model("Sensor", sensorSchema);
