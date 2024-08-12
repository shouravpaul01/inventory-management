import { baseApi } from "../../api/baseApi";

const facultyApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
       
        getAllFaculities:build.query({
            query:(query)=>({
                url:`/faculty-members?search=${query.search || ""}&page=${query.page || 1}`,
                method:"GET",
            }),
            providesTags:["users","faculty-members"]
        })

    })
})

export const {useGetAllFaculitiesQuery}=facultyApi