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
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users` WHERE `id` = ?',
            [userId]
        );
        return results[0]; // Return the first user found
    } catch (err) {
        console.log(err);
        return null;
    }
}

const handleUpdateUser = async (userId: string, fullName: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const [result, fields] = await connection.execute(
            'UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?',
            [fullName, email, address, userId]
        );
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

export { handleCreateUser, getAllUsers, handleDeleteUser,getUserById, handleUpdateUser };