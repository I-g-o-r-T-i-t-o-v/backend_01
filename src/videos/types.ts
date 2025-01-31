import { Request, Response } from "express";
import { ErrorResponseType } from "../types/types";

// Data types
export type VideoType = {
    id?: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt?: string;
    publicationDate?: string;
    availableResolutions?: AvailableResolutionsType[];
};

export type AvailableResolutionsType =
    "P144"
    | "P240"
    | "P360"
    | "P480"
    | "P720"
    | "P1080"
    | "P1440"
    | "P2160";


// Request/Response types
export type GetVideosRequestType = Request;
export type GetVideosResponseType = Response<VideoType[]>;


export type GetVideoByIdRequestType = Request<{ id: string }>;
export type GetVideoByIdResponseType = Response<VideoType | number>;


export type CreateVideoRequestType = Request<{}, {}, {
    title: string;
    author: "string";
    availableResolutions?: AvailableResolutionsType[]
}>;
export type CreateVideoResponseType = Response<VideoType | ErrorResponseType>;


export type UpdateVideoRequestType = Request<
    { id: string },
    {},
    {
        title: string;
        author: "string";
        availableResolutions?: AvailableResolutionsType[];
        canBeDownloaded: boolean;
        minAgeRestriction: number;
        publicationDate: string;
    }>;
export type UpdateVideoResponseType = Response<{} | ErrorResponseType>;


export type DeleteVideoByIdRequestType = Request<{ id: string }>;
export type DeleteVideosByIdResponseType = Response<{}>;