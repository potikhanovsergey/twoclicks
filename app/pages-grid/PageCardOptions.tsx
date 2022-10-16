import { Group, Popover, ActionIcon, Button, Stack, ThemeIcon } from "@mantine/core"
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots"
import { FaEye } from "@react-icons/all-files/fa/FaEye"
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash"
import { DeletePageModal } from "app/build-pages/DeletePageModal"
import TogglePublishPage2 from "app/build/TogglePublishPage2"
import { TemplateModal } from "app/core/components/modals/base/TemplateModal"
import { PageCardProps } from "./PageCard"

const PageCardOptions = ({ page }: { page: PageCardProps }) => {
  return (
    <Group position="apart" sx={{ position: "absolute", right: 8, top: 8, left: 8, zIndex: 1 }}>
      <ThemeIcon variant="default">{page.isPublished ? <FaEye /> : <FaEyeSlash />}</ThemeIcon>
      <Popover withArrow withinPortal>
        <Popover.Target>
          <ActionIcon variant="default">
            <BsThreeDots />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p={8}>
          <Stack spacing={4}>
            <TogglePublishPage2 page={page} color="dark" variant="filled" size="sm" compact />
            <TemplateModal page={page} component={Button} compact color="dark">
              Copy as template
            </TemplateModal>
            <DeletePageModal page={page} component={Button} compact variant="subtle" color="red">
              Delete page
            </DeletePageModal>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  )
}

export default PageCardOptions
