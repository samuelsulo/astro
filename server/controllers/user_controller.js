import nodemailer from 'nodemailer';

import Post from '../models/post_model.js';
import User from '../models/user_model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "username firstName lastName image avatarColor description");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getSearchedUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username }, "firstName lastName username image avatarColor description follower followed");

        if (!user) return res.status(404).json({ message: "User not found" });

        const posts =  await Post.find({ userId: user._id }).select("-image -reports");
        
        res.status(200).json({ user: user, posts: posts });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });    
    }
}

export const getUser = async (req, res) => {
    const { id } = req.body.user;

    try {
        const user = await User.findById(id).select("-password -__v");

        if (!user) return res.status(400).json({ message: "User doesn't exist"});

        res.status(200).json({ user: user});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.body.user;
    const { firstName, lastName, phoneNumber, description, image, avatarColor} = req.body;
    const username = (req.body.username).toLowerCase();
    const email = (req.body.email).toLowerCase();

    try {
        const actualUser = await User.findById(id);
        let oldUserByUsername;
        let oldUserByEmail;

        if (actualUser.username !== username) oldUserByUsername = await User.findOne({ username: username });
        
        if (actualUser.email !== email ) oldUserByEmail = await User.findOne({ email: email });
            
        if (oldUserByEmail && oldUserByUsername) return res.status(400).json({ message: "Both"});
            
        if (oldUserByEmail) return res.status(400).json({ message: "Email" });
        
        if (oldUserByUsername) return res.status(400).json({ message: "Username" });

        const updatedUser = await User.findByIdAndUpdate(id, { firstName: firstName, lastName: lastName, username: username, email: email,
            phoneNumber: phoneNumber, description: description, image: image, avatarColor: avatarColor}, { new: true }).select("-password -__v");
            
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

export const followProfile = async (req, res) => {
    const actualUserId = req.body.user.id;
    const searchedUserId = req.params.id;

    try {
        const { followed } = await User.findById(actualUserId).select("followed -_id");
        const { follower } = await User.findById(searchedUserId).select("follower -_id");

        let index = -1;
        for (let i = 0; i < followed.length; i++) {
            if (followed[i] === searchedUserId) {
                index = i;
                followed.splice(i, i+1);
                break;
            }
        }
        if (index === -1)
            followed.push(searchedUserId);
        else index = -1;

        for (let i = 0; i < follower.length; i++) {
            if (follower[i] === actualUserId) {
                index = i;
                follower.splice(i, i+1);
                break;
            }
        }

        if (index === -1)
            follower.push(actualUserId);

        await User.findByIdAndUpdate(actualUserId, { followed: followed });
        await User.findByIdAndUpdate(searchedUserId, { follower: follower });

        res.status(200).json({ follower: follower, followed: followed });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const sendEmail = async (req, res) => {
    const { name, message } = req.body;
    const email = (req.body.email).toLowerCase();
    
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            }
          });
          
        var mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: name + " " + email,
            text: message,
        };
            
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: "Email sent successfully"});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
