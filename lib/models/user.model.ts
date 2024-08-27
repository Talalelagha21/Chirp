import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    image: String, 
    bio: String,
    chirps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chirp'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;