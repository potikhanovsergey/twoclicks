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

interface ICanvasAddModal {
  filterButtons: IFilterButton[]
  modal: keyof IModalContextValue
  type: ICanvasModalType
}

const FilterButtons = observer(({ filterButtons }: { filterButtons: IFilterButton[] }) => {
  const { blockTypeFilter, setBlockTypeFilter } = BuildStore
  const { t } = useTranslation("pagesBuild")

  return (
    // <Stack spacing={2}>
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
      direction="column"
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
  const { t } = useTranslation("pagesBuild")
  return (
    <Modal
      overflow="outside"
      centered
      size="85%"
      closeOnEscape
      overlayOpacity={dark ? 0.8 : 0.6}
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
      zIndex={1000}
    >
      <Group style={{ height: "100%" }} spacing={0} noWrap>
        <Stack
          style={{
            height: "100%",
            padding: "8px 0",
            width: "100%",
            maxWidth: "160px",
            backgroundColor: dark ? theme.colors.dark[5] : theme.colors.gray[1],
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
        </Stack>
        <Stack
          style={{
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Suspense fallback={<Loader />}>
            <ComponentsModalTabs modalType={type} />
          </Suspense>
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

export default memo(CanvasAddModal)
