import { Box, Center, SegmentedControl, Text, Title } from "@mantine/core"
import React, { useState } from "react"
import ProfileNoItems from "app/profile/ProfileNoItems"
import { getProfileLayout } from "app/core/layouts/ProfileLayout"
import useTranslation from "next-translate/useTranslation"

import { CgViewMonth } from "@react-icons/all-files/cg/CgViewMonth"
import { MdViewWeek } from "@react-icons/all-files/md/MdViewWeek"
import { MdViewDay } from "@react-icons/all-files/md/MdViewDay"

const ProfileStatistics = () => {
  const { t } = useTranslation("statistics")
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
                  <CgViewMonth size={20} />
                  <Box ml={10}>{t("month")}</Box>
                </Center>
              ),
            },
          ]}
        />
      ) : (
        <ProfileNoItems>
          <Text size="xl">Statistics will be here after you deploy first page</Text>
          Тут был лотти
        </ProfileNoItems>
      )}
    </>
  )
}

ProfileStatistics.getLayout = getProfileLayout()
ProfileStatistics.suppressFirstRenderFlicker = true

export default ProfileStatistics
