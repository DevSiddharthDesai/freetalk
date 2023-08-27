import mongoose from 'mongoose';

export interface PostDoc extends mongoose.Document {
    title: string,
    content: string,
    comments: Array<any>
}

export interface PostDto {
    title: string,
    content: string,
}

export interface PostModel extends mongoose.Model<PostDoc> {
    build(dto: PostDto): PostDoc
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

postSchema.statics.build = (postDto: PostDto) => {
    return new Post(postDto);
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export default Post;