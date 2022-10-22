import { forwardRef, useEffect } from "react"
import { Box, createPolymorphicComponent, Text, ButtonProps, Mark } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import { Page } from "@prisma/client"
import { AppStore } from "store"
import deletePage from "./mutations/deletePage"

interface DeletePageModalProps extends ButtonProps {
  page: Page
}

// Create intermediate component with default ref type and props
const _DeletePageModal = forwardRef<HTMLButtonElement, DeletePageModalProps>(
  ({ children, page, ...others }, ref) => {
    const [deletePageMutation, { isSuccess }] = useMutation(deletePage)
    return (
      <Box<"button">
        // define default component, you will be able to override it with `component` prop from ...others
        component="button"
        ref={ref}
        {...others}
        onClick={() => {
          openConfirmModal({
            title: <Text weight="bold">Delete your page</Text>,
            centered: true,
            children: (
              <>
                <Text size="sm">
                  Are you sure you want to delete your page? <br />
                  This action is &nbsp;
                  <Mark color="red">
                    <strong>irreversible</strong>
                  </Mark>
                  .
                </Text>
              </>
            ),
            labels: { confirm: "Yes, delete the page", cancel: "No, don't delete it" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
              const response = await deletePageMutation({ id: page.id })
              if (response) {
                AppStore.removePage(page.id)
              }
            },
          })
        }}
      >
        {children}
      </Box>
    )
  }
)

// createPolymorphicComponent accepts two types: default element and component props
// all other props will be added to component type automatically
export const DeletePageModal = createPolymorphicComponent<"button", DeletePageModalProps>(
  _DeletePageModal
)
