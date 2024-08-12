

export type TUser={
    _id?:string,
    id:string,
    password:string,
    needChangePassword?:boolean,
    userAccess:string[],
    isApproved:boolean,
    isActive:boolean,
    isDeleted:boolean
}