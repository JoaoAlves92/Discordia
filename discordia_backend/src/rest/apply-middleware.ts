import cors from "cors";
import passport from "passport";
import { User } from "../data/models/user";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express-serve-static-core";
import bodyParser from "body-parser";

export default (app: Express) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize(), passport.session());

  // passport.use(
  //   new LocalStrategy({ usernameField: "email" }, (User as any).authenticate())
  // );
  passport.use(
    new LocalStrategy(
      async function (email, password, done) {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Credenciais inválidas" });
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((User as any).serializeUser());
  passport.deserializeUser((User as any).deserializeUser());
};
