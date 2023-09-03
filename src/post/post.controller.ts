import { Router, Request, Response, NextFunction } from 'express'
import Post from "../models/post";
import { User, UserDoc } from "../models/user";
import { BadRequestError } from '../../common';
import { addPostService, getAllPostsService } from './post.services';

export const addNewPost = async (req: Request, res: Response, next: NextFunction) => {
    
    const {title, content} = req.body;

    const newPost = addPostService({title, content, userId: req.currentUser!.userId})
 
    res.status(201).send(newPost);
 };

 export const getAllPosts = async (req: Request,res: Response, next: NextFunction) => {

   const {id} = req.body;

   const posts = await getAllPostsService(id);

   res.status(200).send(posts);

};



export const updatePost = async (req: Request, res: Response, next: NextFunction) => {

   const { id } = req.params;
    
   const {content, title} = req.body;

   if(!id){
       return next(new BadRequestError('Post id is required'));
   }

   var updatedPost;

   try{
       updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: {content, title}}, {new: true});
   }catch(err){
       const error = new Error('post cannot be updated!') as CustomError;
       error.status = 400;
   }

   res.status(200).send(updatedPost);
};

export const deletePost = async (req: Request,res: Response, next: NextFunction) => {

   const {id} = req.params;
   
   if(!id){
       return next(new BadRequestError('post id is required!'));
   }

   try{
       await Post.findOneAndRemove({_id: id});   

   }catch(err){
       next(new Error('post cannot be updated!'));
   }

   let user: UserDoc | null;

   user = await User.findOneAndUpdate({_id: req.currentUser?.userId}, {$pull: {posts: id}}, {new: true});

   if(!user) return next(new Error());

   res.status(200).json(user);
};


