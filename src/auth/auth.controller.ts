import {Router, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {BadRequestError} from '../../common';
import { signinService, signupService } from './auth.service';

export const SignIn = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    const result = await signinService({email, password});

    if(result.message){
        return next(new BadRequestError(result.message));
    }
    
    req.session = {jwt: result.token};

    res.status(200).send(true);
};

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    const result = await signupService({email, password});

    if(result.message){
        return next(new BadRequestError(result.message));
    }

    req.session = {
        jwt: jwt.sign({email, userId: result.newUser?._id}, process.env.JWT_KEY!, {expiresIn: '60'})
    }

    res.status(201).send(true);

}

export const CurrentUser = async (req: Request, res: Response, next: NextFunction)=> {
    res.status(200).send({currentUser: req.currentUser})
};


