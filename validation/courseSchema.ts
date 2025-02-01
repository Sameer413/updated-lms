import { z } from 'zod'

export const courseSchema = z.object({
    name: z.string().min(2, "Title is required"),
    description: z.string().min(6, "Description is required"),
    price: z.number(),
    estimatedPrice: z.number(),
    categories: z.string(),
    tags: z.string(),
    level: z.string(),
    benefits: z.array(
        z.object({
            title: z.string().min(1, "Benefit cannot be empty")
        })
    ).min(1, "Atleast 1 benefit is required"),
    prerequisites: z.array(
        z.object({
            title: z.string().min(1, "Prerequisite cannot be empty")
        })
    ).min(1, "Atleast 1 prerequisite is required"),
    thumbnail: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File size must be less than 5MB",
        })
        .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
            message: "Only PNG, or JPEG files are allowed",
        }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

// file: z
//     .instanceof(File)
//     .refine((file) => file.size <= 5 * 1024 * 1024, {
//         message: "File size must be less than 5MB",
//     })
//     .refine((file) => ["video/mp4", "video/webm", "image/png", "image/jpeg"].includes(file.type), {
//         message: "Only MP4, WEBM, PNG, or JPEG files are allowed",
//     }),