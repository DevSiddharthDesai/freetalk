import express, {Request, Response, NextFunction} from 'express';
import {json, urlencoded} from 'body-parser'
import cors from 'cors';
import cookieSession from 'cookie-session';
import { newPostRouter, deletePostRouter, updatePostRouter, readPostRouter, newCommentRouter, deleteCommentRouter, signupRouter, signinRouter } from './routes';
import { currentUser, requireAuth } from '../common';
const connectDb = require('../../config/db');

const app = express();

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));

app.set('trust proxy', true);

connectDb();

app.use(urlencoded({
    extended: false
}))

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: false
}));

app.use(currentUser);

app.use(signupRouter);
app.use(signinRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(readPostRouter);
app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

declare global {
    interface CustomError extends Error{
        status?: number
    }
}
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status){
        return res.status(error.status).json({
            message: error.message
        });
    }

    res.status(500).json({message: 'Something went wrong'});
});

app.listen(8080, () => console.log('server up and running on port 8080'));