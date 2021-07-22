import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user_route.js';
import postsRouter from './routes/posts_route.js';
import authRouter from './routes/auth_route.js';

// App config
const app = express();
dotenv.config();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: "10000kb", extended: true }));
app.use(express.urlencoded({ limit: "10000kb", extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    next();
  });

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);


// DB config
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
.catch((err) => console.log(`${err} did not connect`));