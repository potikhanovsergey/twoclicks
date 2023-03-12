import { passportAuth, PublicData } from "@blitzjs/auth"
import db from "db"
import { api } from "app/blitz-server"

import GoogleStrategy from "passport-google-oauth20"
import { Strategy as VKStrategy } from "passport-vkontakte"
import { Strategy as YandexStrategy } from "passport-yandex"
import { baseURL } from "pages/_app"

export default api(
  passportAuth(() => ({
    errorRedirectUrl: "/auth/",
    successRedirectUrl: "/auth/",
    strategies: [
      {
        strategy: new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            scope: ["profile", "email"],
            callbackURL: `${baseURL}/api/auth/google/callback`,
          },
          async function (accessToken, refreshToken, profile, done) {
            const email = profile.emails && profile.emails[0]?.value
            const name = profile.displayName
            const avatar = profile.photos && profile.photos[0]?.value
            const provider = "google"

            if (!email) {
              // This can happen if you haven't enabled email access in your google app permissions
              return done("Google account should have email.", {})
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                name,
                avatar,
                isEmailVerified: Boolean(email),
                provider,
              },
              update: { email, isEmailVerified: Boolean(email), provider },
            })

            const publicData = {
              userId: user.id,
              role: user.role,
              source: provider,
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
            callbackURL: `${baseURL}/api/auth/vkontakte/callback`,
          },
          async function (accessToken, refreshToken, params, profile, done) {
            const email = profile.emails && profile.emails[0]?.value
            const name = profile.displayName
            const avatar = profile.photos && profile.photos[0]?.value
            const provider = "vkontakte"

            if (!email) {
              // This can happen if you haven't enabled email access in your google app permissions
              return done("VK account should have email.", {})
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                isEmailVerified: Boolean(email),
                name,
                avatar,
                provider,
              },
              update: { email, isEmailVerified: Boolean(email), provider },
            })

            const publicData = {
              userId: user.id,
              role: user.role,
              source: provider,
            }
            done(null, { publicData })
          }
        ),
      },
      {
        strategy: new YandexStrategy(
          {
            clientID: process.env.YANDEX_CLIENT_ID as string,
            clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
            callbackURL: `${baseURL}/api/auth/yandex/callback`,
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
            const provider = "yandex"

            if (!email) {
              // This can happen if you haven't enabled email access in your yandex app permissions
              return done("Yandex account should have email.", {})
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                isEmailVerified: Boolean(email),
                name,
                avatar,
                provider,
              },
              update: { email, isEmailVerified: Boolean(email), provider },
            })

            const publicData = {
              userId: user.id,
              role: user.role,
              source: provider,
            }
            done(null, { publicData })
          }
        ),
      },
    ],
  }))
)
