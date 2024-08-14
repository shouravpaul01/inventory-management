import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    getAllCategories: build.query({
      query: (query) => ({
        url: `/categories?search=${query.search || ""}&page=${query.page || 1}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/categories/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategoryActiveStatus: build.mutation({
      query: (data) => ({
        url: `/categories/update-active-status/${data.categoryId}?isActive=${data.isActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["categories"],
    }),
    getAllActiveCategories: build.query({
      query: (query) => ({
        url: `/categories/all-active`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useUpdateCategoryActiveStatusMutation,
  useGetAllActiveCategoriesQuery
} = categoryApi;
