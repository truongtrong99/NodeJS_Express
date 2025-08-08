import { prisma } from "config/client";

const initDataBase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    fullName: "tro",
                    username: "tro@gmail.com",
                    address: "123 Main St",
                    password: "123456",
                    accountType: "SYSTEM",
                },
                {
                    fullName: "Admin",
                    username: "admin@gmail.com",
                    address: "456 Elm St",
                    password: "123456",
                    accountType: "SYSTEM",
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
