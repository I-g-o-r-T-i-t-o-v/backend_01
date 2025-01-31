import { setDb } from "../db/db";
import { req } from "./test-helpers";
import { SETTINGS } from "../settings";
import { VideoType } from "../videos/types";

describe("get all /videos", () => {
    beforeAll(() => {
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
            title: "title777",
            author: "author777",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2025-01-30T18:26:03.060Z",
            publicationDate: "2025-01-31T18:26:03.060Z",
            availableResolutions: ["P144"]
        }
        setDb({videos: [newVideo]})

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(newVideo);
    })
})

describe("get by id /videos", () => {
    beforeAll(() => {
        setDb();
    })

    it("should return 404 for non existent video", async () => {
        const nonExistentId = "111222333444"
        await req
            .get(`${SETTINGS.PATH.VIDEOS}/${nonExistentId}`)
            .expect(404)
    })

    it("should return a video", async () => {
        const newVideo: Partial<VideoType> = {
            title: "some title",
            author: "some author",
        };

        const createVideoRes = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        const getAllVideosRes = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(getAllVideosRes.body.length).toBe(1);
        expect(getAllVideosRes.body[0]).toEqual({
            ...newVideo,
            id: expect.any(Number),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144"]
        });

        const getVideoByIdRes = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${createVideoRes.body?.id}`)
            .expect(200)

        expect(getVideoByIdRes.body).toEqual({
            ...newVideo,
            id: expect.any(Number),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144"]
        });
    })
})

describe("post /videos", () => {
    beforeAll(() => {
        setDb();
    })

    it("should get empty array", async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0);
    })

    it("should return error for empty title and author", async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: "", author: ""})
            .expect(400)

        expect(res.body.errorsMessages).toEqual([
            {
                field: "title",
                message: "empty value"
            },
            {
                field: "author",
                message: "empty value"
            }
        ]);
    })

    it("should return error for too long title and author", async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: "12345678901234567890123456789012345678901",
                author: "123456789012345678901"
            })
            .expect(400)

        expect(res.body.errorsMessages).toEqual([
            {
                field: "title",
                message: "max length is 40"
            },
            {
                field: "author",
                message: "max length is 20"
            }
        ]);
    })

    it("should return error for invalid resolutions", async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({
                title: "some title",
                author: "some author",
                availableResolutions: ["invalid", "invalid2"]
            })
            .expect(400)

        expect(res.body.errorsMessages).toEqual([
            {
                field: "availableResolutions",
                message: "invalid resolutions: invalid, invalid2"
            }
        ]);
    })

    it("should get created video", async () => {
        const newVideo: Partial<VideoType> = {
            title: "some title",
            author: "some author",
            availableResolutions: ["P144", "P240"],
        };

        const postRes = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        expect(postRes.body).toEqual({
            ...newVideo,
            id: expect.any(Number),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144", "P240"]
        });

        const getRes = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(getRes.body.length).toBe(1);
        expect(getRes.body[0]).toEqual({
            ...newVideo,
            id: expect.any(Number),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144", "P240"]
        });
    })
})

describe("put by id /videos", () => {
    let defaultVideo: VideoType = {} as VideoType;

    beforeAll(() => {
        const nowPlusOneDay = Date.now() + 86400000;
        defaultVideo = {
            id: +Date.now(),
            title: "title777",
            author: "author777",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(nowPlusOneDay).toISOString(),
            availableResolutions: ["P144"]
        }
        setDb({videos: [defaultVideo]})
    })

    it("should get default video", async () => {
        const getVideoByIdRes = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(200)

        expect(getVideoByIdRes.body).toEqual(defaultVideo);
    })

    it("should return 404 for non existent video", async () => {
        await req
            .put(`${SETTINGS.PATH.VIDEOS}/${77777777}`)
            .send({title: "", author: ""})
            .expect(404)
    })

    it("should return error for empty title and author", async () => {
        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .send({title: "", author: ""})
            .expect(400)

        expect(res.body.errorsMessages).toEqual([
            {
                field: "title",
                message: "empty value"
            },
            {
                field: "author",
                message: "empty value"
            }
        ]);
    })

    it("should return error for invalid minAgeRestriction and publicationDate", async () => {
        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .send({
                title: "t",
                author: "t",
                minAgeRestriction: 20,
                publicationDate: "date"
            })
            .expect(400)

        expect(res.body.errorsMessages).toEqual([
            {
                field: "minAgeRestriction",
                message: "max value is 18"
            },
            {
                field: "publicationDate",
                message: "date must be in ISO format"
            }
        ]);
    })

    it("should update video by new title and author", async () => {
        const updatedVideo = {title: "t", author: "t"};

        await req
            .put(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .send(updatedVideo)
            .expect(204)

        const getUpdatedVideo = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(200)

        expect(getUpdatedVideo.body).toEqual({
            ...defaultVideo,
            title: updatedVideo.title,
            author: updatedVideo.author,
        });
    })

    it("should update video by all new values", async () => {
        const updatedVideo: Partial<VideoType> = {
            title: "t",
            author: "t",
            availableResolutions: ["P144", "P240"],
            canBeDownloaded: true,
            minAgeRestriction: 15,
            publicationDate: "2030-01-30T18:26:03.060Z"
        };

        await req
            .put(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .send(updatedVideo)
            .expect(204)

        const getUpdatedVideo = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(200)

        expect(getUpdatedVideo.body).toEqual({
            ...defaultVideo,
            ...updatedVideo,
        });
    })
})

describe("delete by id /videos", () => {
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
        const getVideoByIdRes = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(200)

        expect(getVideoByIdRes.body).toEqual(defaultVideo);
    })

    it("should return 404 for non existent video", async () => {
        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/${77777777}`)
            .expect(404)
    })

    it("should return 204 for success deletion", async () => {
        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(204)

        await req
            .get(`${SETTINGS.PATH.VIDEOS}/${defaultVideo.id}`)
            .expect(404)
    })
})