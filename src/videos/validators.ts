import { ErrorFieldType } from "../types/types";
import { AvailableResolutionsType } from "./types";
import { AVAILABLE_RESOLUTIONS } from "./videoController";

export const stringFieldValidator = (
    {
        fieldName,
        value,
        maxLength,
        errorsArray
    }: {
        fieldName: string;
        value: string;
        maxLength: number;
        errorsArray: ErrorFieldType[]
    }): void => {
    if (!value || value === "null" || value.trim().length < 1) {
        errorsArray.push({
            field: fieldName,
            message: "empty value"
        })
    }

    if (typeof value !== "string") {
        errorsArray.push({
            field: fieldName,
            message: "value type must string"
        })
    }

    if (value.trim().length > maxLength) {
        errorsArray.push({
            field: fieldName,
            message: `max length is ${maxLength}`
        })
    }
}

export const numberFieldValidator = (
    {
        fieldName,
        value,
        max,
        min,
        errorsArray
    }: {
        fieldName: string;
        value: number;
        max: number;
        min: number;
        errorsArray: ErrorFieldType[]
    }): void => {
    if(!value && value !== 0){
        return;
    }

    if (value > max) {
        errorsArray.push({
            field: fieldName,
            message: `max value is ${max}`
        })
    }

    if (value < min) {
        errorsArray.push({
            field: fieldName,
            message: `min value is ${min}`
        })
    }
}

export const isoDateFieldValidator = (
    {
        fieldName,
        value,
        errorsArray
    }: {
        fieldName: string;
        value: string;
        errorsArray: ErrorFieldType[]
    }): void => {
    if(!value){
        return
    }

    const timestamp = Date.parse(value);
    if (isNaN(timestamp) == true || ((new Date(value)).toISOString() !== value)) {
        errorsArray.push({
            field: fieldName,
            message: "date must be in ISO format"
        })
    }
}

export const availableResolutionsFieldValidator = (
    {
        availableResolutions,
        errorsArray
    }: {
        availableResolutions?: AvailableResolutionsType[];
        errorsArray: ErrorFieldType[]
    }): void => {
    if (!availableResolutions?.length) {
        return;
    }

    const invalidResolutions: string[] = [];

    availableResolutions.forEach((resolution) => {
        if (!AVAILABLE_RESOLUTIONS.includes(resolution)) {
            invalidResolutions.push(resolution);
        }
    })

    if (invalidResolutions.length) {
        errorsArray.push({
            field: "availableResolutions",
            message: `invalid resolutions: ${invalidResolutions.join(", ")}`
        })
    }
}
