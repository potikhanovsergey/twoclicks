import { Tabs, Text, TabProps, LoadingOverlay, ThemeIcon } from "@mantine/core"
import React, { Suspense, useMemo, useState } from "react"
import ViewList from "./ViewList"
import { ICanvasModalType } from "types"
import { useSession } from "@blitzjs/auth"
import useTranslation from "next-translate/useTranslation"

import { BiGridSmall } from "@react-icons/all-files/bi/BiGridSmall"
import { WiStars } from "@react-icons/all-files/wi/WiStars"
import { RiHeartFill } from "@react-icons/all-files/ri/RiHeartFill"
import { GiAnticlockwiseRotation } from "@react-icons/all-files/gi/GiAnticlockwiseRotation"
import { CgCrown } from "@react-icons/all-files/cg/CgCrown"

interface IModalTab extends TabProps {
  viewlistType: string
}

interface IComponentsModalTabs {
  modalType: ICanvasModalType
}

const ComponentsModalTabs = ({ modalType }: IComponentsModalTabs) => {
  const [activeTab, setActiveTab] = useState<string | null>("All")
  const session = useSession()
  const { t } = useTranslation("pagesBuild")

  const ComponentsModalTabsArr: IModalTab[] = useMemo(() => {
    return [
      {
        color: "indigo",
        value: "All",
        viewlistType: "all",
        icon: <BiGridSmall size={24} />,
      },
      {
        color: "violet",
        value: "Popular",
        viewlistType: "popular",
        icon: <WiStars size={16} />,
      },
      {
        color: "red",
        value: "Liked",
        viewlistType: "liked",
        icon: <RiHeartFill size={16} />,
      },
      {
        color: "green",
        value: "Used Before",
        viewlistType: "used-before",
        icon: <GiAnticlockwiseRotation size={16} />,
      },
      // {
      //   color: "yellow",
      //   value: "Premium",
      //   viewlistType: "premium",
      //   icon: <CgCrown size={20} />,
      // },
    ]
  }, [])

  return (
    <Tabs
      value={activeTab}
      onTabChange={setActiveTab}
      styles={{
        panel: {
          paddingTop: "0",
          height: "calc(100% - 40px)",
        },
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Tabs.List>
        {ComponentsModalTabsArr.map((tab, i) => (
          <Tabs.Tab
            disabled={
              (tab.viewlistType === "liked" || tab.viewlistType === "used-before") &&
              !session.userId
            }
            sx={() => ({
              "&:focus": {
                outline: "none",
              },
            })}
            key={tab.value}
            color={tab.color}
            icon={
              <ThemeIcon variant="light" color={tab.color} size="sm">
                {tab.icon}
              </ThemeIcon>
            }
            value={tab.value}
          >
            <Text
              size="sm"
              color={tab.value === activeTab ? tab.color : undefined}
              sx={() => ({
                fontWeight: tab.value === activeTab ? 700 : 400,
                "&::before": {
                  content: `"${tab.value}"`,
                  fontWeight: 700,
                  height: "0",
                  overflow: "hidden",
                  visibility: "hidden",
                  display: "block",
                },
              })}
            >
              {t(tab.value)}
            </Text>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {ComponentsModalTabsArr.map((tab, i) =>
        !(tab.viewlistType === "liked" || tab.viewlistType === "used-before") || session.userId ? (
          <Tabs.Panel value={tab.value} key={tab.value}>
            <Suspense fallback={<LoadingOverlay visible={true} />}>
              <ViewList type={tab.viewlistType} modalType={modalType} />
            </Suspense>
          </Tabs.Panel>
        ) : (
          <React.Fragment key={i}></React.Fragment>
        )
      )}
    </Tabs>
  )
}

export default ComponentsModalTabs
