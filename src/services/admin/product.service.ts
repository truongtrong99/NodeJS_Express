import { prisma } from "config/client";
import { TProductSchema } from "src/validation/product.schema";


const createNewProduct = async (name:string, price:number, detailDesc:string, shortDesc:string, quantity:number, factory:string, target:string, image:string | null) => {
    const product = await prisma.product.create({
         data: {
             name, price, detailDesc, shortDesc, quantity, factory, target, ...(image && { image: image })
         }
    });
    return product;
};

const getProductList = async () => {
    const products = await prisma.product.findMany();
    return products;
}
export { createNewProduct, getProductList };