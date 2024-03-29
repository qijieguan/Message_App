const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentObjSchema = new Schema(
    {
        user_profile: { type: String, trim: true },
        user_name: { type: String, trim: true },
        comment: { type: String, trim: true },
        replies: [{ 
            user_profile: { type: String, trim: true },
            user_name: { type: String, trim: true },
            reply: { type: String, trim: true },
        }],   
    },
    {
        timestamps: true
    }
);

const postSchema = new Schema(
    {
        poster_id: { type: String, required: true, trim: true },
        poster_image: { type: String, required: true, trim: true },
        poster_name: { type: String, required: true, trim: true },
        post: { 
            primary_text: { type: String, trim: true },
            primary_image: { type: String, trim: true },
            likes: [{ type: String, trim: true }],
            comments: [commentObjSchema] 
        },      
    },
    {
        timestamps: true,
    }
);


const Post = mongoose.model('Post', postSchema);
module.exports = Post;