import { Request, Response } from "express";
import { createNewProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDescription: "",
        shortDescription: "",
        quantity: "",
        factory: "",
        target: ""
    }
    res.render('admin/product/create', { errors, oldData });
};
const postAdminCreateProduct = async (req: Request, res: Response) =>{
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body;

    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
       return res.render('admin/product/create', { errors, oldData });
    }
    const image = req.file?.filename ?? null;
    const product = await createNewProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect('/admin/product');
}
export { getCreateProductPage, postAdminCreateProduct };