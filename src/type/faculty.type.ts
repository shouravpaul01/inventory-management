import { TUser } from "./user.type";

export type TPublication ={
    title: string;
    journal: string;
    year: number;
    authors: string[]; 
    doi?: string; 
  }

export  type TFaculty ={
    id?: string; 
    user?:TUser;
    name: string;
    image?:string;
    designation: string; 
    department?: string;
    roomNo:number;
    email: string;
    phone?: string; 
    researchInterests?: string[]; 
    coursesTaught?: string[]; 
    publications?: TPublication[]; 
  }