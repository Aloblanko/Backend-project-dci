import { Router } from "express";
import { uploadController } from "../controllers/upload.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + "_" + file.originalname);
    },
});
const upload = multer({ storage: storage });

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("fileField"), uploadController);
