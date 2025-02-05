import { getAllProducts } from "../product/productModel.js";
import suscriberModel from "./suscriberSchema.js"
export const createSuscriber = (email)=>{
    const emailobj={
        email:email
    }
    return suscriberModel(emailobj).save();
}


export const  getAllSuscribers = ()=>{
    return suscriberModel.find({});
}