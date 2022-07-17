import { ActionIcon, Group } from "@mantine/core"
import { useRef, useState, useEffect, ReactNode } from "react"
import NewWindow from "react-new-window"

interface IAuthSocials {
  socials: {
    provider: string
    icon: ReactNode
  }[]
}

const AuthSocials = ({ socials }: IAuthSocials) => {
  const [authPopup, setAuthPopup] = useState(false)
  const popupRef = useRef<NewWindow>(null)
  useEffect(() => {
    let popupInterval: NodeJS.Timeout
    if (authPopup) {
      popupInterval = setInterval(() => {
        if (popupRef.current?.window?.closed) {
          setAuthPopup(false)
          clearInterval(popupInterval)
        }
      }, 200)
    }
    return () => {
      clearInterval(popupInterval)
    }
  }, [authPopup, popupRef])

  const [clickedProvider, setClickedProvider] = useState<string | null>(null)
  useEffect(() => {
    if (clickedProvider) {
      setAuthPopup(true)
    }
  }, [clickedProvider])

  return (
    <>
      <Group position="center" spacing={8}>
        {socials.map((s) => (
          <ActionIcon
            key={s.provider}
            onClick={() => setClickedProvider(s.provider)}
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
      {authPopup && (
        <NewWindow
          onBlock={() => {
            // if (clickedProvider) signIn(clickedProvider); todo: auth
          }}
          ref={popupRef}
          copyStyles={false}
          features={{ width: 420, height: 500 }}
          url={`/auth/popup-signin/?provider=${clickedProvider}`}
        />
      )}
    </>
  )
}

export default AuthSocials
