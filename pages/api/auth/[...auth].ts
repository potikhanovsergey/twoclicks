import { passportAuth, PublicData } from "@blitzjs/auth"
import db from "db"
import { api } from "app/blitz-server"

import GoogleStrategy from "passport-google-oauth20"
import { Strategy as VKStrategy } from "passport-vkontakte"
import { Strategy as YandexStrategy } from "passport-yandex"

export default api(
  passportAuth(({ ctx, req, res }) => ({
    strategies: [
      {
        strategy: new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            scope: ["profile", "email"],
            callbackURL: "http://localhost:3000/api/auth/google/callback",
          },
          async function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            const email = profile.emails && profile.emails[0]?.value
            const name = profile.displayName
            const avatar = profile.photos && profile.photos[0]?.value

            if (!email) {
              // This can happen if you haven't enabled email access in your google app permissions
              return done(new Error("Google OAuth response doesn't have email."))
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                name,
                avatar,
              },
              update: { email },
            })

            const publicData = {
              userId: user.id,
              roles: [user.role],
              source: "google",
            }
            done(undefined, { publicData })
          }
        ),
      },
      {
        strategy: new VKStrategy(
          {
            clientID: process.env.VK_CLIENT_ID as string,
            clientSecret: process.env.VK_CLIENT_SECRET as string,
            scope: ["profile", "email"],
            callbackURL:
              process.env.NODE_ENV === "production"
                ? "https://skillcase.com/api/auth/vkontakte/callback"
                : "http://localhost:3000/api/auth/vkontakte/callback",
          },
          async function (accessToken, refreshToken, params, profile, done) {
            const email = profile.emails && profile.emails[0]?.value
            const name = profile.displayName
            const avatar = profile.photos && profile.photos[0]?.value

            if (!email) {
              // This can happen if you haven't enabled email access in your google app permissions
              return done(new Error("Google OAuth response doesn't have email."))
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                name,
                avatar,
              },
              update: { email },
            })

            const publicData = {
              userId: user.id,
              roles: [user.role],
              source: "vkontakte",
            }
            done(undefined, { publicData })
          }
        ),
      },
      {
        strategy: new YandexStrategy(
          {
            clientID: process.env.YANDEX_CLIENT_ID!, // todo: remove exclamation marks
            clientSecret: process.env.YANDEX_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/api/auth/yandex/callback",
          },
          async function (accessToken, refreshToken, profile, done) {
            const email = profile.emails && profile.emails[0]?.value
            let name
            if (profile.name.familyName && profile.name.givenName) {
              name = `${profile.name.givenName} ${profile.name.familyName}`
            } else {
              name = profile.displayName
            }
            const avatar = profile.photos && profile.photos[0]?.value

            if (!email) {
              // This can happen if you haven't enabled email access in your yandex app permissions
              return done("Yandex OAuth response doesn't have email.", {})
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                name,
                avatar,
              },
              update: { email },
            })

            const publicData = {
              userId: user.id,
              roles: [user.role],
              source: "vkontakte",
            }
            done(null, { publicData })
          }
        ),
      },
    ],
  }))
)
