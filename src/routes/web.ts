import express, {Express} from 'express';
import { getCreateUserPage, getHomePage, postCreateUser } from '../controllers/user.controller';
const router = express.Router()

const webRoutes = (app: Express)=>{
  router.get('/', getHomePage);
  router.get('/create-user', getCreateUserPage);
  router.post('/handle-create-user', postCreateUser);

  router.get('/abc', (req, res) => {
    res.send('Hello World ABC!');
  });
  app.use('/', router);
}
export default webRoutes;