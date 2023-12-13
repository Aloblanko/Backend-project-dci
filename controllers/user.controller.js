import { UserModel } from "../models/users.model.js";

export async function userSignUpController(req, res, next) {
    const { email, password, username } = req.body;

    try {
        const data = await UserModel.create({
            email: email,
            password: password,
            username: username,
        });

        //WICHTIG: FÜR DIE SICHERHEIT - Sensible Daten löschen
        const dataObj = data.toObject();
        delete dataObj.password;

        res.status(200).json({
            answer: {
                code: 200,
                data: dataObj,
            },
        });
    } catch (error) {
        return res.status(401).json({
            answer: {
                code: 401,
                data: "User existiert bereits",
            },
        });
    }
}

export async function userSignIncontroller(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                answer: {
                    code: 401,
                    data: "Logindaten falsch",
                },
            });
        }
        const isValid = await user.auth(password);

        if (isValid) {
            const dataObj = user.toObject();
            delete dataObj.password;

            res.status(200).json({
                answer: {
                    code: 200,
                    data: dataObj,
                },
            });
        } else {
            res.status(401).json({
                answer: {
                    code: 401,
                    data: "Logindaten sind falsch",
                },
            });
        }
    } catch (error) {
        next("Error");
    }
}
