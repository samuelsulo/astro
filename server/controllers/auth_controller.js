import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user_model.js';

export const signup = async (req, res) => {
    const username = (req.body.user.username).toLowerCase();
    const email = (req.body.user.email).toLowerCase();
    const { password } = req.body.user;
    const { checked } = req.body;

    try {
        const oldUserByEmail = await User.findOne({ email: email });

        const oldUserByUsername = await User.findOne({ username: username });

        if (oldUserByEmail && oldUserByUsername) return res.status(400).json({ message: "Both"});

        if (oldUserByEmail) return res.status(400).json({ message: "Email" });

        if (oldUserByUsername) return res.status(400).json({ message: "Username" });

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({ username: username, email: email, password: hashedPassword, allowEmails: checked ? "yes" : "no" });

        const token = jwt.sign( { email: user.email, id: user._id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1d" } );

        res.cookie('access_token', token, {
            maxAge: 24 * 3600 * 1000,
            expiresIn: 24 * 3600 * 1000,
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            domain: process.env.COOKIE_DOMAIN
        });

        user = user.toObject();
        delete user.password;
        delete user.__v;

        res.status(201).json({ user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

export const signin = async (req, res) => {
    const { password } = req.body.user;
    const { checked }  = req.body;
    const email = (req.body.user.email).toLowerCase();

    try {
        let user = await User.findOne({ email: email});
        
        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: checked ? "7d" : "1d" });
        
        user = user.toObject();
        delete user.password;
        delete user.__v;

        const exp = checked ? 7 * 24 * 3600 * 1000 : 24 * 3600 * 1000;

        res.cookie('access_token', token, {
            maxAge: exp,
            expiresIn: exp,
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            domain: process.env.COOKIE_DOMAIN
        });

        res.status(200).json({ user: user });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const logout = async (req, res) => {
    res.cookie('access_token', 'none', {
        httpOnly: false,
        maxAge: 21474836,
        expiresIn: 21474836,
        sameSite: 'lax',
        secure: true,
        domain: process.env.COOKIE_DOMAIN
    });
    
    res.status(200).json({ success: true, message: "User logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const token = jwt.sign({ email: email }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 1200 });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            }
          });
          
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Astro: Password Reset",
            text: 'Click here to reset your password: https://www.astroland.xyz/account/password/reset?' + token,
        };
            
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).json({ message: "Something went wrong" });
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: "Email sent successfully"});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
} 

export const resetPassword = async (req, res) => {
    const { password, token } = req.body;

    try {
        let { email } = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ email: email }, { password: hashedPassword });

        res.status(200).json("Password reset successfully");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
