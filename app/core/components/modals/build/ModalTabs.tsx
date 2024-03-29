import {
  TabProps,
  LoadingOverlay,
  useMantineTheme,
  createStyles,
  Box,
  Group,
  ActionIcon,
  Button,
} from "@mantine/core"
import React, { Suspense, useMemo, useState } from "react"
import ViewList from "./ViewList"
import { ICanvasModalType } from "types"
import useTranslation from "next-translate/useTranslation"

import { BiGridSmall } from "@react-icons/all-files/bi/BiGridSmall"
import { WiStars } from "@react-icons/all-files/wi/WiStars"
import { RiHeartFill } from "@react-icons/all-files/ri/RiHeartFill"
import { GiAnticlockwiseRotation } from "@react-icons/all-files/gi/GiAnticlockwiseRotation"
import ButtonGroup from "../../base/ButtonGroup"
import { VscChromeClose } from "@react-icons/all-files/vsc/VscChromeClose"

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "50px 20px 15px 20px",
    gap: "10px",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
}))

interface IModalTab extends TabProps {
  viewlistType: string
}

interface IComponentsModalTabs {
  modalType: ICanvasModalType
  onClose: () => void
}

const ComponentsModalTabs = ({ modalType, onClose }: IComponentsModalTabs) => {
  const [activeTab, setActiveTab] = useState<{ value: string; viewlistType: string }>({
    value: "All",
    viewlistType: "all",
  })
  const { t } = useTranslation("build")
  const theme = useMantineTheme()

  const ComponentsModalTabsArr: IModalTab[] = useMemo(() => {
    return [
      {
        color: "indigo",
        value: "All",
        viewlistType: "all",
        icon: <BiGridSmall size={24} color={theme.colors.indigo[5]} />,
      },
      {
        color: "primary",
        value: "Popular",
        viewlistType: "popular",
        icon: <WiStars size={16} color={theme.colors.primary[5]} />,
      },
      {
        color: "red",
        value: "Liked",
        viewlistType: "liked",
        icon: <RiHeartFill size={16} color={theme.colors.red[5]} />,
      },
      {
        color: "green",
        value: "Used Before",
        viewlistType: "used-before",
        icon: <GiAnticlockwiseRotation color={theme.colors.green[5]} size={16} />,
      },
      // {
      //   color: "yellow",
      //   value: "Premium",
      //   viewlistType: "premium",
      //   icon: <CgCrown size={20} />,
      // },
    ]
  }, [])

  const { classes } = useStyles()

  return (
    <>
      <Group
        position="apart"
        align="center"
        pl={25}
        pr={16}
        sx={{
          position: "fixed",
          top: 0,
          height: 48,
          left: "160px",
          right: "20px",
          zIndex: 10,
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        }}
      >
        <ButtonGroup
          wrapperProps={{
            pl: 12,
            pr: 24,
            sx: {
              width: "fit-content",
            },
          }}
          buttons={ComponentsModalTabsArr.map((b) => ({
            children: t(b.value),
            onClick: () => setActiveTab({ value: b.value, viewlistType: b.viewlistType }),
            leftIcon: b.icon,
            active: b.value === activeTab.value,
          }))}
        />
        <ActionIcon onClick={onClose} size="sm" variant="filled" color="primary">
          <VscChromeClose size={16} />
        </ActionIcon>
      </Group>

      <Suspense fallback={<LoadingOverlay visible />}>
        <Box className={classes.wrapper}>
          <ViewList modalType={modalType} type={activeTab.viewlistType} />
        </Box>
      </Suspense>
    </>
  )
}

export default ComponentsModalTabs
