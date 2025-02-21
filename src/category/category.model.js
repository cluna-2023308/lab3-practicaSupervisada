import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    typeCategory:{
        type: String,
        required: true,
        enum: ["URGENT_CATEGORY", "OPINION_CATEGORY", "TBT_CATEGORY", "SENTIMENT_CATEGORY", 
            "TOPIC_CATEGORY", "REACTION_CATEGORY", "ENTERTAINMENT_CATEGORY", "SPORT_CATEGORY",
             "VIDEOGAME_CATEGORY", "MUSIC_CATEGORY", "NEWS_CATEGORIA", "TENDENCY_CATEGORY"]
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", categorySchema)