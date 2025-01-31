import { Router, Request,Response  } from "express";

import { setDb } from "../db/db";

export const testingRouter = Router();

const testingController = {
    deleteAllData: async (req: Request, res: Response) => {
        await setDb();
        res.sendStatus(204)
    },
}

testingRouter.delete("/all-data", testingController.deleteAllData);