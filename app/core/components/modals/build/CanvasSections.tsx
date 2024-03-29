import CanvasAddModal from "./CanvasAddModal"

const filterButtons = [
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

const CanvasSectionsModal = () => {
  return (
    <CanvasAddModal modal="canvasSectionsModal" type="sections" filterButtons={filterButtons} />
  )
}

export default CanvasSectionsModal
