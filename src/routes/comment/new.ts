import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";
import { BadRequestError } from '../../../common';

const router = Router();

router.post('/api/comment/new/:postId', async (req: Request, res: Response, next: NextFunction) => {

   const {postId} = req.params;

   const {userName, content} = req.body; 
   
   if(!content){
    return next(new BadRequestError('content is required!'));
   }

   const newComment = new Comment({
    userName: userName ? userName : 'anonymous',
    content
   });

   await newComment.save();

   const updatePost = await Post.findOneAndUpdate({
    _id: postId}, {$push: {comments: newComment}}, {new: true});

    res.status(201).send(newComment)

});

export {router as newCommentRouter}