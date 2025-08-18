import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getCreateProductPage = async (req: Request, res: Response) => {
    res.render('admin/product/create', { title: 'Create Product' });
};
const postAdminCreateProduct = async (req: Request, res: Response) =>{
    const { name } = req.body as TProductSchema;

    try {
        const result = ProductSchema.parse(req.body);
        console.log('Product created successfully:', result);
    } catch (error) {
        console.log('Error creating product:', error);
    }
    return res.redirect('/admin/product');
}
export { getCreateProductPage, postAdminCreateProduct };