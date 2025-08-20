import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { handleLogin } from 'services/client/auth.service';
// import bcrypt from 'bcrypt';

const configPassportLocal = () => {
  passport.use(new LocalStrategy(function verify(username, password, callback) {
     return handleLogin(username, password, callback);
  }));
}

export default configPassportLocal;