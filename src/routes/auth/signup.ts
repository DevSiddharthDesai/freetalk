import {Router, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user) return new Error('user with the same email already exists');

    const newUser = new User({
        email,
        password
    })

    await newUser.save();

    req.session = {
        jwt: jwt.sign({email, userId: newUser._id}, process.env.JWT_KEY!, {expiresIn: '60'})
    }

    res.status(201).send(newUser);

});

export {router as signupRouter}