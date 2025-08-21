import express, {Express} from 'express';
import { getCreateUserPage, getHomePage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductPage } from 'controllers/client/product.controller';
import { deleteProduct, getCreateProductPage, getViewProduct, postAdminCreateProduct, postUpdateProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegisterPage } from 'controllers/client/auth.controller';
import passport from 'passport';
import { isAdmin } from 'src/middleware/auth';


const router = express.Router()

const webRoutes = (app: Express)=>{
  router.get('/', getHomePage);
  router.get('/success-redirect', getSuccessRedirectPage);
  ///
  router.get('/login', getLoginPage);
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/success-redirect',
    failureRedirect: '/login',
    failureMessage: true
  }));
  router.post('/logout', postLogout);
  router.get('/register', getRegisterPage);
  router.post('/register', postRegisterPage);
  //client page
  router.get('/product/:id', getProductPage);

  //admin page
  router.get('/admin', getDashboardPage);
  router.get('/admin/user', getAdminUserPage);
  router.get('/admin/product', getAdminProductPage);
  router.get('/admin/order', getAdminOrderPage);
  router.get('/admin/create-user', getCreateUserPage);
  router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
  router.post('/admin/delete-user/:id', postDeleteUser);
  router.get('/admin/view-user/:id', getViewUser);
  router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser);
  router.get('/abc', (req, res) => {
    res.send('Hello World ABC!');
  });
  //admin product page
  router.get('/admin/create-product', getCreateProductPage)
  router.post('/admin/create-product', fileUploadMiddleware('image', 'images/product'), postAdminCreateProduct)
  router.get('/admin/view-product/:id', getViewProduct);
  router.post('/admin/update-product', fileUploadMiddleware('image', 'images/product'), postUpdateProduct);
  router.post('/admin/delete-product/:id', deleteProduct);
  app.use('/', isAdmin, router);
}
export default webRoutes;