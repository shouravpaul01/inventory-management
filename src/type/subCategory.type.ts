import { TCategory } from "./category.type";


export type TSubCategory = {
    _id?: string ;
    name: string ;
    category: TCategory ;
    code: string ;
    description?: string ;
    isActive?:boolean;
  };
  export type TSubCategoryInputFields = {
    _id?: string ;
    name: string ;
    category: string ;
    code: string ;
    description?: string ;
  };