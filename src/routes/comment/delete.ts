import {Router, Response, Request, NextFunction} from 'express';
import Comment from "../../models/comment";

const router = Router();

router.delete('/api/comment/delete/:id', async (req: Request,res: Response, next: NextFunction) => {

    const {id} = req.params;
    
    if(!id){
        const error = new Error('Comment id is required!') as CustomError;
        error.status = 400;
        next(error);
    }

    try{
        await Comment.findOneAndRemove({_id: id});        
    }catch(err){
        next(new Error('Comment cannot be updated!'));
    }

    res.status(200).json({success: true})
});

export {router as deleteCommentRouter};