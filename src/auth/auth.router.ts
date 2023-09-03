import express from 'express';
import {SignIn, SignUp, CurrentUser} from './auth.controller';

const router = express.Router();

router.route('/signup').post(SignUp);
router.route('/signin').post(SignIn);
router.route('/current-user').get(CurrentUser);

export {router as AuthRouter}