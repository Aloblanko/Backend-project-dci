import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";

config();


const app = express();
app.use(json());
app.use(
    cors({
        credentials: true,
    })
);
// Endpoints
app.use("/user", userRouter);

app.use("/upload", uploadRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({
        answer: {
            code: 404,
            data: "Page not found",
        },
    });
});

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({
        answer: {
            code: err.code || 500,
            data: err.message || "Server Error",
        },
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
});

