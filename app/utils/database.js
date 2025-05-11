import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log("Already MongoDB Connected...!");
    return;
  }

  mongoose
    .connect(
      "mongodb+srv://peacechu:Liminated123@greenly.9nt7y6k.mongodb.net/",
      {
        dbName: "YoloHome",
      }
    )
    .then((msg) => console.log("MongodB Connected Successfully...!"))
    .catch((err) => console.log(err.message));
};

export default connectDB;
