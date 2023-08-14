import mongoose from "mongoose";

const schema = mongoose.Schema({
    handle: String,
    username: String,
    image: String,
    time: String,
    tuit: String,
    replies: Number,
    retuits: Number,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    disliked: Boolean,
}, {collection: 'tuits'});

export default schema