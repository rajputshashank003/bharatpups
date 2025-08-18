import { Router } from "express";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import dotenv from "dotenv";
import { DogModel } from "../models/dog.modal.js";
dotenv.config();

const router = Router();


router.post('/',
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
        console.log(req.body);
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
        console.log(dog);
        res.send(dog);
    })
);

export default router;