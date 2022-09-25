import { TabProps, LoadingOverlay, useMantineTheme, Title, createStyles, Box } from "@mantine/core"
import React, { Suspense, useMemo, useState } from "react"
import ViewList from "./ViewList"
import { ICanvasModalType } from "types"
import { useSession } from "@blitzjs/auth"
import useTranslation from "next-translate/useTranslation"

import { BiGridSmall } from "@react-icons/all-files/bi/BiGridSmall"
import { WiStars } from "@react-icons/all-files/wi/WiStars"
import { RiHeartFill } from "@react-icons/all-files/ri/RiHeartFill"
import { GiAnticlockwiseRotation } from "@react-icons/all-files/gi/GiAnticlockwiseRotation"
import ButtonGroup from "../../base/ButtonGroup"

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 48px)",
    padding: "10px 0 15px 0",
    gap: "10px",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

interface IModalTab extends TabProps {
  viewlistType: string
}

interface IComponentsModalTabs {
  modalType: ICanvasModalType
}

const ComponentsModalTabs = ({ modalType }: IComponentsModalTabs) => {
  const [activeTab, setActiveTab] = useState<{ value: string; viewlistType: string }>({
    value: "All",
    viewlistType: "all",
  })
  const session = useSession()
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
        color: "violet",
        value: "Popular",
        viewlistType: "popular",
        icon: <WiStars size={16} color={theme.colors.violet[5]} />,
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
      <ButtonGroup
        wrapperProps={{
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
      <Suspense fallback={<LoadingOverlay visible={true} />}>
        {ComponentsModalTabsArr.map((b) => (
          <Box
            key={b.value}
            className={classes.wrapper}
            sx={{ display: b.viewlistType === activeTab.viewlistType ? "flex" : "none" }}
          >
            <ViewList key={b.value} type={b.viewlistType} modalType={modalType} />
          </Box>
        ))}
      </Suspense>
    </>
  )
}

export default ComponentsModalTabs
