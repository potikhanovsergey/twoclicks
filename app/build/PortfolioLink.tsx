import { Group, Anchor, CopyButton, Tooltip, ActionIcon } from "@mantine/core"
import { PortfolioPreview } from "app/portfolios/PortfolioCard"
import { BiCheckDouble, BiCopy } from "react-icons/bi"

const PortfolioLink = ({ id, withEllipsis = false }: { id: string; withEllipsis?: boolean }) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_PRODUCTION_URL

  return (
    <Group spacing={4}>
      <Anchor
        href={`${baseURL}/p/${id}`}
        target="_blank"
        color="blue"
        style={
          withEllipsis
            ? { overflow: "hidden", maxWidth: "24ch", textOverflow: "ellipsis" }
            : undefined
        }
      >
        {`${baseURL}/p/${id}`}
      </Anchor>
      <CopyButton value={`${baseURL}/p/${id}`} timeout={10000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Link copied" : "Copy link"} withArrow position="top">
            <ActionIcon color={copied ? "teal" : "gray"} onClick={copy} size="sm">
              {copied ? <BiCheckDouble size={16} /> : <BiCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  )
}

export default PortfolioLink
