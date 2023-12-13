import { validationResult } from "express-validator";

export const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        // Oder Aufruf von next() mit Errorcreator
    }
    next();
};
