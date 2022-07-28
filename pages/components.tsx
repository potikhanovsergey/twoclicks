import {
  Text,
  Popover,
  ThemeIcon,
  UnstyledButton,
  Tooltip,
  Group,
  useMantineTheme,
  Progress,
  Badge,
  List,
} from "@mantine/core"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect, useState } from "react"
import LayoutHeader from "app/core/components/layout/LayoutHeader"
// import { useTranslation } from 'next-i18next';
import { IoIosRocket } from "react-icons/io"
import { useHover } from "@mantine/hooks"
import { AiOutlineEdit } from "react-icons/ai"
import { BsPalette } from "react-icons/bs"
import { MdOutlineAddBox, MdOutlinePreview } from "react-icons/md"
import { HiOutlineTemplate } from "react-icons/hi"
import Onboarding from "app/build/Onboarding"
import BaseLayout from "app/core/layouts/BaseLayout"

const ComponentsPage = () => {
  // const { t } = useTranslation('pagesBuild');
  return (
    <BaseLayout>
      <Onboarding />
    </BaseLayout>
  )
}

ComponentsPage.suppressFirstRenderFlicker = true

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pagesBuild"])),
      // Will be passed to the page component as props
    },
  }
}

export default ComponentsPage
