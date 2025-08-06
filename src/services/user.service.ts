import getConnection from "../config/db";

const handleCreateUser = (fullName: string, email: string, address: string) => {
    console.log('User created successfully');
};

const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export { handleCreateUser, getAllUsers };