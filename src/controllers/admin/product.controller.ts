import { Request, Response } from "express";

const getCreateProductPage = async (req: Request, res: Response) => {
    res.render('admin/product/create', { title: 'Create Product' });
};
const postAdminCreateProduct = async (req: Request, res: Response) =>{
    return res.redirect('/admin/product');
}
export { getCreateProductPage, postAdminCreateProduct };