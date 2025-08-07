import getConnection from "config/db";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    const connection = await getConnection();
   
    try {
        const [result, fields] = await connection.execute(
            'INSERT INTO `users` (`name`, `email`, `address`) VALUES (?, ?, ?)',
            [fullName, email, address]
        );
        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
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