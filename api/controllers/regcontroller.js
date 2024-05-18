const reg = require('../models/reg')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
require('dotenv').config()


exports.reg = async (req, res) => {
    // console.log(req.body)
    const { Username, Password, Email } = req.body
    try {
        const userCheck = await reg.findOne({ $or: [{ email: Email }, { password: Password }] });
        // const usercheck = await reg.findOne({ username: Username })
        //  console.log("userCheck", userCheck)
        if (userCheck == null) {
            const convertedpass = await bcrypt.hash(Password, 10)
            const record = new reg({ username: Username, password: convertedpass, email: Email })
            // console.log(record);
            record.save()
            res.json({
                status: 201,
                apiData: record,
                message: "Successfully account has been Created "
            })
        } else {
            res.json({
                status: 400,
                message: `${Username} Username Already taken`
            })

        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }
}

exports.logincheck = async (req, res) => {
    // console.log(req.body)
    try {
        const { Username, Password } = req.body
        const record = await reg.findOne({ $or: [{ email: Username }, { username: Username }] })
        // console.log(record)
        if (record !== null) {
            const passwordcompared = await bcrypt.compare(Password, record.password)

            if (passwordcompared) {
                if (record.status == "Active") {
                    res.json({
                        status: 201,
                        apiData: record
                    })
                }
                else {
                    res.json({
                        status: 400,
                        message: "User Status not active"
                    })
                }

            } else {
                res.json({
                    status: 400,
                    message: "Password not matched "
                })
            }

        } else {
            res.json({
                status: 400,
                message: "Wrong Crediantles"
            })

        }



    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.userfetch = async (req, res) => {
    // console.log(req.params.id)
    try {
        const record = await reg.find()
        // console.log(record)
        res.json({
            status: 200,
            message: 'success',
            record: record
        })
    } catch (error) {
        res.json({
            status: 200,
            message: error.message,
        })
    }

}

exports.userupdate = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    try {
        const record = await reg.findById(id)
        // console.log(record)
        res.json({
            status: 200,
            message: 'Suucessfully delivered'
        })

    } catch (error) {
        res.json({
            message: 'error.message'
        })
    }
}

exports.update = async (req, res) => {
    const userId = req.params.id;
    const newStatus = req.body.status;
    // New status received from the request body
    // console.log("user status:", newStatus, " ", "User ID:", userId);

    try {
        // Find the user by ID and update the status
        const updatedUser = await reg.findByIdAndUpdate(
            userId,
            { $set: { status: newStatus } }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        return res.json({ status: 200, message: 'Status updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(
            { status: 500, message: 'Internal server error' });
        return
    }
}

exports.forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        const record = await reg.findOne({ email });
        if (!record) {
            return res.status(404).send({ message: 'Email not found' });
        }

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER, // your email
                pass: process.env.NODEMAILER_PASS, // your email password
            },
        });

        console.log("Connected to SMTP server");

        let info = await transporter.sendMail({
            from: 'smsyed123786@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Password Reset Link - Shopping E-cart ID', // Subject line
            text: 'Click to reset the password', // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your Shopping E-cart account. Click the link below to reset your password:</p>
                    <p style="text-align: center;">
                        <a href="http://localhost:3000/resetsentpage/${email}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </p>
                    <p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 24 hours.</p>
                    <p>Thank you,<br/>The Shopping E-cart Team</p>
                    <hr/>
                    <p style="font-size: 12px; color: #777;">If you’re having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
                    <p style="font-size: 12px; color: #777;"><a href="http://localhost:3000/resetpassword/${email}">http://localhost:3000/resetpassword/${email}</a></p>
                </div>
            `, // html body
        });

        console.log('Password reset link has been sent to your email');
        res.send({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred. Please try again later.' });
    }
};

exports.resetpassword = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;

        const record = await reg.findOne({ email });
        if (!record) {
            return res.status(404).send({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        record.password = hashedPassword;
        await record.save();

        res.send({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred. Please try again later.' });
    }
}