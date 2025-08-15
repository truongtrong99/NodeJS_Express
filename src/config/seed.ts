import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDataBase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const defaultPassword = await hashPassword("123456");
    
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    fullName: "tro",
                    username: "tro@gmail.com",
                    address: "123 Main St",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
                {
                    fullName: "Admin",
                    username: "admin@gmail.com",
                    address: "456 Elm St",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
            ],
        });
    }
    else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "USER",
                    description: "Regular user with limited access",
                },
                {
                    name: "ADMIN",
                    description: "Administrator with full access",
                },
            ],
        });
    }
    else {
        console.log("ALREADY INITIALIZED DATA");
    }
};

export default initDataBase;
