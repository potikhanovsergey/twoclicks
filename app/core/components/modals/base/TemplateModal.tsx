import { forwardRef } from "react"
import {
  Box,
  Button,
  createPolymorphicComponent,
  TextInput,
  Text,
  ButtonProps,
  Group,
} from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { useForm } from "@mantine/form"
import createPage from "app/build-pages/mutations/createPage"
import { useMutation } from "@blitzjs/rpc"
import { Page, Prisma } from "@prisma/client"
import { ICanvasPalette, IThemeSettings } from "types"
import { AppStore } from "store"
import { showNotification } from "@mantine/notifications"
import { defaultSuccessNotification } from "notifications"

interface TemplateModalProps extends ButtonProps {
  page: Page
}

const TemplateModalForm = ({ page }: { page: Page }) => {
  const templateForm = useForm<{ newPageName: string }>({
    initialValues: {
      newPageName: page.name,
    },
  })

  const [createPageMutation] = useMutation(createPage)

  return (
    <form
      onSubmit={templateForm.onSubmit(async (values) => {
        const createdPage = await createPageMutation({
          name: values.newPageName,
          data: page.data,
          themeSettings: page.themeSettings as unknown as IThemeSettings,
        })

        if (createdPage) {
          AppStore.pages = [createdPage, ...AppStore.pages]
          showNotification({
            ...defaultSuccessNotification,
            message: (
              <Group align="center" spacing={8}>
                <Text>
                  Page{" "}
                  <Text color="violet" component="span">
                    {values.newPageName}
                  </Text>{" "}
                  is successfuly created from a template!
                </Text>
              </Group>
            ),
          })
        }
        closeAllModals()
      })}
    >
      <TextInput
        label="New page name"
        data-autofocus
        required
        {...templateForm.getInputProps("newPageName")}
      />
      <Button fullWidth type="submit" mt="md" disabled={!templateForm.values.newPageName.length}>
        Create a new page
      </Button>
    </form>
  )
}

// Create intermediate component with default ref type and props
const _TemplateModal = forwardRef<HTMLButtonElement, TemplateModalProps>(
  ({ children, page, ...others }, ref) => {
    return (
      <Box<"button">
        // define default component, you will be able to override it with `component` prop from ...others
        component="button"
        ref={ref}
        {...others}
        onClick={() => {
          openModal({
            centered: true,
            title: (
              <Text>
                Selecting{" "}
                <Text component="span" color="violet">
                  {page.name}
                </Text>{" "}
                as a template
              </Text>
            ),
            children: <TemplateModalForm page={page} />,
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
export const TemplateModal = createPolymorphicComponent<"button", TemplateModalProps>(
  _TemplateModal
)
