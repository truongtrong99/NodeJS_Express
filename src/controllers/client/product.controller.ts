import { Request, Response } from "express";

const getProductPage = (req:Request, res:Response) => {
    res.render('client/product/detail.ejs');
}

export {
    getProductPage
}
