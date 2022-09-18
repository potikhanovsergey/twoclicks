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
import useTranslation from "next-translate/useTranslation"
import { useHover } from "@mantine/hooks"
import PreviewButton from "./PreviewButton"

import { IoIosRocket } from "@react-icons/all-files/io/IoIosRocket"
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit"
import { FaPalette } from "@react-icons/all-files/fa/FaPalette"
import { MdAddBox } from "@react-icons/all-files/md/MdAddBox"
import { HiOutlineTemplate } from "@react-icons/all-files/hi/HiOutlineTemplate"

const Onboarding = () => {
  // const { t } = useTranslation('pagesBuild');
  const [popoverOpened, setPopoverOpened] = useState(false)
  const { hovered: tooltipHovered, ref: tooltipRef } = useHover<HTMLDivElement>()
  const [tooltipOpened, setTooltipOpened] = useState(false)
  const theme = useMantineTheme()

  useEffect(() => {
    setTooltipOpened(tooltipHovered && !popoverOpened)
  }, [tooltipHovered, popoverOpened])

  const { t } = useTranslation("pagesBuild")

  return (
    <>
      <Popover
        position="top-start"
        opened={popoverOpened}
        onChange={setPopoverOpened}
        onOpen={() => {
          setTooltipOpened(false)
        }}
        radius="md"
        width={256}
        withinPortal
        zIndex={5}
      >
        <Popover.Target>
          <UnstyledButton
            sx={() => ({
              ":active": {
                transform: "translateY(1px)",
              },
            })}
          >
            <Tooltip
              label={t("getting started")}
              opened={tooltipOpened}
              position="top"
              withinPortal
              zIndex={5}
            >
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
              {t("getting started!")}
            </Text>
            <IoIosRocket size={24} style={{ fill: "url(#violet-red-gradient)" }} />
          </Group>
          <Group align="center" position="apart" noWrap mb={4}>
            <Text size="xs" color={theme.colorScheme === "dark" ? theme.white : theme.black}>
              60% {t("complete")}
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
                {t("select a template")}
              </Text>
              <ActionIcon color="indigo" variant="light">
                <HiOutlineTemplate size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                {t("edit a component/section")}
              </Text>
              <ActionIcon color="indigo" variant="light">
                <AiOutlineEdit size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                {t("change the palette")}
              </Text>
              <ActionIcon color="indigo" variant="light">
                <FaPalette size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                {t("add a new section")}
              </Text>
              <ActionIcon color="indigo" variant="light">
                <MdAddBox size={16} />
              </ActionIcon>
            </Group>
            <Group position="apart">
              <Text size="sm" color="gray">
                {t("preview the portfolio")}
              </Text>
              <PreviewButton color="indigo" variant="light">
                <FaPalette size={16} />
              </PreviewButton>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default Onboarding
