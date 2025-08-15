import { Request, Response } from 'express';
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, handleUpdateUser } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render('home',{
        users: users
    })
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles: roles });
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const avatar = req.file?.filename || null;
    const response = await handleCreateUser(fullName, username, address, phone, avatar);

    return res.redirect('/admin/user');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const response = await handleDeleteUser(id);
    return res.redirect('/');
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Here you would typically fetch the user details from the database
    // For now, we will just send a placeholder response
    const user = await getUserById(id);
    res.render('view-user', { user: user, id: id });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    const response = await handleUpdateUser(id, fullName, email, address);
    return res.redirect('/');
}
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }