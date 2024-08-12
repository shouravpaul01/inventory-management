import { baseApi } from "../../api/baseApi";

const userApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        createFaculty:build.mutation({
            query:(data)=>({
                url:"/users/create-faculty",
                method:"POST",
                body:data
            }),
            invalidatesTags:["users","faculty-members"]
        }),
        updateUserApprovedStatus:build.mutation({
            query:(data)=>({
                url:`/users/update-approved-status/${data.userId}`,
                method:"POST",
                body:{isApproved:data.isApproved}
            }),
             invalidatesTags:["users","faculty-members"]
        }),
        updateUserActiveStatus:build.mutation({
            query:(data)=>({
                url:`/users/update-active-status/${data.userId}`,
                method:"POST",
                body:{isActive:data.isActive}
            }),
             invalidatesTags:["users","faculty-members"]
        })

    })
})

export const {useCreateFacultyMutation,useUpdateUserApprovedStatusMutation,useUpdateUserActiveStatusMutation}=userApi