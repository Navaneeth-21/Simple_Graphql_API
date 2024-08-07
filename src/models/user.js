import {mongoose,Schema} from "mongoose";
import joi from "joi";

const createSchema = new Schema({
    name : String,
    description : String,
    age : Number,
    CreatedAt : String
});

const user = mongoose.model('graphql' , createSchema)

// Validation

// define a function that validates the user details
function validateCreateUser(data) {
    const schema = joi.object({
        name : joi.string().min(3).max(20).required(),
        description : joi.string().max(40).required(),
        age : joi.number().required()
    });

    return schema.validate(data)
};


export {
    user,
    validateCreateUser
};
