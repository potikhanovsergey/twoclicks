import { BuildingBlock } from "@prisma/client"
import { IBuildingBlockMock, ICanvasBlock } from "types"

export const pushBlock: IBuildingBlockMock = {
  component: "textInput",
  editType: "element",
  filterType: "form",
  props: {
    placeholder: "afsldafkls",
    label: "fsds",
    required: true,
  },
}

export const ButtonsList: IBuildingBlockMock[] = [
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "filled",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "light",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "outline",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "default",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "indigo", to: "cyan" },
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "subtle",
      color: "blue",
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "lime", deg: 105 },
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "teal", to: "blue", deg: 60 },
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "orange", to: "red" },
    },
  },
  {
    component: "button",
    editType: "element",
    filterType: "button",
    props: {
      children: ["Button"],
      variant: "gradient",
      gradient: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
    },
  },
]

export const PortfolioMock = {
  name: "First portfolio in Prisma",
  data: [
    {
      id: "3123dasab",
      component: "tabs",
      editType: "section",
      props: {
        children: [
          {
            id: "321fsdc",
            component: "tab",
            props: {
              label: "Tab 1",
              children: ["Tab 1 content"],
            },
          },
          {
            id: "321fsdac",
            component: "tab",
            props: {
              label: "Tab 2",
              children: ["Tab 2 content"],
            },
          },
          {
            id: "321fsf21dc",
            component: "tab",
            props: {
              label: "Tab 3",
              children: ["Tab 3 content"],
            },
          },
        ],
      },
    },
    {
      id: "3213213122",
      component: "button",
      editType: "element",
      props: {
        children: ["Button Text"],
      },
    },
    {
      id: "3213312",
      component: "stack",
      props: {
        children: [
          {
            id: "321543213213",
            component: "group",
            props: {
              children: [
                {
                  id: "213122321",
                  component: "button",
                  editType: "element",
                  props: {
                    color: "blue",
                    size: "xl",
                    children: ["very deep button"],
                  },
                },
                {
                  id: "21312320",
                  component: "button",
                  editType: "element",
                  props: {
                    color: "green",
                    children: ["very deep button 1"],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
