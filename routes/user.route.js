import { Router } from "express";
import {
    userSignIncontroller,
    userSignUpController,
} from "../controllers/user.controller.js";
import { emailvalidation } from "../middlewares/validate/email.validate.js";
import { validationHandler } from "../middlewares/validate/validation.js";
import { namevalidation } from "../middlewares/validate/name.validate.js";
import { passwordvalidation } from "../middlewares/validate/passwort.validate.js";

export const userRouter = Router();

userRouter.post(
    "/auth",
    emailvalidation,
    namevalidation,
    passwordvalidation,
    validationHandler,
    userSignUpController
);

userRouter.get("/", (req, res, next) => {
    const count = req.cookies.count;
    res
        .status(200)
        .cookie("jwt", jwt, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        })
        .json({
            answer: {
                data: "Hallo",
                code: 200,
            },
        });
});

userRouter.get("/auth", emailvalidation, userSignIncontroller);
