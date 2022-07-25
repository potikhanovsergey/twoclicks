import { BuildingBlock } from "@prisma/client"
import { IBuildingBlockMock, ICanvasBlock } from "types"
import shortid from "shortid"

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
      id: shortid.generate(),
      component: "tabs",
      editType: "element",
      filterType: "tabs",
      props: {
        children: [
          {
            id: shortid.generate(),
            component: "tab",
            editType: null,
            filterType: "",
            props: {
              label: "Tab 1",
              children: ["Tab 1 content"],
            },
          },
          {
            id: shortid.generate(),
            component: "tab",
            editType: null,
            filterType: "",
            props: {
              label: "Tab 2",
              children: ["Tab 2 content"],
            },
          },
          {
            id: shortid.generate(),
            component: "tab",
            editType: null,
            filterType: "",
            props: {
              label: "Tab 3",
              children: ["Tab 3 content"],
            },
          },
        ],
      },
    },
    {
      id: shortid.generate(),
      component: "button",
      editType: "element",
      filterType: "button",
      props: {
        children: ["Button Text"],
      },
    },
    {
      id: shortid.generate(),
      component: "stack",
      editType: "grid",
      filterType: "grid",
      props: {
        children: [
          {
            id: shortid.generate(),
            component: "group",
            editType: "grid",
            filterType: "grid",
            props: {
              direction: "column",
              children: [
                {
                  id: shortid.generate(),
                  component: "button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "blue",
                    size: "xl",
                    children: ["very deep button"],
                  },
                },
                {
                  id: shortid.generate(),
                  component: "button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "green",
                    children: ["very deep button 1"],
                  },
                },
                {
                  id: shortid.generate(),
                  component: "button",
                  editType: "element",
                  filterType: "button",
                  props: {
                    color: "orange",
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
