import { ButtonProps, useMantineTheme, Button } from "@mantine/core"
import { FiPlusSquare } from "@react-icons/all-files/fi/FiPlusSquare"
import { ModalContext, IModalContextValue } from "contexts/ModalContext"
import useTranslation from "next-translate/useTranslation"
import { useContext } from "react"
import { BuildStore } from "store/build"

interface InnerAddSectionButtonProps extends Omit<ButtonProps, "children"> {
  insertIndex: number
}

const InnerAddSectionButton = (props: InnerAddSectionButtonProps) => {
  const [, setModalContext = () => ({})] = useContext(ModalContext)
  const { t } = useTranslation("build")

  const { insertIndex, ...otherProps } = props

  const theme = useMantineTheme()
  const dark = theme.colorScheme === "dark"
  return (
    <Button
      size="sm"
      variant={dark ? "white" : "filled"}
      color="dark"
      rightIcon={<FiPlusSquare />}
      compact
      onClick={() => {
        BuildStore.insertIndex = insertIndex
        setModalContext((prevValue: IModalContextValue) => ({
          ...prevValue,
          canvasSectionsModal: true,
        }))
      }}
      {...otherProps}
    >
      {t("add new section")}
    </Button>
  )
}

export default InnerAddSectionButton
