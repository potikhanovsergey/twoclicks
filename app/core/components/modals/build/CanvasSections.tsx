import CanvasAddModal from "./CanvasAddModal"
import { IFilterButton } from "types"
import { useMemo } from "react"

const CanvasSectionsModal = () => {
  const filterButtons: IFilterButton[] = useMemo(() => {
    return [
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
        text: "Features",
        value: "features",
      },
      {
        text: "Footers",
        value: "footer",
      },
    ]
  }, [])
  return (
    <CanvasAddModal modal="canvasSectionsModal" type="sections" filterButtons={filterButtons} />
  )
}

export default CanvasSectionsModal
