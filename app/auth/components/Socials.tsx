import { useSession } from "@blitzjs/auth"
import { ActionIcon, Group } from "@mantine/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Router, useRouter } from "next/router"
import { useRef, useState, useEffect, ReactNode } from "react"
import NewWindow from "react-new-window"

interface IAuthSocials {
  socials: {
    provider: string
    icon: ReactNode
  }[]
}

const AuthSocials = ({ socials }: IAuthSocials) => {
  const router = useRouter()
  return (
    <>
      <Group position="center" spacing={8}>
        {socials.map((s) => (
          <ActionIcon
            key={s.provider}
            onClick={() => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              void router.push(`/api/auth/${s.provider}?redirectUrl=${next}`)
            }}
            sx={(theme) => ({
              ":hover": {
                backgroundColor:
                  theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[2],
              },
            })}
            size="lg"
          >
            {s.icon}
          </ActionIcon>
        ))}
      </Group>
      {/* {authPopup && (
        <NewWindow
          onBlock={() => {
            // if (clickedProvider) signIn(clickedProvider); todo: auth
          }}
          ref={popupRef}
          copyStyles={false}
          features={{ width: 420, height: 500 }}
          url={`/api/auth/${clickedProvider}`}
        />
      )} */}
    </>
  )
}

export default AuthSocials
