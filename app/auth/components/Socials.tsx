import { ActionIcon, Group } from "@mantine/core"
import Link from "next/link"
import { ReactNode } from "react"

interface IAuthSocials {
  socials: {
    provider: string
    icon: ReactNode
  }[]
}

const AuthSocials = ({ socials }: IAuthSocials) => {
  return (
    <>
      <Group position="center" spacing={16}>
        {socials.map((s) => (
          <Link href={`/api/auth/${s.provider}`} passHref key={s.provider}>
            <ActionIcon
              component="a"
              aria-label={`Authorize with ${s.provider}`}
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
          </Link>
        ))}
      </Group>
    </>
  )
}

export default AuthSocials
