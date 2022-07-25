// import { useTranslation } from 'next-i18next';
import CanvasAddModal from "./CanvasAddModal"
import { IFilterButton } from "types"

const filterButtons: IFilterButton[] = [
  {
    text: "Grid",
    value: "grid",
  },
  {
    text: "Text",
    value: "text",
  },
  {
    text: "Buttons",
    value: "button",
  },
  {
    text: "Images",
    value: "image",
  },
  {
    text: "Forms",
    value: "form",
  },
]

const CanvasComponentsModal = () => {
  return (
    <CanvasAddModal modal="canvasComponentsModal" type="components" filterButtons={filterButtons} />
  )
}

export default CanvasComponentsModal
