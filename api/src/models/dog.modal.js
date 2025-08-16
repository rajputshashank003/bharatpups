import { model, Schema } from 'mongoose';

export const dogSchema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        price: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ['Male', 'Female'], required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

export const DogModel = model('dog', dogSchema);
