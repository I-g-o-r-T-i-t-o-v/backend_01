import { ErrorFieldType } from "../types/types";

export const generateErrorResponse = (errors: ErrorFieldType[]) => {
    return {
        "errorsMessages": errors,
    }
};