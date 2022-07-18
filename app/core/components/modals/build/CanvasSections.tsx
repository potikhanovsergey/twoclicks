// import { useTranslation } from 'next-i18next';
import CanvasAddModal from "./CanvasAddModal"
import { IFilterButton } from "./types"

const filterButtons: IFilterButton[] = [
  {
    text: "Headers",
    value: "header",
  },
  {
    text: "Hero",
    value: "hero",
  },
  {
    text: "Galleries",
    value: "gallery",
  },
  {
    text: "Skills",
    value: "skills",
  },
  {
    text: "Footers",
    value: "footer",
  },
]

const CanvasSectionsModal = () => {
  return (
    <CanvasAddModal modal="canvasSectionsModal" type="sections" filterButtons={filterButtons} />
  )
}

export default CanvasSectionsModal
