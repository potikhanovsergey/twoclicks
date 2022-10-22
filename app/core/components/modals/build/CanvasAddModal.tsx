import {
  ActionIcon,
  Group,
  Modal,
  ScrollArea,
  Stack,
  useMantineTheme,
  Text,
  Loader,
} from "@mantine/core"
import { memo, Suspense, useContext } from "react"
import useTranslation from "next-translate/useTranslation"
import { IModalContextValue, ModalContext } from "contexts/ModalContext"
import ComponentsModalTabs from "./ModalTabs"
import { ICanvasModalType, IFilterButton } from "types"
import { BuildStore } from "store/build"
import { observer } from "mobx-react-lite"

import { VscChromeClose } from "@react-icons/all-files/vsc/VscChromeClose"
import ButtonGroup from "../../base/ButtonGroup"
import Logo from "../../Logo"

interface ICanvasAddModal {
  filterButtons: IFilterButton[]
  modal: keyof IModalContextValue
  type: ICanvasModalType
}

const FilterButtons = observer(({ filterButtons }: { filterButtons: IFilterButton[] }) => {
  const { blockTypeFilter, setBlockTypeFilter } = BuildStore
  const { t } = useTranslation("build")

  return (
    <ButtonGroup
      buttons={filterButtons.map((b) => ({
        children: t(b.text),
        active: blockTypeFilter === b.value,
        styles: {
          inner: {
            justifyContent: "flex-start",
          },
        },
        onClick: () => {
          setBlockTypeFilter(blockTypeFilter === b.value ? "all" : b.value)
        },
      }))}
      wrapperProps={{
        sx: {
          flexDirection: "column",
        },
      }}
    />
  )
})

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
  const { t } = useTranslation("build")
  return (
    <Modal
      overflow="outside"
      fullScreen
      lockScroll
      closeOnEscape
      overlayOpacity={dark ? 0.8 : 0.6}
      styles={{
        inner: {
          padding: 0,
          overflow: "hidden",
        },
        body: {
          height: "100%",
        },
        header: { display: "none" },
      }}
      padding={0}
      opened={modalContext?.[modal] || false}
      onClose={handleModalClose}
      zIndex={1000}
    >
      <Group style={{ height: "100%" }} spacing={0} noWrap>
        <Stack
          style={{
            height: "100%",
            padding: "10px 0",
            width: "100%",
            maxWidth: "160px",
            borderRight: "1px solid",
            position: "fixed",
            top: 0,
            bottom: 0,
            borderRightColor: dark ? theme.colors.dark[5] : theme.colors.gray[1],
            color: dark ? theme.colors.gray[4] : theme.black,
          }}
          spacing={12}
        >
          <Text size="xl" weight="bold" style={{ paddingLeft: "8px" }}>
            {t("filter by")}
          </Text>
          <ScrollArea
            style={{
              flexGrow: 1,
            }}
          >
            <FilterButtons filterButtons={filterButtons} />
          </ScrollArea>
          <Logo style={{ marginTop: "auto", width: "120px", paddingLeft: "8px" }} />
        </Stack>
        <Stack
          style={{
            flexGrow: 1,
            height: "100%",
            paddingLeft: "160px",
          }}
          spacing={0}
        >
          <ComponentsModalTabs modalType={type} onClose={handleModalClose} />
        </Stack>
      </Group>
    </Modal>
  )
}

export default memo(CanvasAddModal)
