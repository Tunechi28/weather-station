import { object, string } from "yup";

export const apiRequestSchema = object({
    query: object({
        keyword: string().required("keyword is required"),
    }),
});
