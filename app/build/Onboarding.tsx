import {
  Text,
  Popover,
  ThemeIcon,
  ActionIcon,
  Tooltip,
  Group,
  useMantineTheme,
  Progress,
  Badge,
  List,
  UnstyledButton,
} from "@mantine/core"
import { useEffect, useState } from "react"
// import { useTranslation } from 'next-i18next';
import { IoIosRocket } from "react-icons/io"
import { useHover } from "@mantine/hooks"
import { AiOutlineEdit } from "react-icons/ai"
import { BsPalette } from "react-icons/bs"
import { MdOutlineAddBox, MdOutlinePreview } from "react-icons/md"
import { HiOutlineTemplate } from "react-icons/hi"

const Onboarding = () => {
  // const { t } = useTranslation('pagesBuild');
  const [popoverOpened, setPopoverOpened] = useState(false)
  const { hovered: tooltipHovered, ref: tooltipRef } = useHover<HTMLDivElement>()
  const [tooltipOpened, setTooltipOpened] = useState(false)
  const theme = useMantineTheme()

  useEffect(() => {
    setTooltipOpened(tooltipHovered && !popoverOpened)
  }, [tooltipHovered, popoverOpened])

  return (
    <>
      <svg width="0" height="0">
        <linearGradient
          id="onboarding-rocket-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientTransform="rotate(60)"
        >
          <stop stopColor={theme.colors.teal[5]} offset="0%" />
          <stop stopColor={theme.colors.blue[5]} offset="100%" />
        </linearGradient>
      </svg>
      <Popover
        position="top-start"
        opened={popoverOpened}
        onChange={setPopoverOpened}
        onOpen={() => {
          setTooltipOpened(false)
        }}
        radius="md"
        width={256}
      >
        <Popover.Target>
          <UnstyledButton
            sx={() => ({
              ":active": {
                transform: "translateY(1px)",
              },
            })}
          >
            <Tooltip label="Getting Started" opened={tooltipOpened} color="violet">
              <ThemeIcon
                sx={() => ({
                  WebkitBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
                  boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
                })}
                ref={tooltipRef}
                onClick={() => setPopoverOpened((o) => !o)}
                radius="xl"
                variant="gradient"
                size="xl"
                gradient={{ from: theme.colors.violet[5], to: theme.colors.teal[5], deg: 35 }}
              >
                <IoIosRocket size={24} />
              </ThemeIcon>
            </Tooltip>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown p="sm">
          <Group align="center" spacing={6} mb="xs">
            <Text
              size="xl"
              weight="bold"
              color={theme.colorScheme === "dark" ? theme.white : theme.black}
            >
              Getting Started!
            </Text>
            <IoIosRocket size={24} style={{ fill: "url(#onboarding-rocket-gradient)" }} />
          </Group>
          <Group align="center" position="apart" noWrap mb={4}>
            <Text size="xs" color={theme.colorScheme === "dark" ? theme.white : theme.black}>
              60% complete
            </Text>
            <Badge color="cyan" size="xs" radius="sm" variant="light">
              10% discount reward
            </Badge>
          </Group>
          <Progress mb="sm" />
          <List
            size="sm"
            spacing={4}
            styles={{
              itemWrapper: {
                display: "flex !important",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                alignItems: "center !important",
              },
              itemIcon: {
                display: "flex !important",
                alignItems: "center",
                marginRight: 0,
              },
            }}
          >
            <List.Item
              icon={
                <ActionIcon color="indigo" variant="light">
                  <HiOutlineTemplate size={16} />
                </ActionIcon>
              }
            >
              Select a Template
            </List.Item>
            <List.Item
              icon={
                <ActionIcon color="indigo" variant="light">
                  <AiOutlineEdit size={16} />
                </ActionIcon>
              }
            >
              Edit a component/section
            </List.Item>
            <List.Item
              icon={
                <ActionIcon color="indigo" variant="light">
                  <BsPalette size={16} />
                </ActionIcon>
              }
            >
              Change the Palette
            </List.Item>
            <List.Item
              icon={
                <ActionIcon color="indigo" variant="light">
                  <MdOutlineAddBox size={16} />
                </ActionIcon>
              }
            >
              Add a new Section
            </List.Item>
            <List.Item
              icon={
                <ActionIcon color="indigo" variant="light">
                  <MdOutlinePreview size={16} />
                </ActionIcon>
              }
            >
              Preview the Portfolio
            </List.Item>
          </List>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default Onboarding
