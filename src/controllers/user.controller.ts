import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render('home',{
        users: users
    })
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user')
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    console.log('>>> Check data: ', fullName, email, address);
    await handleCreateUser(fullName, email, address);
    return res.redirect('/');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    console.log('>>> Check delete user with id: ', userId);
    // Here you would typically call a service to handle the deletion
    // await handleDeleteUser(userId);
    return res.redirect('/');
}
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser }