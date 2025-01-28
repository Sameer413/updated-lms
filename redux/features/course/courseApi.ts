import { apiSlice } from "../api/apiSlice";

interface courseDataType {
    userId: string;
    name: string;
    description?: string;
    categories: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: {
        path: string;
        url: string;
    };
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: object[];
    courseData: string[]; // Reference to `CourseData`
    ratings?: number;
    purchased?: number;
}

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseById: builder.query({
            query: ({ courseId }: { courseId: string }) => ({
                url: `course/${courseId}`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        createCourse: builder.mutation({
            query: ({ name,
                description,
                categories,
                price,
                estimatedPrice,
                tags,
                benefits,
                prerequisites,
                thumbnail
            }: courseDataType) => ({
                url: 'create-course',
                method: 'POST',
                body: {
                    name,
                    description,
                    categories,
                    price,
                    estimatedPrice,
                    tags,
                    benefits,
                    prerequisites,
                    thumbnail,
                },
                credentials: 'include' as const
            })
        }),
        deleteCourse: builder.mutation({
            query: ({ name,
                description,
                categories,
                price,
                estimatedPrice,
                tags,
                benefits,
                prerequisites,
                thumbnail
            }: courseDataType) => ({
                url: 'create-course',
                method: 'POST',
                body: {
                    name,
                    description,
                    categories,
                    price,
                    estimatedPrice,
                    tags,
                    benefits,
                    prerequisites,
                    thumbnail,
                },
                credentials: 'include' as const
            })
        }),
        GetAdminCourses: builder.query({
            query: ({ name,
                description,
                categories,
                price,
                estimatedPrice,
                tags,
                benefits,
                prerequisites,
                thumbnail
            }: courseDataType) => ({
                url: 'create-course',
                method: 'POST',
                body: {
                    name,
                    description,
                    categories,
                    price,
                    estimatedPrice,
                    tags,
                    benefits,
                    prerequisites,
                    thumbnail,
                },
                credentials: 'include' as const
            })
        }),
        getAllCourses: builder.query({
            query: ({ name,
                description,
                categories,
                price,
                estimatedPrice,
                tags,
                benefits,
                prerequisites,
                thumbnail
            }: courseDataType) => ({
                url: 'create-course',
                method: 'POST',
                body: {
                    name,
                    description,
                    categories,
                    price,
                    estimatedPrice,
                    tags,
                    benefits,
                    prerequisites,
                    thumbnail,
                },
                credentials: 'include' as const
            })
        })
    }),
});

export const { useGetCourseByIdQuery, useCreateCourseMutation, useDeleteCourseMutation, useGetAdminCoursesQuery, useGetAllCoursesQuery } = courseApi;