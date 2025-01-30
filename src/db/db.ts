import { VideoType } from "src/videos/types";

export type DBType = {
    videos: VideoType[];
}

export const db: DBType = {
    videos: []
}

export const setDb = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = [];
        return;
    }

    db.videos = dataset.videos || db.videos;
}