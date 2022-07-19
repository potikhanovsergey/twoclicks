import { BiGridSmall } from "react-icons/bi"
import { BsStars } from "react-icons/bs"
import { RiHeartFill } from "react-icons/ri"
import { GiAnticlockwiseRotation } from "react-icons/gi"
import { TbCrown } from "react-icons/tb"
import { ScrollArea, SimpleGrid, Tabs, Text, TabProps, LoadingOverlay } from "@mantine/core"
import { Suspense, useState } from "react"
import ViewList from "./ViewList"
import { ICanvasModalType } from "./types"

const ComponentsModalTabsArr: TabProps[] = [
  {
    color: "indigo",
    label: "All",
    icon: <BiGridSmall size={24} />,
  },
  {
    color: "violet",
    label: "Popular",
    icon: <BsStars size={16} />,
  },
  {
    color: "red",
    label: "Liked",
    icon: <RiHeartFill size={16} />,
  },
  {
    color: "green",
    label: "Used Before",
    icon: <GiAnticlockwiseRotation size={16} />,
  },
  {
    color: "yellow",
    label: "Premium",
    icon: <TbCrown size={20} />,
  },
]

interface IComponentsModalTabs {
  type: ICanvasModalType
}

const ComponentsModalTabs = ({ type }: IComponentsModalTabs) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Tabs
      styles={{
        body: {
          paddingTop: "0",
          height: "calc(100% - 40px)",
        },
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
        tabActive: {
          fontWeight: 700,
        },
      }}
      active={activeTab}
      onTabChange={setActiveTab}
    >
      {ComponentsModalTabsArr.map((tab, i) => (
        <Tabs.Tab
          key={i}
          color={tab.color}
          label={
            <Text
              size="sm"
              sx={() => ({
                "&::before": {
                  content: `"${tab.label}"`,
                  fontWeight: 700,
                  height: "0",
                  overflow: "hidden",
                  visibility: "hidden",
                  display: "block",
                },
              })}
            >
              {tab.label}
            </Text>
          }
          icon={tab.icon}
        >
          <Suspense fallback={<LoadingOverlay visible={true} />}>
            <ViewList type={type} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

export default ComponentsModalTabs
