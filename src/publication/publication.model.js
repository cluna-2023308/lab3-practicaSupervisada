import { Schema, model } from "mongoose";

const publicationSchema = Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength: [25, "Title cannot exceed 25 characters"]
    },
    text:{
        type: String,
        required: [true, "Text is required"],
        maxLength: [100, "Text cannot exceed 100 characters"]
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }],    
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Publication", publicationSchema)