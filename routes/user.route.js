import { Router } from "express";
import {
    userSignIncontroller,
    userSignUpController,
} from "../controllers/user.controller.js";
import { emailvalidation } from "../middlewares/validate/email.validate.js";
import { validationHandler } from "../middlewares/validate/validation.js";
import { namevalidation } from "../middlewares/validate/name.validate.js";
import { passwordvalidation } from "../middlewares/validate/passwort.validate.js";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;

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

     const count = req.cookies.count; // warum ist das im code?

   // const secretKey = 'deinGeheimerSchlüssel';

//  const user = {
//     id: '123',
//       name: 'Beispielbenutzer'
//  };

    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res
        .status(200)
        .cookie("jwt", token, {
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
