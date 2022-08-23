import { Schema, model} from "mongoose"

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: Array, required: true},
    phone: {type: Number, required: true}
})

export const User = model("user", userSchema)