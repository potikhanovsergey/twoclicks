import { getBaseLayout } from "app/core/layouts/BaseLayout"
import { Space } from "@mantine/core"
import HomeHero from "app/home/HomeHero"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Home = () => {
  return (
    <>
      <HomeHero />
      <Space h={72} />
    </>
  )
}

Home.getLayout = getBaseLayout()
Home.suppressFirstRenderFlicker = true

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || "ru", ["pagesHome", "common"])),
    },
  }
}
