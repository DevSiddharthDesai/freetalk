import express from 'express';
import { requireAuth } from '../../common';
import {addNewPost, getAllPosts, updatePost, deletePost} from './post.controller';

const router = express.Router();

router.route('/addPost').post(addNewPost, requireAuth);
router.route('/getPosts').get(getAllPosts);
router.route('/updatePost').put(updatePost, requireAuth);
router.route('/deletePost').delete(deletePost, requireAuth);

export {router as PostRouter}




