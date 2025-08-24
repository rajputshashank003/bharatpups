import { Router } from "express";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import auth from '../middleware/Auth.mid.js';
import dotenv from "dotenv";
import { DogModel } from "../models/dog.modal.js";
import { userModel } from "../models/user.model.js";
import { configCloudinary } from "../config/cloudinary.config.js";
import { ReviewModel } from "../models/reviews.modal.js";
dotenv.config();

const router = Router();

router.get('/',
    handler(async (req, res) => {
        try {
            const { breed, search } = req.query;
            let filter = {};

            if (breed) {
                filter.breed = breed;
            }

            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { breed: { $regex: search, $options: 'i' } }
                ];
            }

            const dogs = await DogModel.find(filter);
            const breeds = await DogModel.distinct('breed');

            res.send({ dogs, breeds });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })
);

router.delete('/:id',
    admin,
    handler ( async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const cloudinary = configCloudinary();
        const deletedDog = await DogModel.findByIdAndDelete(id);
        if (!deletedDog) {
            return res.status(404).json({ message: "Dog not found" });
        }
        console.log(deletedDog);

        if (deletedDog.image_id) {
            await cloudinary.uploader.destroy(deletedDog.image_id);
        }

        res.json({
            message: "Dog deleted successfully",
            deletedDog
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

router.get('/breeds',
    handler(async (req, res) => {
        try {
            const breeds = await DogModel.distinct('breed');
            res.send(breeds);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    })
);

router.post("/add/favorite",
    handler(async (req, res) => {
        const { foodId, userId } = req.body;  // coming from frontend

        const dog = await DogModel.findOne({ _id: foodId });
        if (!dog) {
            return res.status(404).json({
                message: 'Dog not found!'
            });
        }

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { favourite_dogs: foodId } }, // $addToSet = avoids duplicates
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        const updatedDog = await DogModel.findByIdAndUpdate(
            foodId,
            { $inc: { favorite_count: 1 } },
            { returnDocument: "after" }
        );

        res.json({
            message: 'Dog added to favourites successfully',
            favourite_dogs: user.favourite_dogs,
            updatedDog
        });
    })
);

router.delete("/remove/favorite",
    handler(async (req, res) => {
        const { foodId, userId } = req.query;  // DELETE usually sends params/query

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { favourite_dogs: foodId } }, // $pull = removes from array
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        const updatedDog = await DogModel.findByIdAndUpdate(
            foodId,
            { $inc: { favorite_count: -1 } },
            { returnDocument: "after" }
        );

        res.json({
            message: 'Dog removed from favourites successfully',
            favourite_dogs: user.favourite_dogs,
            favouriteCount: updatedDog
        });
    })
);

router.get("/favorites",
    auth,
    handler(async (req, res) => {
        const user_email = req.user.email;
        const user = await userModel.findOne({ email: user_email }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const favouriteDogs = await DogModel.find({
            _id: { $in: user.favourite_dogs },
        }).lean();

        const breeds = [...new Set(favouriteDogs.map(dog => dog.breed))];

        res.send({
            dogs: favouriteDogs,
            breeds: breeds,
        });
    })
);

router.get("/favorites/ids",
    auth,
    handler(async (req, res) => {
        const user_email = req.user.email;
        const user = await userModel.findOne({ email: user_email }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.send({
            favoriteDogIds: user.favourite_dogs || []
        });
    })
);

router.get("/id/:id",
    handler(async (req, res) => {
        const { id } = req.params;

        const dog = await DogModel.findById(id).lean();
        const reviews = await ReviewModel.find({ dog: id });

        if (!dog || !reviews) {
            return res.status(404).json({ message: "Data not found!" });
        }
        res.send({dog, reviews});
    })
);

router.get('/review/:dog_id',
    handler(async (req, res) => {
        const reviews = await ReviewModel.find({ dog: dogId });
        if (!reviews) {
            return res.status(404).json({ message: "Review not found!" });
        }
        res.send(reviews);
    })
);


export default router;