import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";


const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string) => {

    const newUser = await prisma.user.create({
        data:{
            fullName: fullName,
            username: email,
            address: address,
            password:"123456",
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
        }
    })
    return newUser;
};

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
};

const handleDeleteUser = async (userId: string) => {
    const deletedUser = await prisma.user.delete({
        where: { id: +userId }
    });
    return deletedUser;
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
            fullName: fullName,
            username: email,
            address: address,
            password:"",
            accountType:"",
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser,getUserById, handleUpdateUser, getAllRoles };