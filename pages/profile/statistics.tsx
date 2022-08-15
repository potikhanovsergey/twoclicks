import { Player } from "@lottiefiles/react-lottie-player"
import { Box, Center, SegmentedControl, Text, Title } from "@mantine/core"
import React, { useState } from "react"
import { MdOutlineCalendarViewMonth, MdViewWeek, MdViewDay } from "react-icons/md"
import ProfileNoItems from "app/profile/ProfileNoItems"
import statBars from "lotties/stat-bars.json"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import useTranslation from "next-translate/useTranslation"

const ProfileStatistics = () => {
  const { t } = useTranslation("pagesProfileStatistics")
  const [hasStats, setHasStats] = useState(false)
  return (
    <>
      <Title order={1}>{t("title")}</Title>
      {hasStats ? (
        <SegmentedControl
          size="lg"
          radius="md"
          color="violet"
          mt="lg"
          data={[
            {
              value: "preview",
              label: (
                <Center>
                  <MdViewDay size={20} />
                  <Box ml={10}>{t("day")}</Box>
                </Center>
              ),
            },
            {
              value: "code",
              label: (
                <Center>
                  <MdViewWeek size={20} />
                  <Box ml={10}>{t("week")}</Box>
                </Center>
              ),
            },
            {
              value: "export",
              label: (
                <Center>
                  <MdOutlineCalendarViewMonth size={20} />
                  <Box ml={10}>{t("month")}</Box>
                </Center>
              ),
            },
          ]}
        />
      ) : (
        <ProfileNoItems>
          <Text size="xl">Statistics will be here after you deploy first portfolio</Text>
          <Player autoplay loop src={statBars} style={{ height: "400px", width: "400px" }} />
        </ProfileNoItems>
      )}
    </>
  )
}

ProfileStatistics.getLayout = getProfileLayout()
ProfileStatistics.suppressFirstRenderFlicker = true

export default ProfileStatistics
