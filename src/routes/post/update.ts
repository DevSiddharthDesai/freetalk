import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
     
    const {content, title} = req.body;

    if(!id){
        const error = new Error('Post id is required') as CustomError;
        error.status = 400;
        next(error);
    }

    var updatedPost;

    try{
        updatedPost = await Post.findByIdAndUpdate({_id: id}, {$set: {content, title}}, {new: true});
    }catch(err){
        const error = new Error('post cannot be updated!') as CustomError;
        error.status = 400;
    }

    res.status(200).send(updatedPost);
});

export {router as updatePostRouter}
