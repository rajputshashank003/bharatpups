import { Router } from "express";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import dotenv from "dotenv";
import { DogModel } from "../models/dog.modal.js";
import { ReviewModel } from "../models/reviews.modal.js";
import { database_updated } from "./utils/catche_utils.js";
dotenv.config();

const router = Router();


router.post('/',
    admin,
    handler(async (req, res) => {
        const {
            name,
            breed,
            age,
            gender,
            description,
            image,
            image_id
        } = req.body;
        const dog = new DogModel({
            name,
            breed,
            age,
            gender,
            description,
            image,
            image_id
        });

        await dog.save();
        await database_updated();
        res.send(dog);
    })
);

router.post('/review',
    admin,
    handler(async (req, res) => {
        try {
            const {
                comment,
                rating,
                image,
                image_id,
                dog
            } = req.body;

            const dog_review = new ReviewModel({
                comment,
                rating,
                image,
                image_id,
                dog,
                created_by: {
                    id: req?.user?.id,
                    name: req?.user?.name,
                },
            });

            await dog_review.save();
            await database_updated();
            res.send(dog_review);
        } catch (err) {
            console.log(err.message);
        }
    })
);

export default router;