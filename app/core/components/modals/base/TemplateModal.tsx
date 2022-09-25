import { forwardRef } from "react"
import {
  Box,
  Button,
  createPolymorphicComponent,
  TextInput,
  Text,
  BoxProps,
  ButtonProps,
  Group,
  ThemeIcon,
} from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { useForm } from "@mantine/form"
import createPortfolio from "app/portfolios/mutations/createPortfolio"
import { useMutation } from "@blitzjs/rpc"
import { Page } from "@prisma/client"
import { ICanvasPalette } from "types"
import { AppStore } from "store"
import { showNotification } from "@mantine/notifications"
import { defaultSuccessNotification } from "notifications"
import { BiSave } from "@react-icons/all-files/bi/BiSave"

interface TemplateModalProps extends ButtonProps {
  portfolio: Page
}

const TemplateModalForm = ({ portfolio }: { portfolio: Page }) => {
  const templateForm = useForm<{ newPageName: string }>({
    initialValues: {
      newPageName: portfolio.name,
    },
  })

  const [createPortfolioMutation] = useMutation(createPortfolio)

  return (
    <form
      onSubmit={templateForm.onSubmit(async (values) => {
        const createdPortfolio = await createPortfolioMutation({
          name: values.newPageName,
          data: portfolio.data,
          palette: portfolio.palette as ICanvasPalette,
        })

        if (createdPortfolio) {
          AppStore.portfolios = [createdPortfolio, ...AppStore.portfolios]
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
  ({ children, portfolio, ...others }, ref) => {
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
                  {portfolio.name}
                </Text>{" "}
                as a template
              </Text>
            ),
            children: <TemplateModalForm portfolio={portfolio} />,
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
