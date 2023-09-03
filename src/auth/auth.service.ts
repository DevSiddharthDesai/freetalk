import {authenticationService, BadRequestError} from '../../common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { SigninDto } from './auth.types';

export const signinService = async (signinparams: SigninDto) => {

    const {email, password} = signinparams;

    const user = await User.findOne({email});

    if(!user) return {message: "Wrong Credentials"};

    const isEqual = await authenticationService.pwdCompare(user.password, password);

    if(!isEqual) return {message: "Wrong Credentials"};

    const token = jwt.sign({
        email,
        userId: user._id
    }, process.env.JWT_KEY!, {expiresIn: '60'});

    return {token};
}

export const signupService = async (signupparams: SigninDto) => {

    const {email, password} = signupparams;

    const user = await User.findOne({email});

    if(user) return {message: "user with the same email already exists"};

    let newUser = User.build({
        email,
        password
    });

    newUser = await newUser.save();

    return {newUser};
}