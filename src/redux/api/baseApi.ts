// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl="http://localhost:3000/api/v1" 
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  tagTypes:["users","faculty-members","categories","sub-categories"],
  endpoints: () => ({}),
})