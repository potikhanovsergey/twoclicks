import { Container, Title, Accordion, Box, useMantineTheme } from "@mantine/core"
import { getBaseLayout } from "app/core/layouts/BaseLayout"
import Image from "next/image"

const faqList = [
  {
    q: "How can I create a page?",
    a: "You can start with a template or from scratch. Then just add new sections or edit existing ones. After all of this you can publish a page and share it with others!",
  },
  {
    q: "Is it free to use?",
    a: "Yes, the builder is free to use. Hovewer, at the moment we can`t take responsibility for the safety of pages you create.",
  },
  {
    q: "Will my pages look good on phones?",
    a: "Sure, all the sections inside our builder are fully adaptive for any device! You can check how the page looks with our mobile viewer in builder at any time.",
  },
  {
    q: "Can I create multiple pages?",
    a: "Of course! Create as many pages as you want and then link them together.",
  },
  // {
  //   q: "How can I support your project?",
  //   a: "The best way to support us is to leave a feedback here"
  // }
]

const Faq = () => {
  const theme = useMantineTheme()

  return (
    <Box sx={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          width: "700px",
          height: "700px",
          position: "absolute",
          pointerEvents: "none",
          zIndex: -1,
          userSelect: "none",
          top: "30px",
          left: "-240px",
          "@media (max-width: 768px)": {
            width: "350px",
            height: "350px",
            top: "110px",
            left: "-140px",
          },
        }}
      >
        <Image
          src="/landing/purple-circle.png"
          quality={1}
          layout="fill"
          objectFit="cover"
          alt=""
          // sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
          // sizes="(max-width: 768px) 300px, (min-width: 768px) 700px"
        />
      </Box>
      <Box
        sx={{
          width: "700px",
          height: "700px",
          position: "absolute",
          pointerEvents: "none",
          zIndex: -1,
          userSelect: "none",
          right: "-240px",
          top: "-90px",
          "@media (max-width: 768px)": {
            width: "350px",
            height: "350px",
            right: "-180px",
            top: "-120px",
          },
        }}
      >
        <Image
          src="/landing/pink-circle.png"
          width={700}
          height={700}
          quality={1}
          layout="responsive"
          alt=""
          sizes="(max-width: 768px) 300px,(max-width: 1200px) 500px,700px"
        />
      </Box>
      <Container size="sm" sx={{ paddingTop: 48, paddingBottom: 48, minHeight: 650 }}>
        <Title
          align="center"
          sx={{
            marginBottom: 36,
            "@media (max-width: 576px)": {
              fontSize: "24px",
            },
          }}
        >
          Frequently Asked Questions
        </Title>
        <Accordion variant="separated">
          {faqList.map((faq) => (
            <Accordion.Item
              key={faq.q}
              sx={{
                borderRadius: 8,
                marginBottom: 20,
                border: `1px solid ${
                  theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
              }}
              value={faq.q}
            >
              <Accordion.Control>{faq.q}</Accordion.Control>
              <Accordion.Panel>{faq.a}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  )
}

Faq.getLayout = getBaseLayout({})
Faq.suppressFirstRenderFlicker = true

export default Faq
