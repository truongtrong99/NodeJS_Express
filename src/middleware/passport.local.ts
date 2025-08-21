import { prisma } from 'config/client';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserWithRoleById } from 'services/client/auth.service';
import { comparePassword } from 'services/user.service';

const configPassportLocal = () => {
  passport.use(new LocalStrategy({
    passReqToCallback: true
  },async function verify(req, username, password, callback) {
    const { session } = req as any;
    if(session?.messages?.length){
        session.messages = [];
    }
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, { message: `Username/Password incorrect` });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        // throw new Error(`Invalid password for username: ${username}`);
        return callback(null, false, { message: `Username/Password incorrect` });
    }
    return callback(null, user);
  }));

  passport.serializeUser(function(user:any, callback) {
    console.log("User authenticated:", user);

  process.nextTick(function() {
    return callback(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(async function(user:any, callback) {
    const {id, username} = user;
    const userInDB = await getUserWithRoleById(id);
    process.nextTick(function() {
        return callback(null, {...userInDB});
    });
});
}

export default configPassportLocal;