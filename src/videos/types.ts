import { Request, Response } from "express";

export type VideoType = { id: number, title: string };

export type GetVideoRequestType = Request;
export type GetVideoResponseType = Response<VideoType[]>;

export type CreateVideoRequestType = Request<{}, {}, {
    title: string;
    availableResolutions: string
}>;
export type CreateVideoResponseType = Response<VideoType>;