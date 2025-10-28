import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./db";

// Initialize strategies only if credentials are present

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:3000/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await prisma.user.findUnique({
            where: { googleId: profile.id },
          });

          // If user doesn't exist, create new user
          if (!user) {
            // Check if email already exists with different provider
            const existingUser = await prisma.user.findUnique({
              where: { email: profile.emails?.[0]?.value },
            });

            if (existingUser) {
              // Update existing user with Google ID
              user = await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  googleId: profile.id,
                  avatar: profile.photos?.[0]?.value,
                },
              });
            } else {
              // Create new user
              user = await prisma.user.create({
                data: {
                  email: profile.emails?.[0]?.value || "",
                  name: profile.displayName || "",
                  googleId: profile.id,
                  avatar: profile.photos?.[0]?.value,
                  provider: "google",
                },
              });
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
}

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL:
          process.env.GITHUB_CALLBACK_URL ||
          "http://localhost:3000/api/auth/github/callback",
        scope: ["user:email"],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        try {
          // Check if user exists
          let user = await prisma.user.findUnique({
            where: { githubId: profile.id },
          });

          // If user doesn't exist, create new user
          if (!user) {
            const email =
              profile.emails?.[0]?.value || `${profile.username}@github.com`;

            // Check if email already exists with different provider
            const existingUser = await prisma.user.findUnique({
              where: { email },
            });

            if (existingUser) {
              // Update existing user with GitHub ID
              user = await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  githubId: profile.id,
                  avatar: profile.photos?.[0]?.value,
                },
              });
            } else {
              // Create new user
              user = await prisma.user.create({
                data: {
                  email,
                  name: profile.displayName || profile.username || "",
                  githubId: profile.id,
                  avatar: profile.photos?.[0]?.value,
                  provider: "github",
                },
              });
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
}

// JWT Strategy for protected routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your-secret-key",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Serialize and deserialize user for session management
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
