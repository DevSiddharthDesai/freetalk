import {Router, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import {authenticationService} from '../../../common';

const router = Router();

router.post('/api/signin', async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) return new Error('wrong credentials!') as CustomError;

    const isEqual = await authenticationService.pwdCompare(user.password, password);

    if(!isEqual) return next(new Error('Wrong Credentials'));

    const token = jwt.sign({
        email,
        userId: user._id
    }, process.env.JWT_KEY!, {expiresIn: '60'});
    
    req.session = {jwt: token};

    res.status(200).send(user);
});

export {router as signinRouter}

