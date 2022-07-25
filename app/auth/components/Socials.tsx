import { ActionIcon, Group } from "@mantine/core"
import { useRouter } from "next/router"
import { ReactNode } from "react"

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
              // const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              void router.push(`/api/auth/${s.provider}`)
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
    </>
  )
}

export default AuthSocials
