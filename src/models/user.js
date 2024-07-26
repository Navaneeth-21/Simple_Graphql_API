// const { Schema, default: mongoose } = require("mongoose");
import {mongoose,Schema} from "mongoose";

const createSchema = new Schema({
    name : String,
    description : String,
    age : Number,
    CreatedAt : String
});


const model = mongoose.model('graphql' , createSchema)

export default model;
