import { passportAuth, PublicData } from "@blitzjs/auth"
import db from "db"
import { api } from "app/blitz-server"

import GoogleStrategy from "passport-google-oauth20"
import { Strategy as VKStrategy } from "passport-vkontakte"
import { Strategy as YandexStrategy } from "passport-yandex"

const DEVELOPMENT_URL = "http://localhost:3000/api"
const PRODUCTION_URL = "http://localhost:3000/api"

const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL

export default api(
  passportAuth(() => ({
    strategies: [
      {
        strategy: new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            scope: ["profile", "email"],
            callbackURL: `${baseURL}/auth/google/callback`,
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
                isEmailVerified: Boolean(email),
              },
              update: { email, isEmailVerified: Boolean(email) },
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
            callbackURL: `${baseURL}/auth/vkontakte/callback`,
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
                isEmailVerified: Boolean(email),
                name,
                avatar,
              },
              update: { email, isEmailVerified: Boolean(email) },
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
            clientID: process.env.YANDEX_CLIENT_ID || "",
            clientSecret: process.env.YANDEX_CLIENT_SECRET!,
            callbackURL: `${baseURL}/auth/yandex/callback`,
          },
          async function (_accessToken, _refreshToken, profile, done) {
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
                isEmailVerified: Boolean(email),
                name,
                avatar,
              },
              update: { email, isEmailVerified: Boolean(email) },
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
