import {
  ActionIcon,
  Popover,
  ScrollArea,
  SimpleGrid,
  TextInput,
  Tooltip,
  Text,
  PopoverProps,
  useMantineColorScheme,
  Box,
  ActionIconProps,
  Button,
} from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import useTranslation from "next-translate/useTranslation"
import { ReactNode, useEffect, useMemo, useState } from "react"

import { IoClose } from "@react-icons/all-files/io5/IoClose"
import { MdClear } from "@react-icons/all-files/md/MdClear"
import { FaPlay } from "@react-icons/all-files/fa/FaPlay"
import { FaStar } from "@react-icons/all-files/fa/FaStar"
import { FaVenus } from "@react-icons/all-files/fa/FaVenus"
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF"
import { FaVk } from "@react-icons/all-files/fa/FaVk"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle"
import { GiDeathSkull } from "@react-icons/all-files/gi/GiDeathSkull"
import { BsHeartFill } from "@react-icons/all-files/bs/BsHeartFill"
import { FaTelegram } from "@react-icons/all-files/fa/FaTelegram"
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane"
import { FaOdnoklassniki } from "@react-icons/all-files/fa/FaOdnoklassniki"
import { FaApple } from "@react-icons/all-files/fa/FaApple"
import { FaAndroid } from "@react-icons/all-files/fa/FaAndroid"
import { FaDiaspora } from "@react-icons/all-files/fa/FaDiaspora"
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord"
import { FaDribbble } from "@react-icons/all-files/fa/FaDribbble"
import { FaItunesNote } from "@react-icons/all-files/fa/FaItunesNote"
import { FaPinterest } from "@react-icons/all-files/fa/FaPinterest"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown"
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight"
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft"
import { FaAngleUp } from "@react-icons/all-files/fa/FaAngleUp"
import { FaBookmark } from "@react-icons/all-files/fa/FaBookmark"
import { FaPaintBrush } from "@react-icons/all-files/fa/FaPaintBrush"
import { FaCamera } from "@react-icons/all-files/fa/FaCamera"
import { FaCar } from "@react-icons/all-files/fa/FaCar"
import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { FaCode } from "@react-icons/all-files/fa/FaCode"
import { FaClock } from "@react-icons/all-files/fa/FaClock"
import { FaComments } from "@react-icons/all-files/fa/FaComments"
import { FaEdit } from "@react-icons/all-files/fa/FaEdit"
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope"
import { FaFeather } from "@react-icons/all-files/fa/FaFeather"
import { FaGlobeAmericas } from "@react-icons/all-files/fa/FaGlobeAmericas"
import { FaHistory } from "@react-icons/all-files/fa/FaHistory"
import { FaInfo } from "@react-icons/all-files/fa/FaInfo"
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt"
import { FaPalette } from "@react-icons/all-files/fa/FaPalette"
import { FaPen } from "@react-icons/all-files/fa/FaPen"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { observer } from "mobx-react-lite"

const icons = {
  FaPlay,
  FaStar,
  FaVenus,
  FaFacebookF,
  FaVk,
  FcGoogle,
  BsHeartFill,
  GiDeathSkull,
  FaGithub,
  FaTelegram,
  FaTelegramPlane,
  FaOdnoklassniki,
  FaApple,
  FaAndroid,
  FaDiaspora,
  FaDiscord,
  FaDribbble,
  FaItunesNote,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
  FaAngleDown,
  FaAngleRight,
  FaAngleLeft,
  FaAngleUp,
  FaBookmark,
  FaPaintBrush,
  FaCamera,
  FaCar,
  FaCheck,
  FaCode,
  FaClock,
  FaComments,
  FaEdit,
  FaEnvelope,
  FaFeather,
  FaGlobeAmericas,
  FaHistory,
  FaInfo,
  FaMapMarkerAlt,
  FaPalette,
  FaPen,
  FaSearch,
  FaUser,
}
const FirstIcon = Object.values(icons)[0]

export interface IconPickerProps {
  icon: ReactNode
  onChange: (ReactNode) => void
  menuProps?: PopoverProps
  isThemeIcon?: boolean
  themeIconProps?: Partial<ActionIconProps>
  withReset?: boolean
  onReset?: () => void
}

const IconPicker = ({
  icon = <FirstIcon />,
  onChange,
  menuProps,
  isThemeIcon,
  themeIconProps,
  withReset,
  onReset,
}: IconPickerProps) => {
  const [searchValue, setSearchValue] = useState("")

  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200)

  const filteredIcons = useMemo(() => {
    const output = Object.entries(icons)
      .filter(([name]) => name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
      .map(([name, Icon]) => (
        <ActionIcon
          onClick={() => {
            const output = Icon({})
            onChange(output)
          }}
          key={name}
        >
          <Icon />
        </ActionIcon>
      ))
    return output
  }, [debouncedSearchValue])

  const { colorScheme } = useMantineColorScheme()
  const { t } = useTranslation("build")
  return (
    <Popover
      width={256}
      position="top"
      zIndex={502}
      styles={{
        dropdown: {
          overflow: "hidden",
          display: "flex",
          height: "auto",
          flexDirection: "column",
        },
      }}
      withinPortal
      {...menuProps}
    >
      <Popover.Target>
        {isThemeIcon ? (
          <ActionIcon {...themeIconProps}>{icon}</ActionIcon>
        ) : (
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "all",
            }}
          >
            {icon}
          </Box>
        )}
      </Popover.Target>
      <Popover.Dropdown p={0}>
        {withReset && (
          <Button variant="light" compact mb="xs" onClick={onReset} rightIcon={<IoClose />}>
            {t("reset icon")}
          </Button>
        )}
        <TextInput
          rightSection={
            searchValue.length ? (
              <Tooltip position="top" label="Clear search" withinPortal withArrow>
                <ActionIcon
                  onClick={() => {
                    setSearchValue("")
                  }}
                >
                  <MdClear />
                </ActionIcon>
              </Tooltip>
            ) : undefined
          }
          placeholder={t("search icon")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        <ScrollArea.Autosize maxHeight={128} offsetScrollbars>
          {filteredIcons.length ? (
            <SimpleGrid spacing={4} cols={8} py={8} pl={4} pr={12}>
              {filteredIcons}
            </SimpleGrid>
          ) : (
            <Text align="center" py={8} color={colorScheme === "dark" ? "gray" : "dark"}>
              {t("no icons found")}
            </Text>
          )}
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  )
}

export default observer(IconPicker)
