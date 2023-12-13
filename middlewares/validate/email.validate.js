import { check } from "express-validator";

export const emailvalidation = check("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Dies ist keine korrekte Email");
