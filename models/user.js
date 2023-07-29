const { model, Schema } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: String
}, {versionKey: false});

const User = model("user", userSchema);

const userJoiSchema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string()
})

module.exports = {User, userJoiSchema}

