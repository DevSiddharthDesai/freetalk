import { authenticationService } from "../../common";
import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    posts?: Array<any>
}

export interface CreateUserDto {
    email: string,
    password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {
    build(dto: CreateUserDto): UserDoc
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password') || this.isNew){
        const hashedPwd = authenticationService.pwdToHash(this.get('password'));
        this.set('password', hashedPwd);
    }
});

userSchema.statics.build = (createUserDto: CreateUserDto) => { return new User(createUserDto)}

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);