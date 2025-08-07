import getConnection from "config/db";
import { PrismaClient } from '@prisma/client'
import { prisma } from "config/client";


const handleCreateUser = async (fullName: string, email: string, address: string) => {

    const newUser = await prisma.user.create({
        data:{
            name: fullName,
            email: email,
            address: address
        }
    })
    return newUser;
};

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

const handleDeleteUser = async (userId: string) => {
    const connection = await getConnection();
    try {
        const [result, fields] = await connection.execute(
            'DELETE FROM `users` WHERE `id` = ?',
            [userId]
        );
        return result;
    } catch (error) {
        console.error('Error deleting user:', error);
        return null;
    }
}

const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +userId }
    });
    return user;
}

const handleUpdateUser = async (userId: string, fullName: string, email: string, address: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: +userId },
        data: {
            name: fullName,
            email: email,
            address: address
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser,getUserById, handleUpdateUser };