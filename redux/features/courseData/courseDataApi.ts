import { apiSlice } from "../api/apiSlice";

export const courseDataApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        deleteCourseData: builder.mutation({
            query: () => ({
                url: 'course/retrieve-data/:courseDataId'
            })
        }),
        addCourseData: builder.mutation({
            query: () => ({
                url: 'course/add-data/:id'
            })
        }),
    })
});

export const { useDeleteCourseDataMutation, useAddCourseDataMutation } = courseDataApi