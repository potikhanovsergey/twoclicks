import {
  Container,
  Text,
  Group,
  Button,
  Center,
  createStyles,
  ContainerProps,
  Stack,
} from "@mantine/core"
import Image from "next/image"

import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

const useStyles = createStyles({
  image: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
    userSelect: "none",
    width: "700px",
    height: "700px",
  },
})

const CallToAction = (props: ContainerProps) => {
  const { classes } = useStyles()
  const { t } = useTranslation("landing")

  return (
    <Container
      size="xl"
      px={40}
      sx={{
        position: "relative",
      }}
      {...props}
    >
      <div className={classes.image} style={{ top: "-450px", left: "-240px" }}>
        <Image
          src="/landing/pink-circle.png"
          width={700}
          height={700}
          quality={1}
          layout="responsive"
          alt=""
          sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
        />
      </div>
      <div className={classes.image} style={{ top: "-110px", right: "-240px" }}>
        <Image
          width={700}
          height={700}
          quality={1}
          layout="responsive"
          src="/landing/purple-circle.png"
          alt=""
          sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
        />
      </div>
      <Stack
        sx={{
          gap: "24px",
          "@media (max-width: 768px)": {
            gap: "36px",
          },
          "@media (max-width: 576px)": {
            gap: "48px",
          },
        }}
      >
        <Text
          sx={{
            marginLeft: "12%",
            fontSize: "30px",
            letterSpacing: "3px",
            "@media (max-width: 768px)": {
              fontSize: "24px",
            },
            "@media (max-width: 576px)": {
              fontSize: "18px",
              marginLeft: 0,
            },
          }}
        >
          {t("callToAction1")} <strong>{t("callToActionStrong1")}</strong> <br />{" "}
          {t("callToAction2")}
        </Text>
        <Text
          sx={{
            marginRight: "12%",
            fontSize: "30px",
            letterSpacing: "3px",
            "@media (max-width: 768px)": {
              fontSize: "24px",
            },
            "@media (max-width: 576px)": {
              fontSize: "18px",
              marginRight: 0,
            },
          }}
          align="right"
        >
          {t("callToAction3")} <br /> <strong>{t("callToActionStrong2")}</strong>.
        </Text>
      </Stack>
      <Center
        sx={{
          marginTop: "200px",
          "@media (max-width: 768px)": {
            marginTop: "80px",
          },
        }}
      >
        <Link href="/build" passHref>
          <Button
            component="a"
            rightIcon={<BsArrowRight size="20px" />}
            variant="gradient"
            gradient={{ from: "primary", to: "cyan", deg: 60 }}
            sx={{
              width: "260px",
              height: "64px",
              "@media (max-width: 768px)": {
                width: "200px",
                height: "50xp",
              },
              "@media (max-width: 576px)": {
                width: "140",
                height: "36px",
              },
            }}
          >
            <Text
              sx={{
                fontSize: "24px",
                "@media (max-width: 768px)": {
                  fontSize: "22px",
                },
                "@media (max-width: 576px)": {
                  fontSize: "16px",
                },
              }}
            >
              {t("getStarted")}
            </Text>
          </Button>
        </Link>
      </Center>
    </Container>
  )
}

export default CallToAction
