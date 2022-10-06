import { Group, Anchor, CopyButton, Tooltip, ActionIcon } from "@mantine/core"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { AppStore } from "store"

import { BiCheckDouble } from "@react-icons/all-files/bi/BiCheckDouble"
import { BiCopy } from "@react-icons/all-files/bi/BiCopy"
import { baseURL } from "pages/_app"

const PageLink = ({
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
  const { t } = useTranslation("build")
  return (
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
              aria-label="Copy the page URL"
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
  )
}

export default observer(PageLink)
