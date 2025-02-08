import CartModel from "./cartSchema.js"

//create
export const saveCartItem = (item)=>{
    return CartModel(item).save();
}
//read

export const getCartItem = (userid) =>{
    return CartModel.findOne(userid)

}
//updatere
//delete