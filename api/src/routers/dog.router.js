import { Router } from "express";
import handler from "express-async-handler";
import admin from '../middleware/admin.mid.js';
import dotenv from "dotenv";
import { DogModel } from "../models/dog.modal.js";
dotenv.config();

const router = Router();


router.get('/',
    handler(async (req, res) => {
        try {
            const dogs = await DogModel.find({});
            const breeds = await DogModel.distinct('breed');
            res.send({dogs, breeds});
        } catch (err) {
            res.status(404).json({
                message: err.message
            })
        }
    })
);

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

export default router;