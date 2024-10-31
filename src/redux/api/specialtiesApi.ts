import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),

    getAllSpecialties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/specialties`,
          method: "GET",
          params: arg
        }
      }, transformErrorResponse: (response, meta: IMeta) => {
        return {
          exams: response,
          meta
        }
      },
      providesTags: [tagTypes.specialties],
    }),

    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtiesQuery,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
