export type ErrorFieldType = {
    field: string;
    message: string;
};

export type ErrorResponseType = {
    errorsMessages: ErrorFieldType[]
};