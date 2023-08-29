import {Router, Response, Request, NextFunction} from 'express';
import Comment from "../../models/comment";
import Post from '../../models/post';
import { BadRequestError } from '../../../common';

const router = Router();

router.delete('/api/comment/delete/:id', async (req: Request,res: Response, next: NextFunction) => {

    const {id} = req.params;
    
    if(!id){
        return next(new BadRequestError('Post id and Comment id are required!'));
    }

    try{
        await Comment.findOneAndRemove({_id: id});        
    }catch(err){
        next(new Error('Comment cannot be updated!'));
    }

    const post = await Post.findOneAndUpdate({_id: req.currentUser?.userId}, {$pull: {posts: id}}, {new: true});

    if(!post) return next(new Error());

    res.status(200).json({success: true})
});

export {router as deleteCommentRouter};