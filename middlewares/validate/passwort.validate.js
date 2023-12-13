import { check } from "express-validator";

export const passwordvalidation = check("password")
    .matches(/^(?=.*[A-Z]).{8,}$/)
    .escape()
    .trim()
    .withMessage("Das Passwort ist zu unsicher");
