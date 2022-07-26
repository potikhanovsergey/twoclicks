import { BiGridSmall } from "react-icons/bi"
import { BsStars } from "react-icons/bs"
import { RiHeartFill } from "react-icons/ri"
import { GiAnticlockwiseRotation } from "react-icons/gi"
import { TbCrown } from "react-icons/tb"
import { Tabs, Text, TabProps, LoadingOverlay, ThemeIcon } from "@mantine/core"
import { Suspense, useState } from "react"
import ViewList from "./ViewList"
import { ICanvasModalType } from "types"
import { useSession } from "@blitzjs/auth"

interface IModalTab extends TabProps {
  viewlistType: string
}

const ComponentsModalTabsArr: IModalTab[] = [
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
    icon: <BsStars size={16} />,
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
  {
    color: "yellow",
    value: "Premium",
    viewlistType: "premium",
    icon: <TbCrown size={20} />,
  },
]

interface IComponentsModalTabs {
  type: ICanvasModalType
}

const ComponentsModalTabs = ({ type }: IComponentsModalTabs) => {
  const [activeTab, setActiveTab] = useState<string | null>("All")
  const session = useSession()
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
        {ComponentsModalTabsArr.map((tab, i) =>
          tab.viewlistType !== "liked" || session.userId ? (
            <Tabs.Tab
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
                sx={() => ({
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
                {tab.value}
              </Text>
            </Tabs.Tab>
          ) : (
            <></>
          )
        )}
      </Tabs.List>
      {ComponentsModalTabsArr.map((tab, i) =>
        tab.viewlistType !== "liked" || session.userId ? (
          <Tabs.Panel value={tab.value} key={tab.value}>
            <Suspense fallback={<LoadingOverlay visible={true} />}>
              <ViewList type={tab.viewlistType} />
            </Suspense>
          </Tabs.Panel>
        ) : (
          <></>
        )
      )}
    </Tabs>
  )
}

export default ComponentsModalTabs
