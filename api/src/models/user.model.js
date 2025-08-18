import mongoose from "mongoose";

export const userSchema = new mongoose.Schema( 
    {
        name : { type : String , required : true},
        email : { type : String , required : true , unique : true },
        isAdmin : { type : Boolean , default : false} ,
        favourite_dogs: { type: [String], ref: "dog", default: [] },
        image: { type: String, default: ''}
    },
    {
        timestamps : true ,
        toJSON: {
            virtuals : true ,
        },
        toObject : {
            virtuals : true ,
        },
    }
);

export const userModel = mongoose.model("user", userSchema);    