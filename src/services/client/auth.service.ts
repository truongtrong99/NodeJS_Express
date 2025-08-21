import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.service";


const isEmailExists = async (email:string) =>{
    const user = await prisma.user.findUnique({ where: { username: email } });
    if(user) return true;
    return false;
}

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({ where: { name: "USER" } });
    const user = await prisma.user.create({
        data: {
            username: email,
            password: newPassword,
            fullName: fullName,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: userRole.id,
        }
    });
    return user;
};

const getUserWithRoleById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +userId },
        include: { role: true },
        omit: { password: true }
    });
    return user;
}

export { isEmailExists, registerNewUser, getUserWithRoleById };