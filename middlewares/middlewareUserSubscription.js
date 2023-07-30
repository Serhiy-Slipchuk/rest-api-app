const { userSubscriptionJoiSchema } = require("../models/user");

const middlewareUserSubcription = async (req, res, next) => {
    try {
        await userSubscriptionJoiSchema.validateAsync(req.body);

        next()
    } catch (error) {
        res.status(400).json({message: `Помилка валідації Joi: ${error.message}`})
    }
}

module.exports = middlewareUserSubcription;