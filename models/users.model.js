import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: String,
    username: String,
});

//Hook wird vor dem Speichern in die Datenbank ausgeführt
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//Methoden Anhängen
UserSchema.methods.auth = async function (plainpassword) {
    return await bcrypt.compare(plainpassword, this.password);
};

export const UserModel = model("user", UserSchema);
