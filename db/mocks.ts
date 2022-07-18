import { ICanvasBlock } from "types"

export const pushBlock: ICanvasBlock = {
  id: "31лвь21д",
  component: "textInput",
  editType: "element",
  props: {
    placeholder: "afsldafkls",
    label: "fsds",
    required: true,
  },
}

export const ButtonsList: Omit<ICanvasBlock, "id">[] = [
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "filled",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "light",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "outline",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "default",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "subtle",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "lime", deg: 105 },
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "blue", deg: 60 },
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "orange", to: "red" },
    },
  },
  {
    component: "button",
    editType: "element",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
    },
  },
]
