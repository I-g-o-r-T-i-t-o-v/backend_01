import { VideoType } from "src/videos/types";

export type DBType = {
    videos: VideoType[];
}

export const db: DBType = {
    videos: [{
        id: 1,
        title: "title1",
        author: "author1",
        minAgeRestriction: null,
        canBeDownloaded: false,
        createdAt: "2025-01-30T18:26:03.060Z",
        publicationDate: "2025-01-31T18:26:03.060Z",
        availableResolutions: ["P144"]
    }]
}

export const setDb = async (dataset?: Partial<DBType>) => {
    return new Promise((resolve) => {
        if (!dataset) {
            db.videos = [];
            resolve("success");
        }

        db.videos = dataset?.videos || db.videos;

        resolve("success")
    })
}