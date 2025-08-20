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
const handleLogin = async (username: string, password: string, callback: any) => {
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, { message: `Username: ${username} not found` });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        // throw new Error(`Invalid password for username: ${username}`);
        return callback(null, false, { message: `Invalid password for username: ${username}` });
    }

    return callback(null, user);
};

export { isEmailExists, registerNewUser, handleLogin };