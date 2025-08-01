import express, {Express} from 'express';
const router = express.Router()

const webRoutes = (app: Express)=>{
  router.get('/', (req, res) => {
    res.render('home')
  });
  router.get('/tro', (req, res) => {
    res.send('Hello World Tro123!');
  });
  router.get('/abc', (req, res) => {
    res.send('Hello World ABC!');
  });
  app.use('/', router);
}
export default webRoutes;