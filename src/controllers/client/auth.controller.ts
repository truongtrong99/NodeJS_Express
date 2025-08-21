import { Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema } from "src/validation/register.schema";

const getLoginPage = (req:Request, res:Response) => {
    const { session } = req as any;
    const messages =  session?.messages ?? [];
    res.render('client/auth/login', { messages });
};

const getRegisterPage = (req:Request, res:Response) => {
    res.render('client/auth/register');
};
const postRegisterPage = async (req:Request, res:Response) => {
    const { fullName, email, password, confirmPassword } = req.body;
    // Handle registration logic here
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = { fullName, email, password, confirmPassword };
        res.render('client/auth/register', { errors, oldData });
    }

    await registerNewUser(fullName, email, password);
    return res.redirect('/login');
};
const getSuccessRedirectPage = (req:Request, res:Response) => {
    const user = req.user as any;
    if(user?.role?.name === "ADMIN"){
        res.redirect('/admin');
    }else{
        res.redirect('/');
    }
};

export { getLoginPage, getRegisterPage, postRegisterPage,getSuccessRedirectPage };