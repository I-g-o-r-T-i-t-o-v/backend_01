import { Router } from "express";

import { db } from "../db/db";
import {
    CreateVideoRequestType,
    CreateVideoResponseType,
    GetVideoRequestType,
    GetVideoResponseType,
} from "./types";

export const videoRouter = Router();

const videoController = {
    getVideos: (req: GetVideoRequestType, res: GetVideoResponseType) => {
        const videos = db.videos;

        res
            .status(200)
            .json(videos);
    },
    createVideo: (req: CreateVideoRequestType, res: CreateVideoResponseType) => {
        {
            const title = req.body.title;
            const availableResolutions = req.body.availableResolutions;

            const errorsArray: Array<{ field: string; message: string }> = [];

            // titleFieldValidator(title, errorsArray);
            // availableResolutionsFieldValidator(availableResolutions, errorsArray);

            if (errorsArray.length > 0) {
                // const errors_ = errorResponse(errorsArray);
                // res.status(400).send(errors_)
                res.status(400)
            }

            const video = {
                ...req.body,
                id: Date.now() + Math.random(),
            }

            db.videos = [...db.videos, video];
            res.status(201).json(video);
        }
    }
}

videoRouter.get("/", videoController.getVideos);
// videoRouter.get("/:id", videoController.getVideosById);
videoRouter.post("/", videoController.createVideo);