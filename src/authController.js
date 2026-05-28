const User = require('./usersModel');
const bcrypt = require('bcryptjs');
const cryptojs = require('crypto-js');
const nodemailer = require('nodemailer');
const OTP = require('./otpModel');
// const Redis = require('ioredis');
// const redis = new Redis({
//     host: process.env.REDIS_HOST || "redis",  // <-- use service name, not localhost
//     port: process.env.REDIS_PORT || 6379,
//   })
const SECRET_KEY = process.env.SECRET_KEY;

class authController {  
   async generateOtp() {
        return Math.floor(100000 + Math.random() * 900000);
    };
    getOtp = async(req, res)=>  {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User not found" });
            const otp =   Math.floor(100000 + Math.random() * 900000);;
            const encryptedOtp = cryptojs.AES.encrypt(otp.toString(), SECRET_KEY).toString();
            await OTP.findOneAndUpdate({email}, { otp: encryptedOtp }, { upsert: true, new: true });

            await OTP.findOneAndUpdate({email}, { otp: encryptedOtp }, { upsert: true, new: true });
            // await redis.set(email, encryptedOtp, 'EX', 60);
            const isMailSent = await this.sendMail(email, otp);
            if (isMailSent) {
                return res.status(200).json({ message: "OTP sent to your email" });
            } else {
                return res.status(500).json({ message: "Failed to send OTP" });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }

    varifyOtp = async(req, res)=>  {
        const { email, otp } = req.body;
        try {
            const encryptedOtp = await redis.get(email);
            if (!encryptedOtp) return res.status(400).json({ message: "OTP expired" });
            const decryptedOtp = cryptojs.AES.decrypt(encryptedOtp, SECRET_KEY).toString(cryptojs.enc.Utf8);
            if (decryptedOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });
            await redis.del(email);
            return res.status(200).json({ message: "OTP verified" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }
    
    
     sendMail = async (email, otp) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            pool: true,
            maxConnections: 5, 
            maxMessages: 100, 
            rateLimit: 10,
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for password reset',
            text: `Your OTP is ${otp}`
        };
        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    changePassword = async(req, res)=>  {
        const { email, newPassword } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User not found" });
            user.password = newPassword;
            await user.save();

            return res.status(200).json({ message: "Password changed successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new authController();