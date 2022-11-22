import { Container, Space } from "@mantine/core"
import { User } from "@prisma/client"
import ButtonGroup from "app/core/components/base/ButtonGroup"
import ProfileGeneral from "app/profile/ProfileGeneral"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import BaseLayout from "./BaseLayout"

interface NewProfileLayoutProps {
  user: User
  children?: ReactNode
}

const NewProfileLayout = ({ user, children }: NewProfileLayoutProps) => {
  const router = useRouter()
  return (
    <BaseLayout>
      <Container size="lg" py={64} px={64}>
        <ProfileGeneral user={user} />
        <Space h={48} />
        <ButtonGroup
          wrapperProps={{
            mb: "xl",
            sx: {
              justifyContent: "center",
              width: "fit-content",
            },
          }}
          buttons={[
            { label: "About", value: `/profile/${user.id}` },
            { label: "Pages", value: `/profile/${user.id}/pages` },
            { label: "Templates", value: `/profile/${user.id}/templates` },
            { label: "Followers", value: `/profile/${user.id}/followers` },
            { label: "Following", value: `/profile/${user.id}/following` },
          ].map((b) => ({
            elType: "link",
            children: b.label,
            href: b.value,
            active: router.asPath === b.value,
            sx: {
              height: 36,
              minWidth: "128px",
            },
            size: "xl",
          }))}
        />
        {children}
      </Container>
    </BaseLayout>
  )
}

export default NewProfileLayout
