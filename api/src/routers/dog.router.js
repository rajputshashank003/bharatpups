import { Router } from "express";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import auth from '../middleware/Auth.mid.js';
import dotenv from "dotenv";
import { DogModel } from "../models/dog.modal.js";
import { userModel } from "../models/user.model.js";
import { configCloudinary } from "../config/cloudinary.config.js";
import { ReviewModel } from "../models/reviews.modal.js";
import { cache_state, database_updated } from "./utils/catche_utils.js";
dotenv.config();

const router = Router();

router.get('/',
    handler(async (req, res) => {
        try {
            const { breed, search } = req.query;
            if (!cache_state.catched_dogs || cache_state.is_data_updated) {
                const dogsFromDb = await DogModel.find({});
                const breedsFromDb = await DogModel.distinct('breed');

                cache_state.catched_dogs = { dogs: dogsFromDb, breeds: breedsFromDb };
                cache_state.is_data_updated = false; 
            }

            let { dogs, breeds } = cache_state.catched_dogs;
            if (breed) {
                dogs = dogs?.filter(d => d?.breed === breed);
            }

            if (search) {
                const regex = new RegExp(search, "i");
                dogs = dogs?.filter(d => regex?.test(d?.name) || regex.test(d?.breed));
            }
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
        const cloudinary = configCloudinary();
        const deletedDog = await DogModel.findByIdAndDelete(id);
        if (!deletedDog) {
            return res.status(404).json({ message: "Dog not found" });
        }

        if (deletedDog.image_id) {
            await cloudinary.uploader.destroy(deletedDog.image_id);
        }
        database_updated();
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
            if (!cache_state.catched_dogs || cache_state.is_data_updated) {
                const dogsFromDb = await DogModel.find({});
                const breedsFromDb = await DogModel.distinct('breed');
                cache_state.catched_dogs = { dogs: dogsFromDb, breeds: breedsFromDb };
                cache_state.is_data_updated = false;
            }

            const { breeds } = cache_state.catched_dogs;
            res.send(breeds);
        } catch (err) {
            res.status(404).json({
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
        const reviews = await ReviewModel.find({ dog: id }).sort({ createdAt: -1 });

        if (!dog || !reviews) {
            return res.status(404).json({ message: "Data not found!" });
        }
        res.send({dog, reviews});
    })
);

router.get('/review/:id',
    handler(async (req, res) => {
        const { id } = req.params;
        const reviews = await ReviewModel.find({ dog: id }).sort({ createdAt: -1 });
        if (!reviews) {
            return res.status(404).json({ message: "Review not found!" });
        }
        res.send(reviews);
    })
);


export default router;