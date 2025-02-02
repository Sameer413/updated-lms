import { apiSlice } from "../api/apiSlice";

// interface courseDataType {
//     userId: string;
//     name: string;
//     description?: string;
//     categories: string;
//     price: number;
//     estimatedPrice?: number;
//     thumbnail?: {
//         path: string;
//         url: string;
//     };
//     tags: string;
//     level: string;
//     demoUrl?: string;
//     benefits: { title: string }[];
//     prerequisites: { title: string }[];
//     reviews?: object[];
//     courseData?: string[]; // Reference to `CourseData`
//     ratings?: number;
//     purchased?: number;
// }

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
            query: (courseData) => ({
                url: 'create-course',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", // ✅ Ensure correct content type
                },
                body: { ...courseData },
                credentials: 'include' as const
            }),
            // onQueryStarted(queryArgument, { }) {
            //     console.log(queryArgument)
            // },
        }),
        deleteCourse: builder.mutation({
            query: ({ courseId }: { courseId: string }) => ({
                url: `delete-course/${courseId}`,
                method: 'DELETE',
                credentials: 'include'
            }),
        }),
        GetAdminCourses: builder.query({
            query: () => ({
                url: 'admin-courses',
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: 'courses',
                method: 'GET',
                credentials: "include"
            })
        }),
        // getCourseDetails: builder.query({
        //     query: ({ id }: { id: string }) => ({
        //         url: `course/${id}`,
        //         method: 'GET',

        //     })
        // })
    })
});


export const { useGetCourseByIdQuery, useCreateCourseMutation, useDeleteCourseMutation, useGetAdminCoursesQuery, useGetAllCoursesQuery } = courseApi;