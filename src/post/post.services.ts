import Post from "../models/post";
import { User } from "../models/user";
import { BadRequestError } from '../../common';
import { AddPostDto, getPostDto } from "./post.types";

export const addPostService = async (addPostDto:AddPostDto) => {

    const {title, content, userId} = addPostDto;
    
    if(title || content ){
        return new BadRequestError('title and content are required!');
    }

    const newPost = Post.build(addPostDto);

    await newPost.save();

    await User.findOneAndUpdate({_id: userId}, {$push: {posts: newPost._id}});

    return newPost;
}

export const getAllPostsService = async (id : getPostDto) => {

    if(!id){
        const allPosts = await Post.find();
        return allPosts;
    }

   const post = await Post.findOne({_id: id});
   return post;
}



