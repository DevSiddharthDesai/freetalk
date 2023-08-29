import mongoose from 'mongoose';

export interface CommentDoc extends mongoose.Document {
    userName?: string,
    content: string,
}

export interface CommentDto {
    content: string,
}

export interface CommentModel extends mongoose.Model<CommentDoc> {
    build(dto: CommentDto): CommentDoc
}

const commentSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    content: {
        type: String,
        require: true
    }
});

commentSchema.statics.build = (commentDto: CommentDto) => {
    return new Comment(commentDto);
}

const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema);

export default Comment;