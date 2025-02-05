import productModel from "./productSchema.js"

// create product 
export const saveProduct = (product) => {
    return productModel(product).save();
};
// get product
export const getAllProducts = (product) => {
    return productModel.find({});
}
// update product
export const updateProduct = (id, itemToBeUpdated) => {
    return productModel.findByIdAndUpdate(id, itemToBeUpdated, {new:true})
}

// delete product
export const deleteProduct = (id) =>{
    return productModel.findByIdAndDelete(id);
}
