import mongoose from "mongoose";

//Verbindung herstellen
export async function mongoConnect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
            {
                dbName: "NeueDatenbank",
            }
        );
    } catch (error) {
        console.log(error.message);
    }
}

export function mongoErrorListener() {
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
}

export function mongoConenctLister() {
    mongoose.connection.on("connected", () => {
        console.log("Verbindung hergstellt");
    });
}

export function mongoDisconenctLister() {
    mongoose.connection.on("disconnected", () => {
        console.log("Verbindung disconnected");
    });
}
