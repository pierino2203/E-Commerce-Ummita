import { RequestHandler } from "express";
import Category from '../models/Category.ts'



export const getCategory : RequestHandler= async (req,res) =>  {
  const category= await Category
}