import { Group, Anchor, CopyButton, Tooltip, ActionIcon } from "@mantine/core"
import { PortfolioPreview } from "app/portfolios/PortfolioCard"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { BiCheckDouble, BiCopy } from "react-icons/bi"
import { AppStore } from "store"

const PortfolioLink = ({
  id,
  withEllipsis = false,
  shouldSearch = true,
  centered = false,
}: {
  id: string
  withEllipsis?: boolean
  shouldSearch?: boolean
  centered?: boolean
}) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_PRODUCTION_URL

  const portfolio = shouldSearch ? AppStore.portfolios.find((p) => p.id === id) : null
  const { t } = useTranslation("pagesBuild")
  return portfolio?.isPublished || !shouldSearch ? (
    <Group spacing={4} noWrap position={centered ? "center" : undefined}>
      <Anchor
        href={`${process.env.NODE_ENV === "development" ? "" : baseURL}/p/${id}`}
        target="_blank"
        color="blue"
        size="sm"
        style={
          withEllipsis
            ? {
                overflow: "hidden",
                maxWidth: "24ch",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }
            : { whiteSpace: "nowrap" }
        }
      >
        {`${baseURL}/p/${id}`}
      </Anchor>
      <CopyButton value={`${baseURL}/p/${id}`} timeout={5000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? t("link copied") : t("copy link")} withArrow position="bottom">
            <ActionIcon
              color={copied ? "teal" : "violet"}
              variant="subtle"
              onClick={copy}
              size="sm"
            >
              {copied ? <BiCheckDouble size={16} /> : <BiCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  ) : (
    <></>
  )
}

export default observer(PortfolioLink)
