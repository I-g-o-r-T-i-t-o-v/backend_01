import { setDb } from "../db/db";
import { req } from "./test-helpers";
import { SETTINGS } from "../settings";
import { VideoType } from "../videos/types";

describe("get /videos", ()=>{
    beforeAll(()=>{
        setDb();
    })

    it("should get empty array", async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0);
    })

    it("should get not empty array", async () => {
        const newVideo: VideoType = {
            id: Date.now() + Math.random(),
            title: "title777"
        }
        setDb({videos: [newVideo]})

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(newVideo);
    })
})