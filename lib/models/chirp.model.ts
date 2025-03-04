import mongoose, { mongo } from "mongoose";

const chirpSchema = new mongoose.Schema({
    text: {type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chirp'
        }
    ]
})

const Chirp = mongoose.models.Chirp || mongoose.model('Chirp', chirpSchema)

export default Chirp;