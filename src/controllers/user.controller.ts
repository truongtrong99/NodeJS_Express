import { Request, Response } from 'express';
import { getProducts } from 'services/client/item.service';
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();
    return res.render('client/home/show.ejs', { products: products });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles: roles });
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const avatar = req.file?.filename || null;
    const response = await handleCreateUser(fullName, username, address, phone, avatar, role);

    return res.redirect('/admin/user');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const response = await handleDeleteUser(id);
    return res.redirect('/admin/user');
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Here you would typically fetch the user details from the database
    // For now, we will just send a placeholder response
    const user = await getUserById(id);
    const roles = await getAllRoles();
    res.render('admin/user/detail.ejs', { user: user, id: id, roles: roles });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, username, phone, role, address } = req.body;
    const avatar = req.file?.filename ?? undefined;
    const response = await handleUpdateUser(id, fullName, phone, role, address, avatar);
    return res.redirect('/admin/user');
}
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }