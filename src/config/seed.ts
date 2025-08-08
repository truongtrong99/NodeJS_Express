import { prisma } from "config/client";

const initDataBase = async () => {
    const countUser = await prisma.user.count();
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
    }else{
        console.log("ALREADY INITIALIZED DATA");
    }
};

export default initDataBase;
