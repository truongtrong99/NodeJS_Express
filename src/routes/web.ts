import express, {Express} from 'express';
import { getCreateUserPage, getHomePage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
const router = express.Router()

const webRoutes = (app: Express)=>{
  router.get('/', getHomePage);
  router.get('/create-user', getCreateUserPage);
  router.post('/handle-create-user', postCreateUser);
  router.post('/handle-delete-user/:id', postDeleteUser);
  router.get('/handle-view-user/:id', getViewUser);
  router.post('/handle-update-user', postUpdateUser);
  
  //adim page
  router.get('/admin', getDashboardPage);
  router.get('/admin/user', getAdminUserPage);


  router.get('/abc', (req, res) => {
    res.send('Hello World ABC!');
  });
  app.use('/', router);
}
export default webRoutes;