import { Request, Response } from "express";
import { createNewProduct, deleteProductById, getProductById, updateProduct } from "services/admin/product.service";
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

const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const errors = [];
    // Assuming you have a function to get product by ID
    const oldData = await getProductById(id);
    res.render('admin/product/detail', { oldData, errors });
}

const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body;

    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render('admin/product/detail', { errors, oldData });
    }
    const image = req.file?.filename ?? null;
    const product = await updateProduct(id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    return res.redirect('/admin/product');
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProductById(id);
    return res.redirect('/admin/product');
}

export { getCreateProductPage, postAdminCreateProduct, postUpdateProduct, getViewProduct, deleteProduct };