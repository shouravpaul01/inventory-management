import { baseApi } from "../../api/baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubCategory: build.mutation({
      query: (data) => ({
        url: "/sub-categories/create-sub-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub-categories"],
    }),
    getAllSubCategories: build.query({
      query: (query) => ({
        url: `/sub-categories?search=${query.search || ""}&page=${query.page || 1}`,
        method: "GET",
      }),
      providesTags: ["sub-categories"],
    }),
    
    updateSubCategory: build.mutation({
      query: (data) => ({
        url: `/sub-categories/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["sub-categories"],
    }),
    updateSubCategoryActiveStatus: build.mutation({
      query: (data) => ({
        url: `/sub-categories/update-active-status/${data.subCategoryId}?isActive=${data.isActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["sub-categories"],
    }),
    getAllActiveSubCategories: build.query({
      query: (query) => ({
        url: `/sub-categories/all-active`,
        method: "GET",
      }),
      providesTags: ["sub-categories"],
    }),
  }),
});

export const {
useCreateSubCategoryMutation,
useGetAllSubCategoriesQuery,
useUpdateSubCategoryMutation,
useUpdateSubCategoryActiveStatusMutation,
useGetAllActiveSubCategoriesQuery
} = subCategoryApi;
