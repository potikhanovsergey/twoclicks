import {
  ActionIcon,
  Group,
  Modal,
  ScrollArea,
  Stack,
  useMantineTheme,
  Text,
  Button,
  Box,
} from "@mantine/core"
import { useContext, useState } from "react"
// import { useTranslation } from 'next-i18next';
import { VscChromeClose } from "react-icons/vsc"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import ComponentsModalTabs from "./ModalTabs"
import { ICanvasModalType, IFilterButton } from "./types"

interface ICanvasAddModal {
  filterButtons: IFilterButton[]
  modal: keyof IModalContextValue
  type: ICanvasModalType
}

const CanvasAddModal = ({ filterButtons, modal, type }: ICanvasAddModal) => {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"
  // const { t } = useTranslation('common');
  const [modalContext, setModalContext = () => ({})] = useContext(ModalContext)

  const handleModalClose = () => {
    setModalContext((prevValue) => ({
      ...prevValue,
      [modal]: false,
    }))
  }
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <Modal
      overflow="outside"
      centered
      size="85%"
      overlayOpacity={dark ? 0.99 : 0.6}
      styles={{
        inner: {
          padding: 0,
        },
        header: { display: "none" },
        modal: {
          height: "80vh",
          overflow: "hidden",
          boxShadow: "none",
        },
        body: {
          height: "100%",
        },
      }}
      style={{
        borderRadius: theme.radius.xl,
        overflow: "hidden",
      }}
      padding={0}
      opened={modalContext?.[modal] || false}
      onClose={handleModalClose}
    >
      <Group style={{ height: "100%" }} spacing={0}>
        <Stack
          style={{
            height: "100%",
            padding: "8px 0",
            maxWidth: "160px",
            flexGrow: 1,
            backgroundColor: dark ? theme.colors.dark[5] : theme.colors.gray[1],
            color: dark ? theme.colors.gray[4] : theme.black,
          }}
          spacing={12}
        >
          <Text size="xl" weight="bold" style={{ paddingLeft: "8px" }}>
            Filter By
          </Text>
          <ScrollArea
            style={{
              flexGrow: 1,
            }}
          >
            <Stack spacing={2}>
              {filterButtons.map((b) => (
                <Button
                  styles={{
                    inner: { justifyContent: "flex-start" },
                    root: { padding: "0 0 0 8px" },
                    label: { width: "100%" },
                  }}
                  variant="subtle"
                  color={dark ? "gray" : "dark"}
                  key={b.value}
                  onClick={() => {
                    filter === b.value ? setFilter(null) : setFilter(b.value)
                  }}
                >
                  <Group
                    align="center"
                    position="apart"
                    style={{ position: "relative" }}
                    styles={{ root: { width: "100%" } }}
                  >
                    <Text>{b.text}</Text>
                    <Box
                      sx={() => ({
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: "3px",
                        backgroundColor:
                          filter === b.value
                            ? dark
                              ? theme.colors.primary[5]
                              : theme.colors.violet[5]
                            : "transparent",
                        marginLeft: "auto",
                      })}
                    />
                  </Group>
                </Button>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
        <Stack
          style={{
            flexGrow: 1,
            height: "100%",
          }}
        >
          <ComponentsModalTabs type={type} />
        </Stack>
      </Group>
      <ActionIcon
        onClick={handleModalClose}
        size="sm"
        color={dark ? "gray" : "dark"}
        variant="transparent"
        style={{ position: "fixed", top: "8px", right: "8px" }}
      >
        <VscChromeClose size={16} />
      </ActionIcon>
    </Modal>
  )
}

export default CanvasAddModal