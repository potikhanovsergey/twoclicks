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
  Stack,
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
          <stop stopColor={theme.colors.violet[5]} offset="0%" />
          <stop stopColor={theme.colors.red[5]} offset="100%" />
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
                gradient={{ from: theme.colors.violet[5], to: theme.colors.red[5], deg: 35 }}
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
            <Badge
              size="xs"
              radius="sm"
              variant="gradient"
              gradient={{ from: "violet", to: "red" }}
            >
              10% discount reward
            </Badge>
          </Group>
          <Progress mb="sm" />
          <Stack spacing={4}>
            <Group position="apart">
              <Text size="sm" color="gray">
                Select a Template
              </Text>
              <ActionIcon color="indigo" variant="light">
                <HiOutlineTemplate size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                Edit a component/section
              </Text>
              <ActionIcon color="indigo" variant="light">
                <AiOutlineEdit size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                Change the Palette
              </Text>
              <ActionIcon color="indigo" variant="light">
                <BsPalette size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                Add a new Section
              </Text>
              <ActionIcon color="indigo" variant="light">
                <MdOutlineAddBox size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                Preview the Portfolio
              </Text>
              <ActionIcon color="indigo" variant="light">
                <MdOutlinePreview size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default Onboarding
