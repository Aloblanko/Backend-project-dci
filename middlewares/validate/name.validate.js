import { check } from "express-validator";

export const namevalidation = check("username")
    .isLength({ min: 2 })
    .escape()
    .trim()
    .withMessage("Der Name muss mindestens 2 Zeichen lang sein");
