import express from 'express';
import cors from 'cors';

import { SETTINGS } from "./settings";
import { videoRouter } from "./videos/videoController";
import { testingRouter } from "./__tests__/testingController";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.VIDEOS, videoRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);
