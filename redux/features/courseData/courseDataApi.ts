import { apiSlice } from "../api/apiSlice";

export const courseDataApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        deleteCourseData: builder.mutation({
            query: ({ courseDataId }: { courseDataId: string }) => ({
                url: `course/retrieve-data/${courseDataId}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        getAllCourseData: builder.query({
            query: ({ courseId }: { courseId: string }) => ({
                url: `course/retrieve-all-data/${courseId}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        addCourseData: builder.mutation({
            query: ({ courseId, description, path, sectionTitle, title, videoLength, videoUrl, }: { courseId: string, title: string, description: string, videoUrl: string, videoLength: string, sectionTitle: string, path: string }) => ({
                url: `course/lecture/add-data/${courseId}`,
                method: "POST",
                body: {
                    title: title,
                    description: description,
                    videoUrl: videoUrl,
                    videoSection: sectionTitle,
                    videoLength: videoLength,
                    videoPath: path,
                },
                headers: {
                    "Content-Type": "application/json", // Ensure correct headers
                },
                credentials: 'include'
            })
        }),
        retrieveCourseData: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `course/retrieve-data/${id}`,
                method: 'GET',
                credentials: 'include'
            })
        })
    })
});

export const { useDeleteCourseDataMutation, useAddCourseDataMutation, useGetAllCourseDataQuery, useLazyRetrieveCourseDataQuery } = courseDataApi