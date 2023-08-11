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
        enum: ['starter', 'pro', 'business'],
        default: 'starter'
      },
      avatarURL: String,
      token: String,
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      }
}, {versionKey: false});

const User = model("user", userSchema);

const userJoiSchema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    token: Joi.string()
})

const userSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

module.exports = {User, userJoiSchema, userSubscriptionJoiSchema}

