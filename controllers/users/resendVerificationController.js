const { User } = require("../../models/user")
const { sendEmail } = require("../../services")

const resendVerificationController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
    
        if(!user) {
            res.status(404).json({ message: "User not found" });
            return
        }

        if(user.verify) {
            res.status(400).json({ message: "Verification has already been passed"});
            return
        }

        const verifyEmail = {
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: "Verify your email",
            html: `<p>Click this <a target="_blanc" href="${process.env.BACKEND_HOST}/api/users/verify/${user.verificationToken}">LINK</a> to complete verification your e-mail address</p>`
          }
          sendEmail(verifyEmail);

        res.status(200).json({ message: "Verification email sent" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
}

module.exports = {
    resendVerificationController
}