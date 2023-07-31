const { userJoiSchema } = require("../models/user");

const middlewareUsers = async (req, res, next) => {
    try {
        await userJoiSchema.validateAsync(req.body);

        next()
    } catch (error) {
        res.status(400).json({message: `Помилка валідації Joi: ${error.message}`})
    }
}

module.exports = middlewareUsers