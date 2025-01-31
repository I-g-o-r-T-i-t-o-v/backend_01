import { VideoType } from "../videos/types";
import { setDb } from "../db/db";
import { req } from "./test-helpers";
import { SETTINGS } from "../settings";

describe("delete all data", () => {
    let defaultVideo: VideoType = {} as VideoType;

    beforeAll(() => {
        defaultVideo = {
            id: +Date.now(),
            title: "title777",
            author: "author777",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2025-01-30T18:26:03.060Z",
            publicationDate: "2025-01-31T18:26:03.060Z",
            availableResolutions: ["P144"]
        }
        setDb({videos: [defaultVideo]})
    })

    it("should get default video", async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(defaultVideo);
    })

    it("should delete all data", async () => {
        await req
            .delete(`${SETTINGS.PATH.TESTING}/all-data`)
            .expect(204)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0);
    })
})